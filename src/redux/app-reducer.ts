import {setAuth} from "./auth-reducer";
import {ThunkAction, ThunkDispatch} from "redux-thunk";
import {AnyAction} from "redux";

const SET_INITIALIZED = "SET_INITIALIZED";

type InitialStateType = {
    initialize: boolean
}
type InitializeActionType = {
    type: typeof SET_INITIALIZED
}

const initialState: InitialStateType = {
    initialize: false
};

const AppReducer = (state = initialState, action: InitializeActionType) => {
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

export const setInitialized = (): ThunkAction<Promise<void>, {}, {}, AnyAction> => async (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    const promise = await dispatch(setAuth());
    Promise.all([promise])
        .then( () => {
            dispatch(initialize())
    });
};

export default AppReducer;