import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import CreateDeliveryNote from './CreateDeliveryNotes';

const DeliveryNote = props => (
  <>
    <tr>
      <td>{props.deliveryNote.deliveryNoteId}</td>
      <td>{props.deliveryNote.company}</td>

      <td>{props.deliveryNote.code}</td>
      <td>{props.deliveryNote.quantity}</td>

      <td>{props.deliveryNote.date.substring(0, 10)}</td>
      <td>
        <Link to={'/edit/' + props.deliveryNote._id}>edit</Link> |{' '}
        <a
          href="#"
          onClick={() => {
            props.deleteDeliveryNote(props.deliveryNote._id);
          }}
        >
          delete
        </a>
      </td>
    </tr>
    <tr>
      <td>deliveries</td>
    </tr>
  </>
);

export default class DeliveryNoteList extends Component {
  constructor(props) {
    super(props);

    this.deleteDeliveryNote = this.deleteDeliveryNote.bind(this);

    this.state = { deliveryNotes: [], showAddDeliveryNote: false };
  }

  componentDidMount() {
    axios
      .get('http://localhost:5000/delivery-note/')
      .then(response => {
        this.setState({ deliveryNotes: response.data });
        console.log('response', response);
      })
      .catch(error => {
        console.log(error);
      });
  }

  deleteDeliveryNote(id) {
    axios
      .delete('http://localhost:5000/production-plan/delete' + id)
      .then(response => {
        console.log(response.data);
      });

    this.setState({
      deliveryNotes: this.state.deliveryNotes.filter(el => el._id !== id)
    });
  }

  createDeliveryNoteList() {
    return this.state.deliveryNotes.map(currentDeliveryNote => {
      return (
        <DeliveryNote
          deliveryNote={currentDeliveryNote}
          deleteDeliveryNote={this.deleteDeliveryNote}
          key={currentDeliveryNote._id}
        />
      );
    });
  }
  addDeliveryNote() {
    this.setState({ showAddDeliveryNote: true });
  }

  render() {
    return (
      <div>
        <h3>List of Delivery Notes</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Delivery Note Id</th>
              <th>Company</th>
              <th>Code</th>
              <th>Quantity</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>{this.createDeliveryNoteList()}</tbody>
        </table>
        <button onClick={() => this.setState({ showAddDeliveryNote: true })}>
          Add New Delivery Note
        </button>
        {this.state.showAddDeliveryNote && <CreateDeliveryNote />}
      </div>
    );
  }
}
