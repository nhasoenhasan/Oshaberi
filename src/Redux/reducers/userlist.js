const initialState = {
    userlist:[]
};

const userlistReducer = (state = initialState ,action) => {
    switch (action.type) {
        case "SET_USERLIST" :
            return {
                ...state,
                userlist: action.payload
            }

        default :
            return state;
    }
};

export default userlistReducer;