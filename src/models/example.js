import { listVideos, listVideosByCount, insertImage, insertArticle } from '../services/example';


export default {

  namespace: 'example',

  state: {
    list: [],
    carouselList: [],
    imageUrl: '',
    articleList: [],
  },

  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
    },
  },

  effects: {
    *listVideos({ payload }, { call, put }) {  // eslint-disable-line
      const response = yield call(listVideos, payload);
        if (response.status === 0) {
          yield put({
            type: 'save',
            payload: {
              list: response.data,
            },
          });
        }
    },

    *listCarousel({ payload }, { call, put }) {  // eslint-disable-line
      const response = yield call(listVideosByCount, payload);
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

    *insertArticle({ payload }, { call, put }) {
      const response = yield call(insertArticle, payload);
      if (response.status === 0) {
        return response;
      }
    },

  },

  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },
  },

};
