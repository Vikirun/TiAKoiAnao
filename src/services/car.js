import request from "../utils/request";

export async function insertCar(params) {

  return request("/car/insertCar", {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
    method: 'post',
    body: JSON.stringify(params),
  });
}
