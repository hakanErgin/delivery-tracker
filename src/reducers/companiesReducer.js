const initialState = {
  companies: localStorage.getItem('companies'),
};

const companiesReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'CREATE_COMPANY':
      return [...state, action.payload];

    default:
      return state;
  }
};

export default companiesReducer;
