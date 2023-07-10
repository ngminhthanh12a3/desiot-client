import { vsFindOneService } from '@/services/vsSync';
import { useEffect, useRef, useState } from 'react';
import { useRequest } from 'umi';
import { EventEmitter } from 'events';
export default () => {
  const { run: vsFindOneRun } = useRequest(vsFindOneService, { manual: true });
  const [curSyncDev, setCurSyncDev] = useState<API.DESIoTDeviceType>();
  const vsSyncEEmitter = useRef(new EventEmitter());
  useEffect(() => {
    return () => {};
  }, []);

  return { getInitialSyncContent, curSyncDev, setCurSyncDev, vsSyncEEmitter };
  async function getInitialSyncContent(vs_id?: string, syncDev?: API.DESIoTDeviceType) {
    const vsModel = await vsFindOneRun({ _id: vs_id || '', config_id: syncDev?.config_id || '' });
    return !!syncDev && vsModel?.data[syncDev._id];
  }
};
