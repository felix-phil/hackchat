import uuid from "react-native-uuid"
import * as socket from "../../helpers/socket"
import Contact from "../../models/contacts";

export const SET_CHATS = "SET_CHATS"
export const FILTER_CHATS = "FILTER_CHATS"
export const ADD_TO_CHATS = "ADD_TO_CHATS"
export const EDIT_CHAT = 'EDIT_CHAT'
export const MARK_ALL_READ = "MARK_ALL_READ"

export const addChat = (chat, message) => {
    return { type: ADD_TO_CHATS, payload: {chat, message} }
}
export const editChat = (recipientNumber, message, addUnread) => {
    return { type: EDIT_CHAT, payload: {message, recipientNumber: recipientNumber, addUnread: addUnread} }
}

export const addMessage = (data) => {
    return async (dispatch, getState) => {
        try {
            const { message, from, to, recipientImage } = data
            const statePhone = await getState().auth.phone
            const chats = getState().chatAdj.chats

            const msgId = statePhone === from ? message.senderMessageId : uuid.v4()
            const msgStatus = statePhone === from ? 'PENDING' : false
            const newMessage = { ...message, id: msgId, status: msgStatus, from: from }

            const recipientNumber = statePhone === from ? to : from

            const chatExists = chats[recipientNumber]
            // console.log(chatExists)
            if (chatExists) {
                const addUnread = statePhone === from ? false : true
                await dispatch(editChat(recipientNumber, newMessage, addUnread))
            } else {
                const contact = await Contact.findOne('phoneNumber', recipientNumber)

                const newChat = {
                    id: uuid.v4(),
                    creator: getState().auth.phone,
                    recipientNumber: recipientNumber,
                    recipientName: contact ? contact.name : recipientNumber,
                    recipientImage: contact ? contact.imageUrl : recipientImage,
                    lastMessageText: newMessage.message,
                    lastMessageId: newMessage.id,
                    lastMessageDate: newMessage.date,
                    contactId: contact ? contact.id : null,
                    unreadMessageCount: getState().auth.phone === from ? 0 : 1
                }
                await dispatch(addChat(newChat, newMessage))
            }
            // dispatch({ type: ADD_TO_ALL_MESSAGE, payload: newMessage, phoneNumber: recipientNumber })
        } catch (err) {
            throw err
        }
    }
}