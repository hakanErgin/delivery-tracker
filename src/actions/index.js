import axios from 'axios';

export const createCompany = (companyName) => {
  return { type: 'CREATE_COMPANY', payload: companyName };
};

export function createCompanyError(error) {
  return {
    type: 'CREATE_COMPANY_ERROR',
    payload: error,
  };
}

export function createNewCompany(companyName) {
  return function action(dispatch) {
    const request = axios
      .post('http://localhost:5000/companies/add', { companyName })
      .then((res) => console.log(res.data))
      .then(() => (window.location = '/companies'));
    return request.then(
      (response) => dispatch(createCompany(response)),
      (err) => dispatch(createCompanyError(err))
    );
  };
}
