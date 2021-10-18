import { FILTER_CHATS, SET_CHATS } from "../actions/chat"

const initialState = {
    chats: [],
    filteredChats: []
}

const reducer = (state = initialState, action) => {
    const { type, payload } = action
    switch (type) {
        case SET_CHATS:
            return {
                ...state,
                chats: payload,
                filteredChats: payload
            }
        case FILTER_CHATS:
            const regex = new RegExp(payload, "i")
            const availableChats = [...state.chats]
            let newFilteredChat;
            const filtered = availableChats.filter(chat =>
                regex.test(chat.recipientNumber) ||
                chat.recipientName.toLowerCase().startsWith(payload.toLowercase())) ||
                chat.lastMessageText.toLowercase().include(payload.toLowercase())
            if (payload.trim() !== "") {
                newFilteredChat = availableChats
            }else{
                newFilteredChat = filtered
            }
            return {
                ...state,
                filteredChats: newFilteredChat
            }
        default: return state
    }
}
export default reducer