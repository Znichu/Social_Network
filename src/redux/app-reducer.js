import {setAuth} from "./auth-reducer";

const SET_INITIALIZED = "SET_INITIALIZED";

let initialState = {
    initialize: false
};

const AppReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_INITIALIZED: {
            return {
                ...state,
                initialize: true
            }
        }
        default: return state
    }
};

export const initialize = () => ({type: SET_INITIALIZED});

export const setInitialized = () => (dispatch) => {
    let promise = dispatch(setAuth());
    Promise.all([promise])
        .then( () => {
            dispatch(initialize())
    });
};

export default AppReducer;