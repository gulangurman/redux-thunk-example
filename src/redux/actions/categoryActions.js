import * as actionTypes from "./actionTypes";

export function changeCategory(category) {
  return { type: actionTypes.CHANGE_CATEGORY, payload: category };
}

export function getCategoriesSuccess(categories) {
  return { type: actionTypes.GET_CATEGORIES_SUCCESS, payload: categories }; //asenkron işlem sonunda state burada set ediliyor
}

export function getCategories() {
  return function (dispatch) {
    //debugger;
    let url = "http://localhost:3004/categories";
    return fetch(url)
      .then((response) => response.json())
      .then((jsonResponse) => dispatch(getCategoriesSuccess(jsonResponse))); //buradaki dispatch ile async olarak aksiyon çağırılmasını thunk sagladi !!
  };
}
