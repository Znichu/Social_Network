const SET_AUTH_DATA = "SET_AUTH_DATA";

let initialState = {
    userId: null,
    email: null,
    login: null,
    isAuth: false
};

const AuthReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_AUTH_DATA: {
            return {
                ...state,
                ...action.data,
                isAuth: true
            }
        }
        default: return state
    }
};

export const setAuthUserData = ( userId, login, email ) => ({type:SET_AUTH_DATA, data: {userId, login,email }});

export default AuthReducer;