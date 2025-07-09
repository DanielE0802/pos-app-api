export const config = {
  db: {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'X3zywz0XB7ed',
    database: 'ally-erp-local',
    extra: {
      connectionLimit: 10,
    },
    synchronize: true,
    logging: true,
  },
};
