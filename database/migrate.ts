import { Logger } from '@nestjs/common';
import { SlonikMigrator } from '@slonik/migrator';
import { createPool } from 'slonik';
import { configuration } from '../src/config';
import * as dotenv from 'dotenv';

dotenv.config();

const migrationsPath = __dirname + '/migrations';
const migrationTable = 'dbchangelog';

export interface DBConfig {
  host: string;
  port: string;
  username: string;
  password: string;
  database: string;
  schema: string;
  ssl?: {
    rejectUnauthorized: boolean;
  };
  synchronize: boolean;
}

export class DbMigrator {
  constructor(public dbConfig: DBConfig, public migrator: SlonikMigrator) {}

  static async create(dbConfig?: DBConfig): Promise<DbMigrator> {
    const _logger = new Logger(DbMigrator.name);

    _logger.log(`-> DATABASE MIGRATIONS SETUP`);
    // TODO: Revisar y acomodar el tipo DBConfig
    const db: /* DBConfig */ any = dbConfig ?? (await configuration()).db;

    let connectionString: string;
    let clientConfig;
    let schema: string;

    if (process.env.POSTGRES_CONNECTION_STRING) {
      _logger.log(
        `POSTGRES_CONNECTION_STRING env is present, using it as connection string`,
      );
      connectionString = process.env.POSTGRES_CONNECTION_STRING;
      clientConfig = {};
      schema = 'public';
    } else {
      _logger.log(
        `Environment config: ${process.env.NODE_ENV || 'development'}`,
      );
      connectionString = `postgresql://${db.username}:${encodeURIComponent(
        db.password,
      )}@${db.host}:${db.port}/${db.database}`;
      schema = db.schema ?? 'public';
      clientConfig = db.ssl ? { ssl: db.ssl } : {};
    }
    const slonik = createPool(connectionString, {
      ...clientConfig,
      statementTimeout: 'DISABLE_TIMEOUT',
      idleInTransactionSessionTimeout: 'DISABLE_TIMEOUT',
    });

    const migrator = new SlonikMigrator({
      migrationsPath,
      migrationTableName: [schema, migrationTable],
      slonik,
      logger: console,
    });
    return new DbMigrator(db, migrator);
  }

  isEnabled() {
    if (this.dbConfig.synchronize) {
      return false;
    }
    return true;
  }
}

if (require.main === module) {
  const _logger = new Logger(DbMigrator.name);
  DbMigrator.create()
    .then((dbMigrator) => {
      _logger.log(`-> DATABASE MIGRATIONS STARTING`);
      if (!dbMigrator.isEnabled()) {
        _logger.log(`synchronize=true - Migrations skipped`);
        return;
      }
      dbMigrator.migrator.runAsCLI();
      _logger.log(`-> DATABASE MIGRATIONS FINISHED`);
    })
    .catch((error) => {
      _logger.error(error);
    });
}
