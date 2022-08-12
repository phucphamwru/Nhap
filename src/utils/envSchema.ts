import * as Joi from '@hapi/joi';

export const envSchema: Joi.ObjectSchema = Joi.object({
  POSTGRES_HOST: Joi.string().required(),
  POSTGRES_PORT: Joi.number().required(),
  POSTGRES_USER: Joi.string().required(),
  POSTGRES_PASSWORD: Joi.string().required(),
  POSTGRES_DB: Joi.string().required(),
  JWT_ACCESS_TOKEN_SECRET: Joi.string().required(),
  JWT_ACCESS_TOKEN_EXPIRATION_TIME: Joi.string().required(),
  JWT_REFRESH_TOKEN_SECRET: Joi.string().required(),
  JWT_REFRESH_TOKEN_EXPIRATION_TIME: Joi.string().required(),
  // EMAIL_SERVICE: Joi.string().required(),
  // EMAIL_USER: Joi.string().required(),
  // EMAIL_PASSWORD: Joi.string().required(),

  //mail
  MAIL_HOST: Joi.string().required(),
  MAIL_USER: Joi.string().required(),
  MAIL_PASSWORD: Joi.string().required(),
  MAIL_FROM: Joi.string().required(),
  MAIL_TRANSPORT: Joi.string().required(),

  //aws
  AWS_REGION: Joi.string().required(),
  AWS_ACCESS_KEY_ID: Joi.string().required(),
  AWS_SECRET_ACCESS_KEY: Joi.string().required(),
  AWS_PRIVATE_BUCKET_NAME: Joi.string().required(),
});
