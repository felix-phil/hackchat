import uuid from 'react-native-uuid';
import Message, { statusValues } from '../../models/message';
import Chat from '../../models/chat';
import * as socket from '../../helpers/socket';
import Contact from '../../models/contacts';
// import { getProfile } from "../../constants/requests";
import * as chatActions from '../actions/chat';
export const SET_CURRENT_VIEW_MESSAGE = 'SET_CURRENT_VIEW_MESSAGE';
export const ADD_MESSAGE = 'ADD_MESSAGE';
export const ADD_TO_ALL_MESSAGE = 'ADD_TO_ALL_MESSAGE';
export const HANDLE_REPORT = 'HANDLE_REPORT';
export const WEBSOCKET_TYPE = 'CHAT';

export const WEBSOCKET_ACTIONS = {
  CREATE_NEW_CHAT: 'CREATE_NEW_CHAT',
  SEND: 'SEND',
  MESSAGE_SENT: 'MESSAGE_SENT',
  JOIN: 'JOIN',
  CREATE_AND_JOIN: 'CREATE_AND_JOIN',
};

export const setCurrentMessage = (roomId) => {
  return async (dispatch) => {
    // Local Database Fetch
    const messsages = [];
    dispatch({ type: SET_CURRENT_VIEW_MESSAGE, payload: messsages });
  };
};
export const addMessageToDB = async (chatId, message, status) => {
  try {
    const newMessage = new Message({
      chatId: chatId,
      messageText: message.messageText,
      createdByNumber: message.createdByNumber,
      parent: message.parent,
      date: message.createdAt.toString(),
      hasMedia: message.hasMedia ? 1 : 0,
      mediaType: message.mediaType,
      mediaUrl: message.mediaUrl,
      mediaThumbnailUrl: message.mediaThumbnailUrl,
      status: status,
    });
    await newMessage.save();
  } catch (error) {
    throw error;
  }
};

export const addMessage = (data) => {
  return async (dispatch, getState) => {
    try {
      const { message, from, to, recipientImage } = data;
      const statePhone = await getState().auth.phone;
      const chats = getState().chat.chats;

      const msgId = statePhone === from ? message.senderMessageId : uuid.v4();
      const msgStatus = statePhone === from ? 'PENDING' : false;
      const newMessage = {
        ...message,
        id: msgId,
        status: msgStatus,
        from: from,
      };

      const recipientNumber = statePhone === from ? to : from;
      const addUnread = statePhone === from ? false : true;

      // const chatExists = chats.find(ch => ch.recipientNumber === recipientNumber)
      // console.log(chatExists)
      // if (chatExists) {
      //     await dispatch(chatActions.editChat(chatExists.id, newMessage, addUnread))
      // } else {
      const contact = await Contact.findOne('phoneNumber', recipientNumber);

      //   const newChat = {
      //     id: uuid.v4(),
      //     creator: getState().auth.phone,
      //     recipientNumber: recipientNumber,
      //     recipientName: contact ? contact.name : recipientNumber,
      //     recipientImage: contact ? contact.imageUrl : recipientImage,
      //     lastMessageText: newMessage.message,
      //     lastMessageId: newMessage.id,
      //     lastMessageDate: newMessage.date,
      //     contactId: contact ? contact.id : null,
      //     unreadMessageCount: getState().auth.phone === from ? 0 : 1,
      //   };
      await dispatch(
        chatActions.editChat(
          recipientNumber,
          recipientImage,
          contact,
          newMessage,
          addUnread
        )
      );
      //   await dispatch(chatActions.addToChat(newChat));
      // }
      dispatch({
        type: ADD_TO_ALL_MESSAGE,
        payload: newMessage,
        phoneNumber: recipientNumber,
      });
    } catch (err) {
      throw err;
    }
  };
};
export const sendMessage = (message, to, recipientImage) => {
  return async (dispatch, getState) => {
    try {
      // console.log(message, to)
      const newMessage = { ...message, senderMessageId: uuid.v4() };
      await dispatch(
        addMessage({
          from: getState().auth.phone,
          to: to,
          message: newMessage,
          recipientImage,
        })
      );
      const Socket = socket.getScoket();
      Socket.emit(WEBSOCKET_TYPE, {
        action: WEBSOCKET_ACTIONS.SEND,
        to: to,
        message: newMessage,
      });
    } catch (err) {
      console.log(err, 'sendMessage');
    }
  };
};

export const handleMessageSent = (data, STATUS) => {
  const { message, to } = data;
  return { type: HANDLE_REPORT, payload: { message, to, STATUS } };
};
// export const handleMassAction = (allData) => {
//     return async dispatch => {
//         for (const massAction of allData["data"]) {
//             const { data, actionType } = massAction
//             if (actionType === 'CHAT') {
//                 const {action} = data
//                 switch(action){
//                     case 'NEW_MESSAGE':
//                         dispatch(addMessage(data))
//                         break;
//                     case 'MESSAGE_SENT':
//                         dispatch(handleMessageSent(data, 'SENT'))
//                         break;
//                 }

//             }
//         }
//     }
// }
