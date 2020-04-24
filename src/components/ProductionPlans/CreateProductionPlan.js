import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default class CreateProductionPlan extends Component {
  constructor(props) {
    super(props);
    this.handleCompanyChange = this.handleCompanyChange.bind(this);

    this.handleChange = this.handleChange.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onChangeCode = this.onChangeCode.bind(this);
    this.onChangeQuantity = this.onChangeQuantity.bind(this);

    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      productionPlanId: '',
      companies: [],
      company: {},
      code: '',
      originalQuantity: 0,
      quantityLeft: 0,
      date: new Date(),
    };
  }

  componentDidMount() {
    axios
      .get('http://localhost:5000/companies/')
      .then((response) => {
        console.log('response', response);
        this.setState({ companies: response.data });
        console.log('state', this.state);
      })
      .catch((error) => {
        console.log(error);
      });
    console.log('component mounted. state:', this.state);
  }

  handleCompanyChange(event) {
    this.setState({
      company: this.state.companies.find(
        (c) => c.companyName === event.target.value
      ),
    });
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  onChangeDate(date) {
    this.setState({
      date: date,
    });
  }
  onChangeCode(event) {
    this.setState({
      code: event.target.value,
    });
  }
  onChangeQuantity(event) {
    this.setState({
      originalQuantity: event.target.value,
    });
  }

  onSubmit(e) {
    e.preventDefault();

    const productionPlan = {
      productionPlanId: this.state.productionPlanId,
      company: this.state.company,
      code: this.state.code,
      originalQuantity: this.state.originalQuantity,
      quantityLeft: this.state.originalQuantity,
      date: this.state.date,
    };

    console.log(productionPlan);

    axios
      .post('http://localhost:5000/production-plan/add', productionPlan)
      .then((res) => console.log(res.data))
      .then(() => (window.location = '/'));
  }

  render() {
    return (
      <div>
        <h3>Create New Production Plan</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Production Plan Id : </label>
            <input
              name="productionPlanId"
              type="text"
              required
              className="form-control"
              value={this.state.productionPlanId}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group">
            <label>Company : </label>
            <select
              name="company"
              ref="company"
              required
              className="form-control"
              value={this.state.company.companyName}
              onChange={this.handleCompanyChange}
            >
              <option value="placeholder">Select a Company</option>

              {this.state.companies &&
                this.state.companies.map(function (company) {
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
              required
              className="form-control"
              value={this.state.code}
              onChange={this.onChangeCode}
            />
          </div>
          <div className="form-group">
            <label>Quantity: </label>
            <input
              type="text"
              required
              className="form-control"
              value={this.state.originalQuantity}
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
              value="Create Production Plan"
              className="btn btn-primary"
            />
          </div>
        </form>
      </div>
    );
  }
}
