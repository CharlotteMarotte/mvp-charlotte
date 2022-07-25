import React, { useEffect, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import HomeView from './views/Homeview';
import AboutView from './views/AboutView';
import CreateInvoiceView from './views/CreateInvoiceView';
import InvoiceDocView from './views/InvoiceDocView';
import Error404View from './views/Error404View';
import GeneralStatisticsView from './views/GeneralStatisticsView';
import SpecificStatisticsView from './views/SpecificStatisticsView';
import EnterDataView from './views/EnterDataView';
import PrivateRoute from './components/PrivateRoute';


import Local from './helpers/Local';
import Api from './helpers/Api';

import LoginView from './views/LoginView';
import ProfileView from './views/ProfileView';
import SignUpView from './views/SignUpView';

function App() {
  //
  // Declare state/reactive variables with initial values
  //
  const navigate = useNavigate();
  let [billCats, setBillCats] = useState([]); // when App is rendered all categories will be fetched from DB and stored here
  let [invoices, setInvoices] = useState([]); // when App is rendered all invoides will be fetched from DB and stored here and when a invoice is added this state will get updated
  let [statistics, setStatistics] = useState([]); // this gets set with all entries in statistic_data table when data is added to be stored until data is submitted by form in
  const [user, setUser] = useState(Local.getUser());
  const [loginErrorMsg, setLoginErrorMsg] = useState('');
  const [registerErrorMsg, setRegisterErrorMsg] = useState('');


  // gets all categories and all invoices that exist at the moment of rendering of the App
  useEffect(() => {
    getBillCats();
  }, []);

  //
  // Declare funcs used in this component
  //

  // POST method to add recipe to my sql database ("favorites" sql table) after click on Add to Favorites in the RecipeDetailView
  async function addUser(userData) {
    let myresponse = await Api.addUser(userData); // do POST
    if (myresponse.status === 400) {
      setRegisterErrorMsg('User name is already taken!');
    } else if (myresponse.ok) {
      setRegisterErrorMsg('');
      setLoginErrorMsg('');
      navigate('/login');
    } else {
      console.log(
        `Server error: ${myresponse.status} ${myresponse.statusText}`
      );
      setRegisterErrorMsg('Registration failed!');
    }
  }

  async function doLogin(username, password) {
    let myresponse = await Api.loginUser(username, password);
    if (myresponse.ok) {
      Local.saveUserInfo(myresponse.data.token, myresponse.data.user);
      setUser(myresponse.data.user);
      setLoginErrorMsg('');
      navigate('/');
    } else {
      setLoginErrorMsg('Login failed');
    }
  }

  function doLogout() {
    Local.removeUserInfo();
    setUser(null);
  }

  // // gets all entries in invoices data, see routes/Invoices for implementation
  // async function getInvoices() {
  //   try {
  //     let response = await fetch('/invoices'); // does GET by default
  //     if (response.ok) {
  //       let invoiceData = await response.json();
  //       setInvoices(invoiceData);
  //     } else {
  //       console.log(`Server error: ${response.status} ${response.statusText}`);
  //     }
  //   } catch (err) {
  //     console.log(`Server error: ${err.message}`);
  //   }
  // }

  // gets passed as a prop to CreateInvoice View
  async function addInvoice(invoiceData) {
  
   let response = await Api.addInvoice(invoiceData);
    try {
      if (response.ok) {
        let invoices = response.data;
        setInvoices(invoices);
      } else {
        console.log(`Server error: ${response.status} ${response.statusText}`);
      }
    } catch (err) {
      console.log(`Server error: ${err.message}`);
    }
  }

  async function addStatisticData(data) {
    let response = await Api.addStatisticData(data);

    try {
      if (response.ok) {
        let statistics = response.data;
        setStatistics(statistics); // set statistics state with all invoices including new ones
      } else {
        console.log(`Server error: ${response.status} ${response.statusText}`);
      }
    } catch (err) {
      console.log(`Server error: ${err.message}`);
    }
  }

  async function getBillCats() {
    let response = await Api.getContent('/bill-cats'); // 
    try {
      if (response.ok) {
        let categories = response.data;
        setBillCats(categories); // set billCats state with all categories, so it can be used by other components/views
      } else {
        console.log(`Server error: ${response.status} ${response.statusText}`);
      }
    } catch (err) {
      console.log(`Server error: ${err.message}`);
    }
  }

  function showInvoiceDoc() {
    navigate('/invoices'); // redirect to /invoices
  }

  function continueFromStatistics(data) {
    addStatisticData(data);
    navigate('/create'); // redirect to /create
  }

  return (
    <div className="App">
      <Navbar user={user} logoutCb={doLogout}/>
      <Routes>
        <Route path="/" element={<HomeView invoicesFromApp={invoices} />} />
        <Route path="about" element={<AboutView />} />
        <Route
            path="/login"
            element={
              <LoginView
                loginCb={(u, p) => doLogin(u, p)}
                loginError={loginErrorMsg}
              />
            }
          />
          <Route
            path="/signup"
            element={
              <SignUpView
                addUserCb={addUser}
                registerError={registerErrorMsg}
              />
            }
          />
          {/* Route to ProfileView*/}
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <ProfileView
                  user={user}
                />
              </PrivateRoute>
            }
          />
        <Route
          path="enter-data"
          element={
            <EnterDataView continueFromStatisticsCb={continueFromStatistics} />
          }
        />
        <Route
          path="create"
          element={
            <CreateInvoiceView
            user={user}
              billCatFromApp={billCats}
              showInvoiceDocCb={showInvoiceDoc}
              addInvoiceCb={addInvoice}
              nextNo={invoices.length + 1} // invoice numbers started with 1, so last invoice has number invoice.length
            />
          }
        />
        <Route
          path="invoices/:id"
          element={
            <InvoiceDocView
              billCatFromApp={billCats}
              // ix={invoices.length - 1} // not ideal way to show last invoice, assumes invoices can never be deleted
              // getInvoicesCb={getInvoices}
            />
          }
        />
        <Route
          path="general-statistics"
          element={
            <GeneralStatisticsView
              invoicesFromApp={invoices}
              billCatsFromApp={billCats}
            />
          }
        />
        <Route
          path="specific-statistics"
          element={
            <SpecificStatisticsView
              invoicesFromApp={invoices}
              billCatsFromApp={billCats}
            />
          }
        />
        <Route path="*" element={<Error404View />} />
        <Route path="*" element={<Error404View />} />
      </Routes>
    </div>
  );
}

export default App;
