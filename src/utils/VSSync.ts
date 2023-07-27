import { DESIoTSync } from '@/constants';
import { EventEmitter } from 'events';
import numeral from 'numeral';

export class Handler {
  eE: EventEmitter;
  packet: API.DESIoT_VSSyncPacket;

  constructor(eE: EventEmitter, packet: API.DESIoT_VSSyncPacket) {
    this.eE = eE;
    this.packet = packet;
  }
  handlePacket() {
    switch (this.packet.cmd) {
      case DESIoTSync.SyncCMDs.VSSync:
        let { dev_id, _vs_id, data, fullDocument } = this.packet.data;
        const ev = `${dev_id}-${_vs_id}`;

        // should Update
        if (fullDocument.type === DESIoTSync.VSType.FLOAT) {
          if (data !== undefined) data = numeral(data).format('0.00');
        }

        this.eE.emit(ev, data);
        break;

      default:
        break;
    }
  }
}
