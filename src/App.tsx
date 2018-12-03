import * as React from "react";
import { Route } from 'react-router-dom';
import "./App.css";
import Products from './pages/Products/Products';

const App = () => (
  <div>
    <Route path='/' component={Products}/>
  </div>
);

export default App;
