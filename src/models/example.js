import { listVideos, listVideosByCount } from '../services/example';


export default {

  namespace: 'example',

  state: {
    list: [],
    carouselList: [],
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

  },

  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },
  },

};
