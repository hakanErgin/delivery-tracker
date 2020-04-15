import React, { Component } from 'react';
import axios from 'axios';

export default class CreateCompany extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      companyName: '',
    };
  }

  componentDidMount() {
    axios
      .get('http://localhost:5000/companies/')
      .then((response) => {
        console.log('response', response);

        this.setState({
          //   id: response.data.id,
          companyName: response.data.companyName,
        });
        console.log('state', this.state);
      })
      .catch((error) => {
        console.log(error);
      });
    console.log('component mounted. state:', this.state);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  onSubmit(e) {
    e.preventDefault();

    const company = {
      companyName: this.state.companyName,
    };

    console.log(company);

    axios
      .post('http://localhost:5000/companies/add', company)
      .then((res) => console.log(res.data))
      .then(() => (window.location = '/companies'));
  }

  render() {
    return (
      <div>
        <h3>Create New Company</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Name: </label>
            <input
              name="companyName"
              type="text"
              className="form-control"
              value={this.state.companyName}
              onChange={this.handleChange}
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
  }
}
