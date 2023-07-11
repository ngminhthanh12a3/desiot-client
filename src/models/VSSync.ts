import { vsFindOneService } from '@/services/vsSync';
import { useEffect, useRef, useState } from 'react';
import { useModel, useRequest } from 'umi';
import { EventEmitter } from 'events';
import { io } from 'socket.io-client';
import { VSSync } from '@/utils';
export default () => {
  const { run: vsFindOneRun } = useRequest(vsFindOneService, { manual: true });
  const [curSyncDev, setCurSyncDev] = useState<API.DESIoTDeviceType>();
  const { initialState } = useModel('@@initialState');
  const vsSyncEEmitter = useRef(new EventEmitter());
  useEffect(() => {
    if (initialState?.currentUser?._id) {
      const socket = io({ withCredentials: true });
      socket.on('connect', () => console.log('socket connect', socket.id));

      const ev = initialState?.currentUser._id;
      socket.on(ev, (packet) => {
        const vsSyncHandler = new VSSync.Handler(vsSyncEEmitter.current, packet);
        vsSyncHandler.handlePacket();
      });
    }
    return () => {};
  }, [initialState?.currentUser]);

  return { getInitialSyncContent, curSyncDev, setCurSyncDev, vsSyncEEmitter };
  async function getInitialSyncContent(vs_id?: string, syncDev?: API.DESIoTDeviceType) {
    const vsModel = await vsFindOneRun({ _id: vs_id || '', config_id: syncDev?.config_id || '' });
    return !!syncDev && vsModel?.data[syncDev._id];
  }
};
