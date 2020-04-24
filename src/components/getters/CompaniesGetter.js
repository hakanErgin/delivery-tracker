import axios from 'axios';

function getCompanies() {
  return axios
    .get('http://localhost:5000/companies/')
    .then((response) => {
      return response;
    })

    .catch((error) => {
      console.log(error);
    });
}

export default getCompanies;
