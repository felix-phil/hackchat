import { ADD_TO_CHATS, EDIT_CHAT } from "../actions/chatAdjust"

const initialState = {
    chats: {},
    filteredChats: {}
}

const reducer = (state = initialState, action) => {
    const { type, payload } = action
    switch (type) {
        case ADD_TO_CHATS:
            const allChats = { ...state.chats }
            let returnedChats;
            const recipientNumber = payload.chat.recipientNumber
            const phoneChat = allChats[recipientNumber]
            if (!phoneChat) {
                returnedChats = {
                    ...allChats, [recipientNumber]:
                    {
                        chat: payload.chat,
                        messages: [].concat(payload.message)
                    },
                }
            } else {
                returnedChats = allChats
            }
            return {
                ...state,
                chats: returnedChats,
                filteredChats: returnedChats
            }
        case EDIT_CHAT:
            const availableChat = { ...state.chats }
            let newChatValue;
            const currentPhoneChat = availableChat[payload.recipientNumber]
            if (currentPhoneChat) {
                newChatValue = currentPhoneChat
                newChatValue.chat.lastMessageId = payload.message.id
                newChatValue.chat.lastMessageText = payload.message.message
                newChatValue.chat.lastMessageDate = payload.message.date
                newChatValue.chat.unreadMessageCount = payload.addUnread ? +newChatValue.chat.unreadMessageCount + 1 : newChatValue.unreadMessageCount
                newChatValue.messages = newChatValue.messages.concat(payload.message)
                availableChat[payload.recipientNumber] = newChatValue
            }
            return{
                ...state,
                chats:availableChat,
                filteredChats: availableChat
            }
        default:
            return state
    }
}
export default reducer