export class AlarmReadModel {
  uuid: string;
  name: string;
  severity: string;
  triggeredAt: Date;
  acknowledgedAt: Date | null;
  items: Array<{
    uuid: string;
    name: string;
    type: string;
  }>;
}
