import { SlonikMigrator } from '@slonik/migrator';
import { createPool } from 'slonik';
import { configuration } from '../src/config';

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
    console.log(`DATABASE MIGRATIONS SETUP ...`);
    const db: DBConfig = dbConfig ?? (await configuration()).db;

    let connectionString: string;
    let clientConfig;
    let schema: string;

    if (process.env.POSTGRES_CONNECTION_STRING) {
      console.log(`POSTGRES_CONNECTION_STRING env is present, using it as connection string`);
      connectionString = process.env.POSTGRES_CONNECTION_STRING;
      clientConfig = {};
      schema = 'public';
    } else {
      console.log(`Environment config: ${process.env.NODE_ENV || 'development'}`);
      connectionString = `postgresql://${db.username}:${encodeURIComponent(db.password)}@${db.host}:${
        db.port
      }/${db.database}`;
      schema = db.schema;
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
  DbMigrator.create()
    .then((dbMigrator) => {
      console.log(`DATABASE MIGRATIONS STARTING ...`);
      if (!dbMigrator.isEnabled()) {
        console.log(`Sincronize=true - Migrations skipped`);
        return;
      }
      dbMigrator.migrator.runAsCLI();
      console.log(`... DATABASE MIGRATIONS FINISHED`);
    })
    .catch((error) => {
      console.error(error);
    });
}
