import * as actionTypes from "../actions/actionTypes";
import initialState from "./initialState";

export default function cartReducer(state = initialState.cart, action) {
  switch (action.type) {
    case actionTypes.ADD_TO_CART:
      var existingItem = state.find(
        (c) => c.product.id === action.payload.product.id
      );

      if (existingItem) {
        //arrayi degistirmek icin onceki projede filter kullanmistik..
        var newState = state.map((cartItem) => {
          if (cartItem.product.id === action.payload.product.id) {
            return Object.assign({}, existingItem, {
              quantity: existingItem.quantity + 1,
            });
          }
          return cartItem;
        });
        return newState; //varolan sayiyi bir artir
      } else {
        return [...state, { ...action.payload }]; //state'in kopyasini al, payload'u aynen ilave et
        // REDUX TA PUSH,POP YAPMIYORUZ !!
      }

    case actionTypes.REMOVE_FROM_CART:
      //filter yeni array olusturdugundan referans degisiyor. Redux ta state degisince referansin degismesi lazim.
      var newState = state.filter(
        (cartItem) => cartItem.product.id !== action.payload.id
      );
      return newState;

    default:
      return state;
  }
}
