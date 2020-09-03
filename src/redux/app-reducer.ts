import {setAuth} from "./auth-reducer";
import {ThunkAction} from "redux-thunk";
import {InferActionTypes, RootState} from "./redux-store";
import {getMyProfile} from "./myProfile-reducer";

const initialState = {
    initialize: false
};

//Reducer
export const AppReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'SN/APP/SET_INITIALIZED': {
            return {
                ...state,
                initialize: true,
            }
        }
        default:
            return state
    }
};

//Actions
export const actions = {
    initialize: () => ({type: 'SN/APP/SET_INITIALIZED'} as const),
};

//Thunk
export const setInitialized = (): ThunkType => async (dispatch, getState) => {
    const promiseAuth = await dispatch(setAuth());
    const id = getState().auth.userId;
    const profilePromise = await dispatch(getMyProfile(id));
        Promise.all([promiseAuth, profilePromise])
        .then(() => {
            dispatch(actions.initialize())
        });
};

//Types
type InitialStateType = typeof initialState
type ThunkType = ThunkAction<Promise<void>, RootState, {}, ActionsType>
type ActionsType = InferActionTypes<typeof actions>
