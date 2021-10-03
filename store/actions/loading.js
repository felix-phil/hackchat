export const START_LOADING = "START_LOADING"
export const STOP_LOADING = "STOP_LOADING"
export const START_LONG_LOADING = "START_LONG_LOADING"
export const STOP_LONG_LOADING = "STOP_LONG_LOADING"

export const startLoading = (loadText) => {
    return dispatch => {
        dispatch({ type: START_LOADING, payload: loadText})
    }
}

export const stopLoading = () => {
    return dispatch => {
        dispatch({ type: STOP_LOADING})
    }
}

export const startLongLoading = (loadText) => {
    return dispatch => {
        dispatch({ type: START_LONG_LOADING, payload: loadText})
    }
}

export const stopLongLoading = () => {
    return dispatch => {
        dispatch({ type: STOP_LONG_LOADING})
    }
}