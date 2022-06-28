import Chat from '../../models/chat';
import * as socket from '../../helpers/socket';

export const SET_CHATS = 'SET_CHATS';
export const FILTER_CHATS = 'FILTER_CHATS';
export const ADD_TO_CHATS = 'ADD_TO_CHATS';
export const EDIT_CHAT = 'EDIT_CHAT';
export const MARK_ALL_READ = 'MARK_ALL_READ';

export const setChats = () => {
  return async (dispatch) => {
    try {
      const allChats = await Chat.findAll();
      // console.log(allChats)
      dispatch({ type: SET_CHATS, payload: allChats.rows._array });
    } catch (error) {
      throw error;
    }
  };
};
export const filterChats = (filter) => {
  return { type: FILTER_CHATS, payload: filter };
};
export const addToChat = (chatParams) => {
  return { type: ADD_TO_CHATS, payload: chatParams };
};
export const editChat = (
  recipientNumber,
  recipientImage,
  contact,
  newMessage,
  addUnread
) => {
  return {
    type: EDIT_CHAT,
    payload: newMessage,
    recipientNumber: recipientNumber,
    recipientImage: recipientImage,
    contact: contact,
    addUnread: addUnread,
  };
};
export const markAllRead = (phone) => {
  return { type: MARK_ALL_READ, payload: phone };
};
export const fetchOfflineActions = () => {
  return (dispatch) => {
    try {
      const Socket = socket.getScoket();
      Socket.emit('NOT_OFFLINE_ACTIONS', {});
    } catch (error) {
      conosle.log(error);
    }
  };
};
