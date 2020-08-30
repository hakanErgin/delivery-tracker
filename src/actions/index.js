import axios from 'axios';

export const createCompany = (companyName) => {
  return { type: 'CREATE_COMPANY', payload: companyName };
};

export function createCompanySuccess(company) {
  return {
    type: 'CREATE_COMPANY_SUCCESS',
    payload: company,
  };
}

export function createCompanyError(error) {
  return {
    type: 'CREATE_COMPANY_ERROR',
    payload: error,
  };
}

export function createNewCompany(companyName) {
  return function action(dispatch) {
    dispatch(createCompany(companyName));

    const request = axios
      .post('http://localhost:5000/companies/add', { companyName })
      .then((res) => console.log(res.data))
      .then(() => (window.location = '/companies'));
    return request.then(
      (response) => dispatch(createCompanySuccess(response)),
      (err) => dispatch(createCompanyError(err))
    );
  };
}
