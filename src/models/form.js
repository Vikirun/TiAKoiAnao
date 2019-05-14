import { insertCar} from "../services/car";


export default {
  namespace: 'form',

  state: {
    list: [],
  },

  subscriptions: {
    setup({dispatch, history}) {  // eslint-disable-line
    },
  },

  effects: {
    *insertCar({payload}, {call}) {  // eslint-disable-line
      const response = yield call(insertCar, payload);
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
