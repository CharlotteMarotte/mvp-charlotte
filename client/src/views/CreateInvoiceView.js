import React, { setState, useState } from 'react';
import './CreateInvoiceView.css';
import InvoiceItem from '../components/InvoiceItem';

const EMPTY_FORM = {
  nameSender: '',
  emailSender: '',
  invoiceNumber: 0,
  date: undefined,
  terms: '',
  nameRecipient: '',
  emailRecipient: '',
};


export default function CreateInvoiceView(props) {
  const [contactData, setContactData] = useState(EMPTY_FORM);
  const [invoiceItems, setInvoiceItems] = useState([]);
  const [amount, setAmount] = useState(0);

  const EMPTY_IT_FORM = props.billCatFromApp.map(c => ({CatId: c.ID, rate: 0, hours: 0})) 


  const addInvoiceItem = (e) => {
    let temp = { ...invoiceItems };
    temp.invoiceItems.push({
      id: 0,
      quantity: 0,
      rate: 0,
    });
    setInvoiceItems(temp);
  };

  // which category is it
  //  which of the two fields
  // find for cat ID in my invoiceItems arr
  // either update rate or hours
  // Cb for two arguments

  // name.split(-)
  // gets called every time a key is pressed
  const handleInputChange = (event) => {
    let { name, value } = event.target;

    // gets pressed after each key change
    setContactData((state) => ({
      ...state, // gets replaced by all key-value pairs from obj
      [name]: value, // updates key [name] with new value
    }));
  };


  // Look up nested objects to change React states

  // const handleIntInputChange = (event) => {
  //   setContactData((state) => ({
  //     ...state, // gets replaced by all key-value pairs from obj
  //     [name]: {[name]: value}, // updates key [name] with new value
  //   }));
  // }

  // gets called when submit gets pressed
  const handleSubmit = (e) => {
    e.preventDefault();
    props.showInvoiceDocCb();
    console.log('form button clicked!');
    // pass data back up to parent using props.addProject();
    //   props.addProject(project);
    // empty form after set
    setContactData(EMPTY_FORM);
  };

  //   need to call this in InvoiceItem
  function calcAmount(newAmount) {
    let result = amount + newAmount;
    setAmount(result);
  }

  return (
    <div className="CreateInvoiceView">
      {/* add handleSubmit function to onSubmit event */}
      <form onSubmit={handleSubmit}>
        <div>
          <p className="Addressants">FROM</p>
          <label>
            Name
            <input
              name="nameSender"
              type="text"
              value={contactData.nameSender}
              onChange={(e) => handleInputChange(e)}
            />
          </label>
          <label>
            Email
            <input
              name="emailSender"
              type="text"
              value={contactData.emailSender}
              onChange={(e) => handleInputChange(e)}
            />
          </label>
          <p className="Addressants">TO</p>
          <label>
            Name
            <input
              name="nameRecipient"
              type="text"
              value={contactData.nameRecipient}
              onChange={(e) => handleInputChange(e)}
            />
          </label>
        </div>
        <label>
          Email
          <input
            name="emailRecipient"
            type="text"
            value={contactData.emailRecipient}
            onChange={(e) => handleInputChange(e)}
          />
        </label>
        <p>INVOICE</p>
        <label>
          Invoice Number
          <input
            name="invoiceNumber"
            type="number"
            min="0"
            value={contactData.invoiceNumber}
            onChange={(e) => handleInputChange(e)}
          />
        </label>
        <label>
          Date
          <input
            name="date"
            type="date"
            value={contactData.date}
            onChange={(e) => handleInputChange(e)}
          />
        </label>

        <div className="InvoiceInput">
          <div className="InvoiceGrid">
            <p> </p>
            <p>Description</p>
            <p>Rate</p>
            <p>Quantity</p>
            <p>Amount</p>
          </div>
          <div className="seperator"></div>

          <div className="InvoiceItem">
            {props.billCatFromApp.map((p, index) => (
              // arrow function, so it doesn't get called immediately but only after a click
              <InvoiceItem key={index} billCatFromApp={p} />
            ))}
          </div>
          <p>Total: {amount} €</p>

          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}
