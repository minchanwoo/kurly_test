import axios from "axios";
import { BASE_URL } from "./constants";

export const CART_COUNT = "CART_COUNT";

export const getCartCountAsync = async (dispatch: (action: any) => void) => {
  const result = await axios.get(`${BASE_URL}/carts/count`, {
    withCredentials: true
  });
  dispatch({
    type: CART_COUNT,
    cart_count: result.data.count
  });
};
