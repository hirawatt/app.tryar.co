const authReducer = (state = null, action) => {
    switch (action.type) {
        case 'GET_USER':
            //console.log(action.payload);
            return action.payload || false;
        default:
            return state;
    }
}

export default authReducer;