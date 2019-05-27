import request from '../utils/request';
import { stringify } from "qs";

export async function listVideos(params) {
  console.log(params);
  console.log(stringify(params));
  return request(`/video/listVideos?${stringify((params))}`);
}

export async function listVideosCarousel(params) {
  return request(`/video/listVideosCarousel?${stringify(params)}`);
}

export async function insertImage(params) {
  return request(`/article/insertImage`, {
    method: 'POST',
    body: params,
  });
}

export async function insertArticle(params) {
  return request(`/article/insertArticle`, {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
    method: 'POST',
    body: JSON.stringify(params),
  });
}

export async function listArticles(params) {
  return request(`/article/listArticles?${stringify(params)}`);
}

export async function listCar() {
  return request(`/car/listCar`);
}
