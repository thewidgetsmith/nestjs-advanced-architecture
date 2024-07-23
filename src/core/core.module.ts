import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MongooseModule } from '@nestjs/mongoose';

import { ApplicationBootstrapOptions } from '@app/common/interfaces/application-bootstrap-options.interface';
import { EVENT_STORE_CONNECTION } from './core.constants';

@Module({})
export class CoreModule {
  static forRoot(options: ApplicationBootstrapOptions) {
    const imports = [];
    if (options.driver === 'orm') {
      // We are going to hardcode the connection options for simplicity
      // but you can use a configuration file or environment variables
      imports.push(
        TypeOrmModule.forRoot({
          type: 'postgres',
          host: 'localhost',
          port: 5432,
          password: 'pass123',
          username: 'postgres',
          autoLoadEntities: true,
          synchronize: true,
        }),
      );
    }

    if (options.eventStore === 'mongodb') {
      imports.push(
        MongooseModule.forRoot('mongodb://localhost:27018/vf-event-store', {
          connectionName: EVENT_STORE_CONNECTION,
          directConnection: true,
        }),
      );
    }

    return {
      module: CoreModule,
      imports,
    };
  }
}
