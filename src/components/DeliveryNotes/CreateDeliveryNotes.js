/* eslint-disable no-unused-expressions */
import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default class CreateDeliveryNote extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.onChangeCode = this.onChangeCode.bind(this);
    this.onChangeQuantity = this.onChangeQuantity.bind(this);

    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      deliveryNoteId: '',
      date: new Date(),
      companies: [],
      deliveries: [{ company: '', code: '', quantity: '', productionPlan: '' }],
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
    console.log('add- state:', this.state);

    // axios
    //   .get('http://localhost:5000/production-plan/')
    //   .then((response) => {
    //     const dateArray = response.data.filter((x) => x.quantity > 0 && x.date);
    //     console.log('datearray with no 0 quantity', dateArray);
    //     const prodPlan = dateArray.sort()[0];
    //     console.log('production plan', prodPlan);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
    console.log(this.state);
  }

  handleSelectChange(event) {
    const deliveries = { ...this.state.deliveries };
    deliveries[0].company = event.target.value;
    this.setState({ deliveries });
    console.log(this.state);
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
      quantity: event.target.value,
    });
  }

  onSubmit(e) {
    e.preventDefault();

    const deliveryNote = {
      deliveryNoteId: this.state.deliveryNoteId,
      company: this.state.company,
      code: this.state.code,
      quantity: this.state.quantity,
      date: this.state.date,
    };

    console.log(deliveryNote);

    axios
      .post('http://localhost:5000/delivery-note/add', deliveryNote)
      .then((res) => console.log(res.data))
      .then(() => (window.location = '/'));
  }

  addFields() {}

  render() {
    return (
      <div>
        <h3>Create New Delivery Note</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Delivery Note Id : </label>
            <input
              name="deliveryNoteId"
              type="text"
              className="form-control"
              value={this.state.deliveryNoteId}
              onChange={this.handleChange}
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
            <label>Company : </label>
            <select
              name="company"
              ref="company"
              required
              className="form-control"
              value={this.state.deliveries.company}
              onChange={this.handleSelectChange}
            >
              <option value="placeholder" defaultValue>
                Select a Company
              </option>
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
            <label>Production plan: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.quantity}
            />
          </div>

          <button type="button" onClick={(e) => this.addFields(e)}>
            add
          </button>
          <div className="form-group">
            <input
              type="submit"
              value="Create Delivery Note"
              className="btn btn-primary"
            />
          </div>
        </form>
      </div>
    );
  }
}
