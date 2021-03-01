import React, { Fragment, useEffect, useState } from "react";
import { connect } from "react-redux";
import { getCategories } from "../../redux/actions/categoryActions";
import { saveProduct } from "../../redux/actions/productActions";
import { CounterHooks } from "../CounterHooks";
import ProductDetail from "./ProductDetail";

/* 
setState yerine useState
componentDidMount yerine useEffect kullaniyoruz
React gelistirenler kolaylik icin bunu eklemis. Diger lifecycle eventleri normalde pek kullanilmadigindan.
*/

/*
Hooks ile bir componenti
   const func ()={} 
 seklinde de, 
   function func(){} 
 seklinde de yazabiliyoruz.
*/

function AddOrUpdateProduct({
  products,
  categories,
  getProducts,
  getCategories,
  saveProduct,
  history /* history ile geçmiş sayfa bilgisi. react in bir ozelligi */,
  ...props /* bu parametreleri componentin proplarina ekle anlamina geliyor */
}) {
  const [product, setProduct] = useState({ ...props.product });
  /* Bunun anlami product state'ini setProduct fonk. ile set edebiliriz demek oluyor. Yani setState yerine. */
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (categories.length === 0) {
      getCategories();
    }
    setProduct({ ...props.product });
  }, [
    props.product,
  ]); /* burad bir bug var, sonsuz donguye giriyor. O olmasin diye en son parametre olarak props.product DOMa yerlestigi zaman durdurma emri verdik. */

  function handleChange(event) {
    const { name, value } = event.target;
    setProduct((previousProduct) => ({
      ...previousProduct,
      [name]: name === "categoryId" ? parseInt(value, 10) : value,
    }));
    /* setErrors((previousErrors) => ({
      ...previousErrors,
      productName: "Ürün ismi olmalıdır",
    })); */
    //alert(errors.productName);
    //Burada validasyon kurali calistiriyoruz

    validate(name, value);
  }

  function validate(name, value) {
    if (name === "productName" && value === "") {
      setErrors((previousErrors) => ({
        ...previousErrors,
        productName: "Ürün ismi olmalıdır",
      }));
    } else {
      setErrors((previousErrors) => ({
        ...previousErrors,
        productName: "",
      }));
    }
  }

  function handleSave(event) {
    event.preventDefault(); //sayfa refresh olmasin
    saveProduct(product).then(() => {
      history.push("/"); /* daha önceki sayfa bilgisi */
    });
  }

  return (
    <Fragment>
      <CounterHooks />
      <ProductDetail
        product={product}
        categories={categories}
        onChange={handleChange}
        onSave={handleSave}
        errors={errors}
      />
    </Fragment>
  );
}

export function getProductById(products, productId) {
  let product =
    products.find((product) => product.id == productId) ||
    null; /* sayı(product.id) ve string(productId) == ile karşılaştırılırsa aynıdır */
  return product;
}

/* ownProps componentin kendi icindeki proplar icin.
ornegin querystring bilgisi gibi.
*/
function mapStateToProps(state, ownProps) {
  const productId = ownProps.match.params.productId;
  const product =
    productId && state.productListReducer.length > 0
      ? getProductById(state.productListReducer, productId) /* Update */
      : {}; /* Add */
  return {
    product,
    products: state.productListReducer,
    categories: state.categoryListReducer,
  };
}

/* Bu kullanim oteki fonksiyona gore daha guzel */
const mapDispatchToProps = {
  getCategories,
  saveProduct,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddOrUpdateProduct);
