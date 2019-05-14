import { listVideos, listVideosCarousel, insertImage, insertArticle, listArticles, listCar } from '../services/example';
import { routerRedux } from 'dva/router';


export default {

  namespace: 'example',

  state: {
    videoList: [],
    carouselList: [],
    imageUrl: '',
    articleList: '',
    carList: [],
  },

  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line

    },
  },

  effects: {
    *listVideos({ payload, callback }, { call, put }) {  // eslint-disable-line
      const response = yield call(listVideos, payload);
      if (response.status === 0) {
        yield put({
          type: 'save',
          payload: {
            videoList: response.data,
          },
        });
      }
      if (callback && typeof callback === 'function') {
        callback(response);
      }
    },

    *listCarousel({ payload }, { call, put }) {  // eslint-disable-line
      const response = yield call(listVideosCarousel, payload);
      if (response.status === 0) {
        yield put({
          type: 'save',
          payload: {
            carouselList: response.data,
          },
        });
      }
    },

    *insertImage({ payload, callback }, { call, put }) {
      const response = yield call(insertImage, payload);
      if (response.status === 0) {
        yield put({
          type: 'save',
          payload: {
            imageUrl: response.data,
          },
        });
        if (callback && typeof callback === 'function') {
          callback(response);
        }
      }
    },

    *insertArticle({ payload, callback }, { call }) {
      const response = yield call(insertArticle, payload);
      payload.resolve(response);
    },

    *listArticles({ payload, callback }, { call, put }) {
      const response = yield call(listArticles, payload);
      if (response.status === 0) {
        yield put({
          type: 'save',
          payload: {
            articleList: response.data,
          },
        });
        if (callback && typeof callback === 'function') {
          callback(response);
        }
      }
    },

    *listCar({ payload, callback }, { call, put }) {
      const response = yield call(listCar, payload);
      if (response.status === 0) {
        yield put({
          type: 'save',
          payload: {
            carList: response.data,
          },
        });
        if (callback && typeof callback === 'function') {
          callback(response);
        }
      }
    },

    *redirect({payload}, {put}) {
      yield put(routerRedux.push("/"));
    },


  },

  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },
  },

};
