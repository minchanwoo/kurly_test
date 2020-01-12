import axios from "axios";
import { BASE_URL } from "./constants";
import { getCartCountAsync } from "./cart";

export const LOGIN = "LOGIN";

export const loginAsync = async (
  nick: string,
  password: string,
  dispatch: (action: any) => void
) => {
  try {
    const result = await axios.post(
      `${BASE_URL}/users/login`,
      {
        nick,
        password
      },
      { withCredentials: true }
    );
    await setLoggedIn(result.data.nick, dispatch);
    await getCartCountAsync(dispatch);
  } catch (e) {
    throw e;
  }
};

export const setLoggedIn = async (
  nick: string,
  dispatch: (action: any) => void
) => {
  dispatch({
    type: LOGIN,
    nick
  });
};
