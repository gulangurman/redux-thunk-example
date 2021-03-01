import React, { Component } from "react";
import { Row, Col } from "reactstrap";
import { connect } from "react-redux";

class FeaturedProducts extends Component {
  render() {
    return (
      <div>
        <Row>
          <h3>Featured products:</h3>
          <hr></hr>
          {this.props.featuredProducts.map((product) => (
            <Col>
              <p>{product.productName}</p>
            </Col>
          ))}
          <hr></hr>
        </Row>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    featuredProducts: [] /* state.productListReducer */,
  };
}
export default connect(mapStateToProps)(FeaturedProducts);
