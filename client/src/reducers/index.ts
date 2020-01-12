import { LOGIN } from "./user";
import { CART_COUNT } from "./cart";

const initialState = {
  nick: "",
  cart_count: 0
};

const reducers = (state = initialState, action: any) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        nick: action.nick
      };
    case CART_COUNT:
      return {
        ...state,
        cart_count: action.cart_count
      };

    default:
      return state;
  }
};

export default reducers;
