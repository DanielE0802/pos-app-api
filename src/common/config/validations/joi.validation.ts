import * as Joi from 'joi';

export const JoiValidationSchema = Joi.object({
  NODE_ENV: Joi.required(),
  ENV_PORT: Joi.number().default(3000),

  DB_NAME: Joi.required(),
  DB_HOST: Joi.required(),
  DB_PORT: Joi.number().default(3306),
  DB_USER: Joi.required(),
  DB_PASSWORD: Joi.required(),
  DB_SYNC: Joi.bool().when('NODE_ENV', {
    is: 'prod',
    then: Joi.bool().default(false),
  }),

  // STORAGE_IS_ENABLED: Joi.boolean().default(false),
  // STORAGE_API_ENDPOINT: Joi.any().when('STORAGE_IS_ENABLED', {
  //   is: true,
  //   then: Joi.string().required(),
  // }),
  // STORAGE_USE_SSL: Joi.any().when('STORAGE_IS_ENABLED', {
  //   is: true,
  //   then: Joi.boolean().required(),
  // }),
  // STORAGE_BUCKET_NAME: Joi.any().when('STORAGE_IS_ENABLED', {
  //   is: true,
  //   then: Joi.string().required(),
  // }),
  // STORAGE_PORT: Joi.any().when('STORAGE_IS_ENABLED', {
  //   is: true,
  //   then: Joi.number().required(),
  // }),
  // STORAGE_ACCESS_KEY: Joi.any().when('STORAGE_IS_ENABLED', {
  //   is: true,
  //   then: Joi.string().required(),
  // }),
  // STORAGE_SECRET_KEY: Joi.any().when('STORAGE_IS_ENABLED', {
  //   is: true,
  //   then: Joi.string().required(),
  // }),
});
