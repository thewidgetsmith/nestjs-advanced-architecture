import { IsArray, IsDate, IsEnum, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import { AlarmSeverity } from '@app/alarms/domain/value-objects/alarm-severity';

class AlarmTriggerItems {
  @ApiProperty({ description: 'alarm trigger name' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'alarm trigger type' })
  @IsString()
  type: string;
}

export class CreateAlarmDto {
  @ApiProperty({
    description: 'alarm name',
    example: 'High CPU Usage',
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'the alarm severity level',
    example: 'CRITICAL',
  })
  @IsEnum(AlarmSeverity.enumerate())
  severity: string;

  @ApiProperty({
    description: 'the timestamp of the alarm trigger (defaults to now)',
    example: '2021-08-31T10:00:00.000Z',
  })
  @IsDate()
  triggeredAt?: Date = new Date();

  @ApiProperty({ description: 'alarm triggers' })
  @IsArray()
  items?: Array<AlarmTriggerItems> = [];
}
