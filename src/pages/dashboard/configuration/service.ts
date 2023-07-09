import { request } from 'umi';
import { CardListItemDataType, ModalFormNewConfig } from './data';

export async function loadAllConfig(): Promise<{ data: CardListItemDataType[] }> {
  return request('/api/configs', {
    method: 'GET',
  });
}
export async function createNewConfig(
  value: ModalFormNewConfig,
  options?: { [key: string]: any },
): Promise<API.DESIoTResponse<API.DESIoTConfig>> {
  return request('/api/configs', {
    method: 'POST',
    data: value,
    headers: {
      'Content-Type': 'application/json',
    },
    ...options,
  });
}
