import { Module } from '@nestjs/common';

import { AlarmsModule } from './alarms/application/alarms.module';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  controllers: [AppController],
  imports: [AlarmsModule],
  providers: [AppService],
})
export class AppModule {}
