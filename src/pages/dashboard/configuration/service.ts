import { request } from 'umi';
import { ModalFormNewConfig } from './data';

export async function loadAllConfig() {}
export async function createNewConfig(
  value: ModalFormNewConfig,
  options?: { [key: string]: any },
): Promise<API.DESIoTResponse> {
  return request('/api/configs', {
    method: 'POST',
    data: value,
    headers: {
      'Content-Type': 'application/json',
    },
    ...options,
  });
}
