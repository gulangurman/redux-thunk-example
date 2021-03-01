import React from "react";
import Navi from "../navi/Navi";
import { Badge, Container } from "reactstrap";
import Dashboard from "./Dashboard";
import { Switch, Route } from "react-router-dom";
import CartDetails from "../cart/CartDetails";
import AddOrUpdateProduct from "../products/AddOrUpdateProduct";
import NotFound from "../common/NotFound";
import { CounterHooks } from "../CounterHooks";

function App() {
  return (
    <div>
      <Container>
        <Navi />
        <CounterHooks />
        <Switch>
          <Route exact path="/" component={Dashboard} />
          <Route path="/product" component={Dashboard} />
          <Route exact path="/cart" component={CartDetails} />
          <Route
            path="/saveproduct/:productId"
            component={AddOrUpdateProduct}
          />
          <Route path="/saveproduct" component={AddOrUpdateProduct} />
          <Route component={NotFound} />
        </Switch>
      </Container>
    </div>
  );
}

export default App;
