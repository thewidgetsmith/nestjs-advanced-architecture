import { DynamicModule, Module, Type } from '@nestjs/common';

import { AlarmFactory } from '@app/alarms/domain/alarm.factory';
import { AlarmsController } from '@app/alarms/presentation/http/alarms.controller';
import { AlarmsService } from './alarms.service';

@Module({
  controllers: [AlarmsController],
  providers: [AlarmFactory, AlarmsService],
})
export class AlarmsModule {
  static withInfrastructure(module: Type | DynamicModule) {
    return {
      imports: [module],
      module: AlarmsModule,
    };
  }
}
