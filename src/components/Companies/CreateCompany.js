import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { createCompany, createNewCompany } from '../../actions/index';

const CreateCompany = ({ dispatch }) => {
  // React.useEffect(()=>{
  //   axios
  //     .get('http://localhost:5000/companies/')
  //     .then((response) => {
  //       console.log('response', response);

  //       this.setState({
  //         //   id: response.data.id,
  //         companyName: response.data.companyName,
  //       });
  //       console.log('state', this.state);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  //   console.log('component mounted. state:', this.state);
  // })

  const [companyName, setCompanyName] = React.useState('');
  const handleChange = (event) => {
    setCompanyName(event.target.value);
  };

  const onSubmit = React.useCallback(
    (e) => {
      e.preventDefault();
      dispatch(createNewCompany(companyName));
    },
    [companyName, dispatch]
  );

  return (
    <div>
      <h3>Create New Company</h3>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>Name: </label>
          <input
            name="companyName"
            type="text"
            className="form-control"
            value={companyName}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <input
            type="submit"
            value="Create Company"
            className="btn btn-primary"
          />
        </div>
      </form>
    </div>
  );
};
export default connect()(CreateCompany);
