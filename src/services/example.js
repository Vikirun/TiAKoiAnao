import request from '../utils/request';
import { stringify } from "qs";

export async function listVideos() {
  return request('/video/listVideos');
}

export async function listVideosByCount(params) {
  return request(`/video/listVideosByCount?${stringify(params)}`);
}

export async function insertImage(params) {
  return request(`/article/insertImage`, {
    method: 'POST',
    body: params,
  });
}

export async function insertArticle(params) {
  return request(`/article/insertArticle`, {
    method: 'POST',
    body: stringify(params),
  });
}
