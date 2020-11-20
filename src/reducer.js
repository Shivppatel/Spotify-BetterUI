export const initialState = {
    user:null,
    playlists: [],
    playing: false,
    item:null,
    token: null,
    selected: '37i9dQZF1DX4JAvHpjipBk',
};

const reducer = (state, action) => {
    
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
        case 'SET_SELECTED_PLAYLIST':
            return{
                ...state,
                selected: action.selected,
            }
        case 'SET_PLAYING':
            return {
                ...state,
                playing: action.playing,
            }
        default:
            return state;
    }
}

export default reducer;