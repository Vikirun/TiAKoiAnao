import request from '../utils/request';

async function Request(options) {
  const {url, ...res} = options;
  return request(url, res);
}


export default {

  namespace: 'list',

  state: {
    list: [],
  },

  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {  // eslint-disable-line
      const response = yield call(Request, {
        url: 'http://localhost:8080/video/listVideos',
      });

      const { data } = response;

      yield put({
        type: 'save',
        payload: {
          list: data,
        },
      });
    },
  },

  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },
  },

};
