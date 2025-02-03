export const config = {
  db: {
    type: 'posgrest',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'mysql',
    database: 'main_erp',
    extra: {
      connectionLimit: 10,
    },
    synchronize: true,
    logging: true,
  },
};
