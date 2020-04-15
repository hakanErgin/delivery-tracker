import React, { Component } from 'react';
import axios from 'axios';

export default class EditCompany extends Component {
  constructor(props) {
    super(props);

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      id: props.match.params.id,
      companyName: '',
    };
  }

  componentDidMount() {
    console.log('state.id', this.state.id);

    axios
      .get('http://localhost:5000/companies/' + this.state.id)
      .then((response) => {
        this.setState({
          companyName: response.data.companyName,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  onChange(e) {
    this.setState({
      companyName: e.target.value,
    });
  }

  onSubmit(e) {
    e.preventDefault();

    const company = { companyName: this.state.companyName };
    console.log(company);

    axios
      .post('http://localhost:5000/companies/update/' + this.state.id, company)
      .then((res) => console.log(res.data))
      .then(() => (window.location = '/companies'));
  }

  render() {
    return (
      <div>
        <h3>Edit Company</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Company Name: </label>
            <input
              type="text"
              required
              className="form-control"
              value={this.state.companyName}
              onChange={this.onChange}
            />
          </div>
          <div className="form-group">
            <input
              type="submit"
              value="Edit Company"
              className="btn btn-primary"
            />
          </div>
        </form>
      </div>
    );
  }
}
