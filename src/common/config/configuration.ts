import { registerAs } from '@nestjs/config';
import { truthy } from '../constants/app/bools.app';

export default registerAs('config', () => {
  return {
    NODE_ENV: process.env.NODE_ENV,
    PORT: parseInt(process.env.PORT),

    DATABASE: {
      HOST: process.env.DB_HOST,
      PORT: process.env.DB_PORT,
      USER: process.env.DB_USER,
      PASSWORD: process.env.DB_PASSWORD,
      NAME: process.env.DB_NAME,
      SYNC: truthy.includes(process.env.DB_SYNC),
    },

    STORAGE: {
      IS_ENABLED: truthy.includes(process.env.STORAGE_IS_ENABLED),
      USE_SSL: truthy.includes(process.env.STORAGE_USE_SSL),
      API_ENDPOINT: process.env.STORAGE_API_ENDPOINT,
      BUCKET_NAME: process.env.STORAGE_BUCKET_NAME,
      PORT: parseInt(process.env.STORAGE_PORT),
      ACCESS_KEY: process.env.STORAGE_ACCESS_KEY,
      SECRET_KEY: process.env.STORAGE_SECRET_KEY,
    },

    EMAIL: {
      HOST: process.env.EMAIL_HOST,
      PORT: parseInt(process.env.EMAIL_PORT, 10),
      SECURE: truthy.includes(process.env.EMAIL_SECURE),
      USER: process.env.EMAIL_USER,
      PASSWORD: process.env.EMAIL_PASSWORD,
      FROM: process.env.EMAIL_FROM,
    },

    SECRET: process.env.SECRET,
    TOKEN_EXPIRE_IN: process.env.TOKEN_EXPIRE_IN,

    // BACKEND_URL: process.env.BACKEND_URL,
    // SUPPORT_EMAIL:
    //   process.env.SUPPORT_EMAIL || 'soporte.gestionpedagogica@avefenix.edu.co',

    // WEB: {
    //   LOGIN: process.env.WEB_LOGIN,
    //   DOMAIN: process.env.WEB_LOGIN && new URL(process.env.WEB_LOGIN).origin,
    //   SUPPORT:
    //     process.env.WEB_SUPPORT ||
    //     'https://soporte.gestionpedagogica.avefenix.edu.co',
    // },

    // KEYCLOAK: {
    //   ID: process.env.KEYCLOAK_ID,
    //   USER: process.env.KEYCLOAK_USER,
    //   PASSWORD: process.env.KEYCLOAK_PASSWORD,
    //   AUTH_SERVER_URL: process.env.KEYCLOAK_AUTH_SERVER_URL,
    //   REALM: process.env.KEYCLOAK_REALM,
    //   CLIENT_ID: process.env.KEYCLOAK_CLIENT_ID,
    //   SECRET: process.env.KEYCLOAK_SECRET,
    //   DATABASE: {
    //     ADDR: process.env.KEYCLOAK_DB_ADDR,
    //     DATABASE: process.env.KEYCLOAK_DB_DATABASE,
    //     PORT: process.env.KEYCLOAK_DB_PORT,
    //     USER: process.env.KEYCLOAK_DB_USER,
    //     PASSWORD: process.env.KEYCLOAK_DB_PASSWORD,
    //   },
    // },
  };
});
