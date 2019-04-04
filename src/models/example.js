import request from '../utils/request';

async function Request(options) {
  const {url, ...res} = options;
  return request(url, res);
}


export default {

  namespace: 'example',

  state: {
    remote: []
  },

  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {  // eslint-disable-line
      const response = yield call(Request, {
        url: 'http://localhost:8080/getMessage'
      });

      const { data } = response;
      const result = data.message;
      yield put({
        type: 'save',
        payload: {
          remote: result
        }
      });
    },
  },

  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },
  },

};
