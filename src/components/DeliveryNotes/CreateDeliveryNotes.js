import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import DeliveryBlock from './DeliveryBlock';

export default class CreateDeliveryNote extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      deliveryNoteId: '',
      date: new Date(),
      companies: [],
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
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
    console.log(this.state);
  }

  onChangeDate(date) {
    this.setState({
      date: date,
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
          <DeliveryBlock companies={this.state.companies} />
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
