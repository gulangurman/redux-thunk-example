import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as categoryActions from "../../redux/actions/categoryActions";
import * as productActions from "../../redux/actions/productActions";
import { ListGroup, ListGroupItem, Badge } from "reactstrap";

class CategoryList extends Component {
  componentDidMount() {
    this.props.actions.getCategories();
  }

  //Kategori degisimini tetikleyen islem bu !
  selectCategory = (category) => {
    this.props.actions.changeCategory(category);
    this.props.actions.getProducts(category.id);
    //Kategori degistiginde urunleri yeniden getirir.
    //Bu olunca state degistiginden Product componenti yeniden render edilecek
  };
  render() {
    return (
      <div>
        <h3>
          <Badge color="warning">Kategoriler</Badge>{" "}
          <Badge color="info">{this.props.categories.length}</Badge>
        </h3>
        <ListGroup>
          {this.props.categories.map((category) => (
            <ListGroupItem
              key={category.id}
              active={
                this.props.currentCategory.id === category.id ? true : false
              }
              onClick={
                () =>
                  this.selectCategory(
                    category
                  ) /* this.props.actions.changeCategory(category) */
              }
            >
              {category.categoryName}
            </ListGroupItem>
          ))}
        </ListGroup>
        {/*  <h5>Seçili kategori: {this.props.currentCategory.categoryName}</h5> */}
      </div>
    );
  }
}

//State=reducerlar, dispatch=actionlar olarak dusunebiliriz !
function mapStateToProps(state) {
  return {
    currentCategory: state.changeCategoryReducer,
    categories: state.categoryListReducer,
  }; //props.currentCategory'yi state'deki changeCatReducer'a abone et
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      getCategories: bindActionCreators(
        categoryActions.getCategories,
        dispatch
      ),
      changeCategory: bindActionCreators(
        categoryActions.changeCategory,
        dispatch
      ),
      getProducts: bindActionCreators(productActions.getProducts, dispatch),
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryList);
