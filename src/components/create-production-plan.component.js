import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default class CreateProductionPlan extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onChangeCode = this.onChangeCode.bind(this);
    this.onChangeQuantity = this.onChangeQuantity.bind(this);

    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      productionPlanId: '',
      company: '',
      codes: [{ code: '', quantity: 0 }],
      date: new Date()
    };
  }

  componentDidMount() {
    axios
      .get('http://localhost:5000/production-plan/')
      .then(response => {
        if (response.data.length > 0) {
          this.setState({
            productionPlanId: response.data.productionPlanId,
            company: response.data.company,
            codes: response.data.map(code => code.code),
            date: response.data.date
          });
        }
      })
      .catch(error => {
        console.log(error);
      });
    console.log('component mounted. state:', this.state);
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
      codes: { ...this.state.codes, code: event.target.value }
    });
  }
  onChangeQuantity(event) {
    this.setState({
      codes: { ...this.state.codes, quantity: event.target.value }
    });
  }

  onSubmit(e) {
    e.preventDefault();

    const productionPlan = {
      productionPlanId: this.state.productionPlanId,
      company: this.state.company,
      codes: this.state.codes,
      date: this.state.date
    };

    console.log(productionPlan);

    axios
      .post('http://localhost:5000/production-plan/add', productionPlan)
      .then(res => console.log(res.data));

    // window.location = '/';
  }

  render() {
    return (
      <div>
        <h3>Create New Production Plan</h3>
        <form onSubmit={this.onSubmit}>
          {/* <div className="form-group">
            <label>Production Plan Id : </label>
            <select
              name="id"
              ref="idInput"
              required
              className="form-control"
              value={this.state.id}
              onChange={this.handleChange}
            >
              {this.state.company.map(function(company) {
                return (
                  <option key={company} value={company}>
                    {company}
                  </option>
                );
              })}
            </select>
          </div> */}
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
            <label>Company: </label>
            <input
              name="company"
              type="text"
              className="form-control"
              value={this.state.company}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group">
            <label>Code: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.codes.code}
              onChange={this.onChangeCode}
            />
          </div>
          <div className="form-group">
            <label>Quantity: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.codes.quantity}
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
