import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import CreateDeliveryNote from './CreateDeliveryNotes';

const DeliveryNote = (deliveryNote) => {
  const { id, date, deliveries, dbId, isOdd } = deliveryNote;

  return deliveries.map((delivery, index) => {
    const isNewDeliveryNote = index === 0;
    return (
      <tr key={dbId} style={{ backgroundColor: isOdd ? '#ececec' : 'white' }}>
        <td>{isNewDeliveryNote && id}</td>
        <td>{isNewDeliveryNote && date}</td>
        <td>{delivery.company.companyName}</td>
        <td>{delivery.code}</td>
        <td>{delivery.quantity}</td>
        <td>{delivery.productionPlan}</td>
        <td>
          {isNewDeliveryNote && (
            <>
              <Link to={'delivery-note/edit/' + dbId}>edit</Link>
              <button
                onClick={() => {
                  this.deleteDeliveryNote(dbId);
                }}
              >
                delete
              </button>
            </>
          )}
        </td>
      </tr>
    );
  });
};

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

  onlyFirst(content, index) {
    if (index > 0) {
      return '';
    } else {
      return content;
    }
  }

  createDeliveryNoteList() {
    return this.state.deliveryNotes.map((currentDeliveryNote, index) => {
      console.log('currentDeliveryNote', currentDeliveryNote);
      return (
        <DeliveryNote
          id={currentDeliveryNote.deliveryNoteId}
          date={currentDeliveryNote.date.substring(0, 10)}
          deliveries={currentDeliveryNote.delivery}
          dbId={currentDeliveryNote._id}
          isOdd={index % 2 === 0}
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
          <thead className="thead">
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
