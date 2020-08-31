import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const initialState = {
  companies: [],
};

const companiesReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'CREATE_COMPANY':
      return {
        ...state,
        companies: [...state.companies, action.payload],
      };
    default:
      return state;
  }
};

const persistConfig = {
  key: 'COMPANIES',
  storage,
  version: 0,
};

export default persistReducer(persistConfig, companiesReducer);
