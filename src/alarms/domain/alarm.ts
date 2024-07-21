import { AlarmSeverity } from './value-objects/alarm-severity';

export class Alarm {
  constructor(
    public uuid: string,
    public name: string,
    public severity: AlarmSeverity,
  ) {}
}
