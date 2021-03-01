import * as actionTypes from "./actionTypes";

/* Bu dosyada action nesnesi donduren fonksiyonlar var.  */
/* Sonunda success olanlar, redux thunk kullandigimiz async islemlerin sonucuna gore guncelleme yapacak olan aksiyonlar */

export function getProductsSuccess(products) {
  return { type: actionTypes.GET_PRODUCTS_SUCCESS, payload: products };
}

export function createProductSuccess(product) {
  return { type: actionTypes.CREATE_PRODUCT_SUCCESS, payload: product };
}

export function updateProductSuccess(product) {
  return { type: actionTypes.UPDATE_PRODUCT_SUCCESS, payload: product };
}

export function saveProductApi(product) {
  var productId = product.id || "";
  var method = product.id ? "PUT" : "POST";
  return fetch("http://localhost:3004/products/" + productId, {
    method: method,
    headers: { "content-type": "application/json" },
    body: JSON.stringify(product) /* JS nesnesini JSON formatinda gonderir */,
  })
    .then(handleResponse)
    .catch(handleError);
}

/* duruma gore uygun aksiyonu calistir */
export function saveProduct(product) {
  return function (dispatch) {
    return saveProductApi(product)
      .then((savedProduct) => {
        product.id
          ? dispatch(updateProductSuccess(savedProduct))
          : dispatch(createProductSuccess(savedProduct));
      })
      .catch((error) => {
        throw error;
      });
  };
}

export async function handleResponse(response) {
  if (response.ok) {
    return response.json();
  }

  const error = await response.text();
  throw new Error(error);
}

export function handleError(error) {
  console.error("Bir hata oluştu");
  throw error;
}

export function getProducts(categoryId) {
  return function (dispatch) {
    let url = "http://localhost:3004/products";
    if (categoryId) {
      url = url + "?categoryId=" + categoryId;
    }
    return fetch(url)
      .then((response) => response.json())
      .then((responseJson) => dispatch(getProductsSuccess(responseJson)));
    //dipatch ile apiden gelen sonuc bir actiona donusturulup, state'i degistirmesi icin redux a paslaniyor
  };
}
