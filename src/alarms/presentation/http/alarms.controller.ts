import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { AlarmsService } from '@app/alarms/application/alarms.service';
import { CreateAlarmCommand } from '@app/alarms/application/commands/create-alarm.command';
import { FindManyAlarmsQuery } from '@app/alarms/application/queries/find-many-alarms.query';

import { CreateAlarmDto } from './dto/create-alarm.dto';

@ApiTags('Alarms')
@Controller('alarms')
export class AlarmsController {
  constructor(private readonly alarmsService: AlarmsService) {}

  @Post()
  create(@Body() dto: CreateAlarmDto) {
    const cmd = new CreateAlarmCommand(
      dto.name,
      dto.severity,
      dto.triggeredAt,
      dto.items,
    );
    return this.alarmsService.create(cmd);
  }

  @Get()
  findMany() {
    const query = new FindManyAlarmsQuery();
    return this.alarmsService.findMany(query);
  }
}
