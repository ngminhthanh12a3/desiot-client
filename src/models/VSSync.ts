import { vsFindOneService, VSUpdateService } from '@/services/vsSync';
import { useEffect, useRef, useState } from 'react';
import { useModel, useRequest } from 'umi';
import { EventEmitter } from 'events';
import { io } from 'socket.io-client';
import { VSSync } from '@/utils';
import { DESIoTSync } from '@/constants';
export default () => {
  const { run: VSUpdateRun } = useRequest(VSUpdateService, { manual: true });
  const [curSyncDev, setCurSyncDev] = useState<API.DESIoTDeviceType>();
  const { initialState } = useModel('@@initialState');
  const vsSyncEEmitter = useRef(new EventEmitter());
  useEffect(() => {
    if (initialState?.currentUser?._id) {
      vsSyncEEmitter.current.on('vstorage-fetch', vstorageFetch);
      const socket = io({ withCredentials: true });

      const ev = initialState?.currentUser._id;
      socket.on(ev, (packet) => {
        const vsSyncHandler = new VSSync.Handler(vsSyncEEmitter.current, packet);
        vsSyncHandler.handlePacket();
      });
    }
    return () => {};
  }, [initialState?.currentUser]);

  return { curSyncDev, setCurSyncDev, vsSyncEEmitter, VSUpdate };

  async function VSUpdate(
    content: API.DESIoTVStorageData,
    vs_id: string,
    syncDev?: API.DESIoTDeviceType,
  ) {
    const config_id = syncDev?.config_id || '';
    const _id = vs_id;
    const dev_id = syncDev?._id || '';
    const data = {
      $set: {
        [`data.${dev_id}`]: content,
      },
    };
    VSUpdateRun({ config_id, _id, data });
  }

  async function vstorageFetch(syncDev: API.DESIoTDeviceType, _vs_id: string) {
    // const VSModel = await vsFindOneRun({ _id: _vs_id, config_id: syncDev.config_id });
    const { data: VSModel } = await vsFindOneService({ _id: _vs_id, config_id: syncDev.config_id });
    if (VSModel !== undefined) {
      const packet: API.DESIoT_VSSyncPacket = {
        cmd: DESIoTSync.SyncCMDs.VSSync,
        data: {
          _vs_id,
          dev_id: syncDev._id,
          data: VSModel.data[syncDev._id],
          fullDocument: VSModel,
        },
      };
      const vsSyncHandler = new VSSync.Handler(vsSyncEEmitter.current, packet);
      vsSyncHandler.handlePacket();
    }
  }
};
