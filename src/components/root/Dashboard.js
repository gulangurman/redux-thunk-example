import React, { Component } from "react";
import { Row, Col } from "reactstrap";
import CategoryList from "../categories/CategoryList";
import ProductList from "../products/ProductList";
import FeaturedProducts from "../products/FeaturedProducts";
import CartDetails from "../cart/CartDetails";

class Dashboard extends Component {
  render() {
    return (
      <div>
        <Row>
          <Col xs="3">
            <CategoryList />
          </Col>
          <Col xs="6">
            {/*  <FeaturedProducts /> */}
            <ProductList />
          </Col>
          <Col>
            <CartDetails />
          </Col>
        </Row>
      </div>
    );
  }
}

export default Dashboard;
