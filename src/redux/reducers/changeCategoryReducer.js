import * as actionTypes from "../actions/actionTypes";
import initialState from "./initialState";

export default function changeCategoryReducer(
  state = initialState.currentCategory,
  action
) {
  switch (action.type) {
    case actionTypes.CHANGE_CATEGORY:
      return action.payload; //bu yeni state (= yeni kategori).

    default:
      return state; //action type ile eşleşen bir case yazilmamissa ayni state geri doner.
  }
}
