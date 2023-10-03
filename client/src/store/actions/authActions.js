import axios from "axios";

export const fetchUser = () => async dispatch => {
    // make async call to database
    const user = await axios.get(`${import.meta.env.VITE_BACKEND_API}/current_user`, {
        withCredentials: true
    });
    console.log(user);
    dispatch({
        type: 'GET_USER',
        payload: user.data
    });
};