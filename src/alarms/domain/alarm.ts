import { randomUUID } from 'crypto';
import { AlarmItem } from './alarm-item';
import { AlarmSeverity } from './value-objects/alarm-severity';

export class Alarm {
  public name: string;
  public severity: AlarmSeverity;
  public triggeredAt: Date;
  public acknowledgedAt: Date | null = null;
  protected items = new Array<AlarmItem>();

  constructor(public uuid: string) {}

  acknowledge() {
    this.acknowledgedAt = new Date();
  }

  getAlarmItems() {
    return this.items;
  }

  addAlarmItem(item: { name: string; type: string }) {
    this.items.push({ uuid: randomUUID(), ...item });
  }

  removeAlarmItem(uuid: string) {
    const index = this.items.findIndex((item) => item.uuid === uuid);
    if (index === -1) {
      throw new Error(`Item with uuid ${uuid} not found`);
    }
    this.items.splice(index, 1);
  }
}

// const alarm = new Alarm('uuid');
// alarm.name = 'Alarm name';
// alarm.severity = AlarmSeverity.fromValue('CRITICAL');
// alarm.triggeredAt = new Date();
//
// alarm.addAlarmItem({ name: 'Item name', type 'Item type' });
// alarm.removeAlarmItem('item-uuid');
// alarm.getAlarmItems();
//
// alarm.acknowledge();
