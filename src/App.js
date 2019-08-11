import React from 'react';
import './App.css';
import Header from './Header';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import ShipmentInformation from './components/ShipmentInformation';
import ShipmentsChart from './components/ShipmentsChart';

function App() {
  return (
    <Router>
      <Header/>
      <div className='app-container'>
          <Route path="/" exact component={ShipmentsChart} />
          <Route path="/details" exact component={ShipmentInformation} />
      </div>
    </Router>
  );
}

export default App;
