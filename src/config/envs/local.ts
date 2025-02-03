export const config = {
  db: {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'admin',
    database: 'main_erp',
    extra: {
      connectionLimit: 10,
    },
    synchronize: true,
    logging: true,
  },
};
