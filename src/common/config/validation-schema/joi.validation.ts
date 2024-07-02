import * as Joi from 'joi';
import { truthy, falsy } from 'src/common/constants/app/bools.app';

export const JoiValidationSchema = Joi.object({
  /**
   * Server
   */
  NODE_ENV: Joi.required(),
  ENV_PORT: Joi.number().port().default(3000),
  CORS_WHITELIST: Joi.string().required(),
  /**
   * Main Database
   */
  DB_NAME: Joi.required(),
  DB_HOST: Joi.required(),
  DB_PORT: Joi.number().port().default(3306),
  DB_USER: Joi.required(),
  DB_PASSWORD: Joi.required(),
  DB_SYNC: Joi.boolean()
    .truthy(...truthy)
    .falsy(...falsy)
    .when('NODE_ENV', {
      is: 'prod',
      then: Joi.boolean()
        .required()
        .truthy(...truthy)
        .falsy(...falsy)
        .default(false),
    }),
  /**
   * Storage
   */
  STORAGE_IS_ENABLED: Joi.boolean()
    .required()
    .truthy(...truthy)
    .falsy(...falsy)
    .default(false),
  STORAGE_API_ENDPOINT: Joi.any().when('STORAGE_IS_ENABLED', {
    is: true,
    then: Joi.string().required(),
  }),
  STORAGE_USE_SSL: Joi.any().when('STORAGE_IS_ENABLED', {
    is: true,
    then: Joi.boolean()
      .required()
      .truthy(...truthy)
      .falsy(...falsy),
  }),
  STORAGE_BUCKET_NAME: Joi.any().when('STORAGE_IS_ENABLED', {
    is: true,
    then: Joi.string().required(),
  }),
  STORAGE_PORT: Joi.any().when('STORAGE_IS_ENABLED', {
    is: true,
    then: Joi.number().port().required(),
  }),
  STORAGE_ACCESS_KEY: Joi.any().when('STORAGE_IS_ENABLED', {
    is: true,
    then: Joi.string().required(),
  }),
  STORAGE_SECRET_KEY: Joi.any().when('STORAGE_IS_ENABLED', {
    is: true,
    then: Joi.string().required(),
  }),
  /**
   * SMTP - Email
   */
  SMTP_HOST: Joi.string()
    .hostname()
    .required()
    .pattern(new RegExp('^smtp.')) // Asegurarse de que comience con 'smtp.'
    .example('smtp.sendgrid.net'),
  SMTP_PORT: Joi.number().port().required().valid(587, 465), // Restringe a puertos comunes para SMTP
  SMTP_SECURE: Joi.boolean()
    .required()
    .truthy(...truthy)
    .falsy(...falsy),
  EMAIL_USER: Joi.string().required(),
  EMAIL_PASSWORD: Joi.string().required(),
  EMAIL_FROM: Joi.string()
    .required()
    .custom((value, helpers) => {
      if (!value.includes('@')) {
        return helpers.error('any.invalid');
      }
      const parts = value.match(/<(.+)>/);
      if (
        parts &&
        parts[1] &&
        !Joi.string()
          .email({ tlds: { allow: false } })
          .validate(parts[1]).error
      ) {
        return value;
      }
      return helpers.error('string.email');
    }, 'Email From Validation'),
  /**
   * Authenticator
   */
  KEYCLOAK_USER: Joi.string().required(),
  KEYCLOAK_PASSWORD: Joi.exist(),
  KEYCLOAK_AUTH_SERVER_URL: Joi.string().uri().required(),
  KEYCLOAK_REALM: Joi.string().required(),
  KEYCLOAK_CLIENT_ID: Joi.string().required(),
  KEYCLOAK_SECRET: Joi.string().required(),

  KEYCLOAK_DB_ADDR: Joi.string().required(),
  KEYCLOAK_DB_DATABASE: Joi.string().required(),
  KEYCLOAK_DB_PORT: Joi.number().port().default(5432),
  KEYCLOAK_DB_USER: Joi.string().required(),
  KEYCLOAK_DB_PASSWORD: Joi.exist(),
});
