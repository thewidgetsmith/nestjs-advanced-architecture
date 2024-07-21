import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ApplicationBootstrapOptions } from '@app/common/interfaces/application-bootstrap-options.interface';

@Module({
  imports: [],
})
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

    return {
      module: CoreModule,
      imports,
    };
  }
}
