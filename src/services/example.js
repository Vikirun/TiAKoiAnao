import request from '../utils/request';
import { stringify } from "qs";

export async function listVideos() {
  return request('/video/listVideos');
}

export function listVideosByCount(params) {
  return request(`/video/listVideosByCount?${stringify(params)}`);
}
