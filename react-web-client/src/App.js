import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { ToastContainer } from "react-toastify";
import AddProduct from "./components/containers/products/AddProduct";
import EditProduct from "./components/containers/products/EditProduct";
import Products from "./components/containers/products/Products";
import ProductDetail from "./components/containers/products/ProductDetail"; 
import QRScanner from "./components/containers/qr-code-scanner/QRScanner"; 

function App() {
  return (
    <React.Fragment>
      <ToastContainer />
      <Router>
        <div className="App">
          <Switch>
            <Route exact path="/" component={Products} />
            <Route exact path="/add-product" component={AddProduct} />
            <Route exact path="/product-scanner" component={QRScanner} />
            <Route exact path="/edit-product/:id" component={EditProduct} />
            <Route exact path="/detail-product/:id" component={ProductDetail} />
          </Switch>
        </div>
      </Router>
    </React.Fragment>
  );
}

export default App;
