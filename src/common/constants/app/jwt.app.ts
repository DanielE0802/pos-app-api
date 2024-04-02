export enum JwtConfig {
  strategy = 'jwt',
  secret = 'mysecret',
  expiredToken = '1h',
}

export const DefaultStrategy = { defaultStrategy: JwtConfig.strategy };
