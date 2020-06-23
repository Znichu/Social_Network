
type FriendsType = {
    id: number
    name: string
}
let initialState = {
    friend: [
        {id: 1, name: 'Serg'},
        {id: 2, name: 'Dima'},
        {id: 3, name: 'Lena'}
    ] as Array<FriendsType>
};

type InitialStateType = typeof initialState;

const friendsReducer = (state = initialState, action: any): InitialStateType => {
    return state;
}

export default friendsReducer;