import {setAuth} from "./auth-reducer";
import {ThunkAction} from "redux-thunk";
import {RootState} from "./redux-store";

const SET_INITIALIZED = "SET_INITIALIZED";

export type InitialStateType = {
    initialize: boolean;
}

const initialState: InitialStateType = {
    initialize: false
};

const AppReducer = (state = initialState, action: InitializeActionType): InitialStateType => {
    switch (action.type) {
        case SET_INITIALIZED: {
            return {
                ...state,
                initialize: true,
            }
        }
        default:
            return state
    }
};

type InitializeActionType = {
    type: typeof SET_INITIALIZED;
}
export const initialize = (): InitializeActionType => ({type: SET_INITIALIZED});

type ThunkType = ThunkAction<Promise<void>, RootState, {}, InitializeActionType>

export const setInitialized = (): ThunkType => async (dispatch) => {
    const promiseAuth = await dispatch(setAuth());
    Promise.all([promiseAuth])
        .then(() => {
            dispatch(initialize())
        });
};

export default AppReducer;