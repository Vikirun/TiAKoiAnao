import { listVideos } from '../services/example';


export default {
  namespace: 'video',

  state:{
    videoList: [],
  },

  subscriptions: {
    setup({dispatch, history}) {  // eslint-disable-line
      // history.listen((location) => {
      //   console.log("跳转接受参数", location);
      //   dispatch({
      //     type: 'listVideos',
      //   });
      // });
    },
  },

  effects: {
    *listVideos({ payload, callback }, { call, put }) {  // eslint-disable-line
      const response = yield call(listVideos, payload);
      if (response.status === 0) {
        yield put({
          type: 'save',
          payload: {
            videoList: response.data.list,
          },
        });
      }
      if (callback && typeof callback === 'function') {
        callback(response);
      }
    },
  },

  reducers: {
    save(state, action) {
      return {...state, ...action.payload};
    },
  },

};
