import React, { useEffect, useState } from 'react';
import './InvoiceDocView.css';
import InvoiceDocItem from '../components/InvoiceDocItem';

export default function InvoiceDocView(props) {
  let [currInvoice, setCurrInvoice] = useState(null);
  let [total, setTotal] = useState(props.ix);

  useEffect(() => {
    props.getInvoicesCb();
    getLastInvoice();
    getTotalAmount();
  }, []);

  async function getLastInvoice() {
    try {
      let response = await fetch('/invoices/last-invoice'); // does GET by default
      if (response.ok) {
        let invoiceData = await response.json();
        setCurrInvoice(invoiceData);
      } else {
        console.log(`Server error: ${response.status} ${response.statusText}`);
      }
    } catch (err) {
      console.log(`Server error: ${err.message}`);
    }
  }

  async function getTotalAmount(id) {
    try {
      let response = await fetch('/invoices/last-invoice'); // does GET by default
      if (response.ok) {
        let invoiceData = await response.json();
        let id = Number(invoiceData.id);
        try {
          let response = await fetch(`/invoices/${id}/total`); // does GET by default
          if (response.ok) {
            let calcTotal = await response.json();
            setTotal(calcTotal);
          } else {
            // function calls goes into this else condition
            console.log(
              `Server error: ${response.status} ${response.statusText}`
            );
          }
        } catch (err) {
          console.log(`Server error: ${err.message}`);
        }
      } else {
        console.log(`Server error: ${response.status} ${response.statusText}`);
      }
    } catch (err) {
      console.log(`Server error: ${err.message}`);
    }
  }

  if (!currInvoice || !props.billCatFromApp.length) {
    return <div>Waiting for data to load...</div>;
  }
  return (
    <div className="row row-cols-12 InvoiceDocView">
      <div className="col-3 offset-2">
        <h3>FROM:</h3>
      </div>
      <div className="col-3">
        <p>{currInvoice.nameFrom}</p>
      </div>

      <div className="col-3">
        <p> {currInvoice.emailFrom}</p>
      </div>
      <div className="col-3 offset-2">
        <h3>TO:</h3>
      </div>
      <div className="col-3">
        <p>{currInvoice.nameTo}</p>
      </div>

      <div className="col-3">
        <p>{currInvoice.emailTo}</p>
      </div>
      <div className="col-4 Date offset-2">
        <h3>INVOICE DATE:</h3> 
      </div>
      <div className="col-4 Date offset-2">
        <p>{currInvoice.invoiceDate.slice(0, 10)} </p>
      </div>
      <div className="col-12 Date offset-2 mb-3">
        <h3>INVOICE NO: {currInvoice.id} </h3>
      </div>
      <div className="row row-cols-12 border-top border-bottom border-danger border-3 py-2">
        <h4 className="col-3">Category</h4>
        <h4 className="col-3">Rate</h4>
        <h4 className="col-3">Hours</h4>
        <h4 className="col-3">Amount</h4>
      </div>
      <div className="row row-cols-12 border-bottom border-danger border-3 my-3">
        {currInvoice.invoiceItems.map((it, index) => (
          // arrow function, so it doesn't get called immediately but only after a click
          <InvoiceDocItem
            key={index}
            billCatFromApp={props.billCatFromApp}
            invoiceFromDoc={it}
          />
        ))}
      </div>
      <p className="offset-10">Total: {total} €</p>
    </div>
  );
}
