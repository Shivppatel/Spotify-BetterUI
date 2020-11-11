export const initialState = {
    user:null,
    playlists: [],
    playing: false,
    item:null,
    token:'BQAuHTBH8wQyCCyUeeSAVe5Z7rkWYHwwhTCdptB6K8Rie_7LBf4F3G3sa250grSYuKVSaXC4JPjHvXYLPfH72u7bTff69MV8_8k2w2TKFN2yVCLjjG2BmdYEaCJqm-_bN34lvc8In2Eb-5aG8tM8ApbP8eWWYK15iD4IJHv5rgoIbW4n',
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
        default:
            return state;
    }
}

export default reducer;