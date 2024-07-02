import { join } from 'path';
import { Module } from '@nestjs/common';
import { GraphQLFormattedError } from 'graphql';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
      context: ({ req }) => ({ req }),
      formatError: (error: GraphQLFormattedError) => {
        error.extensions.stacktrace = undefined;

        return {
          message: error.message,
          extensions: error.extensions,
        };
      },
    }),
  ],
})
export class GraphqlConfigModule {}
