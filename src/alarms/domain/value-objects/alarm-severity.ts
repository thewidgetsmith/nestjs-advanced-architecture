export class AlarmSeverity {
  constructor(
    readonly value: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW' | 'NONE',
  ) {}

  equals(severity: AlarmSeverity) {
    return this.value === severity.value;
  }

  static enumerate(): string[] {
    return ['CRITICAL', 'HIGH', 'MEDIUM', 'LOW', 'NONE'];
  }

  static fromValue(value: string): AlarmSeverity {
    return new AlarmSeverity(value as 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW' | 'NONE');
  }
}
