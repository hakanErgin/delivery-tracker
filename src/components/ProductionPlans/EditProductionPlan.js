import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';

export default class EditProductionPlan extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onChangeCode = this.onChangeCode.bind(this);
    this.onChangeQuantity = this.onChangeQuantity.bind(this);
    this.onChangeId = this.onChangeId.bind(this);

    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      id: props.match.params.id,
      productionPlanId: '',
      companies: [],
      company: '',
      code: '',
      quantity: '',
      date: ''
    };
  }

  componentDidMount() {
    axios
      .get('http://localhost:5000/production-plan/' + this.state.id)
      .then(response => {
        console.log(response);

        this.setState({
          productionPlanId: response.data.productionPlanId,
          code: response.data.code,
          quantity: response.data.quantity,
          company: response.data.company,
          date: new Date(response.data.date)
        });
        console.log('state', this.state);
      })
      .catch(function(error) {
        console.log(error);
      });

    axios
      .get('http://localhost:5000/companies/')
      .then(response => {
        console.log('response', response);
        this.setState({ companies: response.data });
        console.log('state', this.state);
      })
      .catch(error => {
        console.log(error);
      });
    console.log('component mounted. state:', this.state);
  }

  onChangeId(event) {
    console.log('event.target.value', event.target.value);

    this.setState({ productionPlanId: event.target.value });
    console.log('productionPlanId', this.state.productionPlanId);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  onChangeDate(date) {
    this.setState({
      date: date
    });
  }
  onChangeCode(event) {
    this.setState({
      code: event.target.value
    });
  }
  onChangeQuantity(event) {
    this.setState({
      quantity: event.target.value
    });
  }

  onSubmit(e) {
    e.preventDefault();

    const productionPlan = {
      productionPlanId: this.state.productionPlanId,
      company: this.state.company,
      code: this.state.code,
      quantity: this.state.quantity,
      date: this.state.date
    };

    axios
      .post(
        'http://localhost:5000/production-plan/update/' + this.state.id,
        productionPlan
      )
      .then(res => console.log(res.data))
      .then(() => (window.location = '/'));
  }

  render() {
    return (
      <div>
        <h3>Edit Production Plan</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Production Plan Id :</label>
            <input
              type="text"
              required
              className="form-control"
              value={this.state.productionPlanId}
              onChange={this.onChangeId}
            />
          </div>
          <div className="form-group">
            <label>Company : </label>
            <select
              name="company"
              ref="company"
              required
              className="form-control"
              value={this.state.company}
              onChange={this.handleChange}
            >
              {this.state.companies &&
                this.state.companies.map(function(company) {
                  return (
                    <option
                      key={company.companyName}
                      value={company.companyName}
                    >
                      {company.companyName}
                    </option>
                  );
                })}
            </select>
          </div>
          <div className="form-group">
            <label>Code: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.code}
              onChange={this.onChangeCode}
            />
          </div>
          <div className="form-group">
            <label>Quantity: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.quantity}
              onChange={this.onChangeQuantity}
            />
          </div>
          <div className="form-group">
            <label>Date: </label>
            <div>
              <DatePicker
                selected={this.state.date}
                onChange={this.onChangeDate}
              />
            </div>
          </div>
          <div className="form-group">
            <input
              type="submit"
              value="Edit Production Plan"
              className="btn btn-primary"
            />
          </div>
        </form>
      </div>
    );
  }
}
