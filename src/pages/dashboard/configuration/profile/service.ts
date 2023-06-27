import { request } from 'umi';

export async function getAProfile(id: string): Promise<API.DESIoTResponse> {
  return request('/api/configs/' + id);
}
