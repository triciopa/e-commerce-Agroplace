import axios from "axios";

export const LOGIN_ACTION_KEY = "LOGIN_ACTION_KEY";


export const LoginAction = (email, password) =>{
    return async function (dispatch) {
        const info = await axios.get(`http://localhost:3001/users/login?email=${email}&password=${password}`);
        console.log(info.data)
        dispatch({
          type: LOGIN_ACTION_KEY,
          payload: info.data,
        });
      };
}