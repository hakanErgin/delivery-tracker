import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import CreateDeliveryNote from './CreateDeliveryNotes';

const DeliveryNote = (props) => (
  <>
    {props.deliveryNote.map((delivery, index) => {
      if (index === 0)
        return (
          <Fragment key={index}>
            <td>{delivery.company}</td>
            <td>{delivery.code}</td>
            <td>{delivery.quantity}</td>
            <td>{delivery.productionPlan}</td>
          </Fragment>
        );
      else
        return (
          <Fragment key={index}>
            <td>{delivery.company}</td>
            <td>{delivery.code}</td>
            <td>{delivery.quantity}</td>
            <td>{delivery.productionPlan}</td>
          </Fragment>
        );
    })}
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
      .then((response) => {
        this.setState({ deliveryNotes: response.data });
        // console.log('response', response);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  deleteDeliveryNote(id) {
    axios
      .delete('http://localhost:5000/delivery-note/delete/' + id)
      .then((response) => {
        console.log(response.data);
      });

    this.setState({
      deliveryNotes: this.state.deliveryNotes.filter((el) => el._id !== id),
    });
  }

  createDeliveryNoteList() {
    return this.state.deliveryNotes.map((currentDeliveryNote, index) => {
      return (
        <tr key={index}>
          <td>{currentDeliveryNote.deliveryNoteId}</td>
          <td>{currentDeliveryNote.date.substring(0, 10)}</td>
          <DeliveryNote
            deliveryNote={currentDeliveryNote.delivery}
            deleteDeliveryNote={this.deleteDeliveryNote}
            key={currentDeliveryNote._id}
          />
          <td>
            <Link to={'delivery-note/edit/' + currentDeliveryNote._id}>
              edit
            </Link>
            <button
              onClick={() => {
                this.deleteDeliveryNote(currentDeliveryNote._id);
              }}
            >
              delete
            </button>
          </td>
        </tr>
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
              <th>Date</th>
              <th>Company</th>
              <th>Code</th>
              <th>Quantity</th>
              <th>Production Plan</th>
            </tr>
          </thead>
          <tbody>{this.createDeliveryNoteList()}</tbody>
        </table>
        <button onClick={() => this.setState({ showAddDeliveryNote: true })}>
          Add New Delivery Note
        </button>
        {this.state.showAddDeliveryNote && (
          <CreateDeliveryNote companies={this.props.companies} />
        )}
      </div>
    );
  }
}
