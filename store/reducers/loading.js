import { START_LOADING, START_LONG_LOADING, STOP_LOADING, STOP_LONG_LOADING } from "../actions/loading"

const initialState = {
    loading: false,
    loadText: "",
    longLoading: false
}

const reducer = (state=initialState, action) => {
    const { type, payload } = action

    switch(type){
        case START_LOADING:
            return {
                ...state,
                loading: true,
                loadText: payload
            }
        case STOP_LOADING:
            return{
                ...state,
                loading: false,
                loadText: ''
            }
        case START_LONG_LOADING:
            return {
                ...state,
                longLoading: true,
                loadText: payload
            }
        case STOP_LONG_LOADING:
            return {
                ...state,
                longLoading: false,
                loadText: ''
            }
        default:
            return initialState
    }
}
export default reducer