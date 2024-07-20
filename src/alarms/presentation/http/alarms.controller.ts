import { Body, Controller, Get, Post } from '@nestjs/common';

import { AlarmsService } from '@app/alarms/application/alarms.service';
import { CreateAlarmCommand } from '@app/alarms/application/commands/create-alarm.command';
import { CreateAlarmDto } from './dto/create-alarm.dto';

@Controller('alarms')
export class AlarmsController {
  constructor(private readonly alarmsService: AlarmsService) {}

  @Post()
  create(@Body() createAlarmDto: CreateAlarmDto) {
    const cmd = new CreateAlarmCommand(
      createAlarmDto.name,
      createAlarmDto.severity,
    );
    return this.alarmsService.create(cmd);
  }

  @Get()
  findAll() {
    return this.alarmsService.findAll();
  }
}
