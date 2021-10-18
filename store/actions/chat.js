import Chat from "../../models/chat"

export const SET_CHATS = "SET_CHATS"
export const FILTER_CHATS = "FILTER_CHATS"

export const setChats = () => {
    return async dispatch => {
        try{
            const allChats = await Chat.findAll()
            dispatch({ type: SET_CHATS, payload: allChats.rows._array })
        }catch(error){
            throw error
        }
    }
}
export const filterChats = (filter) => {
    return { type: FILTER_CHATS, payload: filter }
}