export const initialState = {
    user:null,
    playlists: [],
    playing: false,
    item:null,
    //Remove After Debuging
    token: null,
};

const reducer = (state, action) => {
    console.log(action);
    switch(action.type) {
        case 'SET_USER':
            return {
                ...state, 
                user: action.user,
            };
        case 'SET_TOKEN':
            return{
                ...state,
                token: action.token,
            }
        case 'SET_PLAYLISTS':
            return{
                ...state,
                playlists: action.playlists,
            }
        case 'SET_TOP_PLAYLIST':
            return{
                ...state,
                top_playlist: action.top_playlist,
            }
        default:
            return state;
    }
}

export default reducer;