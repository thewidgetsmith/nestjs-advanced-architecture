import { Module } from '@nestjs/common';

import { AlarmsController } from '@app/alarms/presentation/http/alarms.controller';
import { AlarmFactory } from '@app/alarms/domain/alarm.factory';
import { AlarmsService } from './alarms.service';

@Module({
  controllers: [AlarmsController],
  providers: [AlarmFactory, AlarmsService],
})
export class AlarmsModule {}
