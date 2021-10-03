export const SET_MESSAGE = "SETMESSAGE"
export const CLEAR_MESSAGE = "CLEAR_MESSAGE"

export const setMessage = (message, message_type) => {
    return dispatch => {
        dispatch({ type: SET_MESSAGE, payload: { message, message_type } })
    }
}
export const clearMessage = () => {
    return dispatch => {
        dispatch({ type: CLEAR_MESSAGE })
    }
}