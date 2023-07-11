import { EventEmitter } from 'events';
enum VSSyncCMDs {
  VSSync,
}
type Packet = {
  cmd: VSSyncCMDs;
  data: {
    _vs_id: string;
    dev_id: string;
    data: number | string;
  };
};
export class Handler {
  eE: EventEmitter;
  packet: Packet;
  constructor(eE: EventEmitter, packet: Packet) {
    this.eE = eE;
    this.packet = packet;
  }
  handlePacket() {
    switch (this.packet.cmd) {
      case VSSyncCMDs.VSSync:
        const { dev_id, _vs_id, data } = this.packet.data;
        const ev = `${dev_id}-${_vs_id}`;
        this.eE.emit(ev, data);
        break;

      default:
        break;
    }
  }
}
