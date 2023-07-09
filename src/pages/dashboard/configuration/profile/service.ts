import { request } from 'umi';

export async function getAProfile(
  id: string,
): Promise<API.DESIoTResponse<API.DESIoTConfig[] | []>> {
  return request('/api/configs/' + id);
}
