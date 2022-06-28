import { ADD_TO_ALL_MESSAGE, HANDLE_REPORT, MARK_ALL_READ, SET_CURRENT_VIEW_MESSAGE } from "../actions/chatMessages"

const initialState = {
    currentMessages: {
        currentViewMessages: [],
        currentViewFilteredMessages: [],
    },
    allMessages: {}
}

const reducer = (state = initialState, action) => {
    const { type, payload } = action
    switch (type) {
        case SET_CURRENT_VIEW_MESSAGE:
            return {
                ...state,
                currentMessages: {
                    currentViewMessages: payload,
                    currentViewFilteredMessages: payload
                }
            }
        case ADD_TO_ALL_MESSAGE:
            const phoneNumber = action.phoneNumber
            const currentAllMessages = { ...state.allMessages }
            let chat = state.allMessages[phoneNumber]
            if (!chat) {
                chat = []
            }
            return {
                ...state,
                allMessages: { ...currentAllMessages, [phoneNumber]: [...chat, payload] }
            }
        case HANDLE_REPORT:
            const currentMessages = { ...state.allMessages }
            const phoneNumberMessages = [...currentMessages[payload.to]]
            const theMessage = phoneNumberMessages.findIndex(msg => msg.id === payload.message.senderMessageId)

            phoneNumberMessages[theMessage].status = payload.STATUS

            return {
                ...state,
                allMessages: { ...currentMessages, [payload.to]: phoneNumberMessages }
            }
        default:
            return state
    }
}
export default reducer