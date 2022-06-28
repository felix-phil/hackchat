import Contact from '../../models/contacts';
import uuid from 'react-native-uuid';

import {
  ADD_TO_CHATS,
  EDIT_CHAT,
  FILTER_CHATS,
  MARK_ALL_READ,
  SET_CHATS,
} from '../actions/chat';

const initialState = {
  chats: [],
  filteredChats: [],
};

const reducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case SET_CHATS:
      return {
        ...state,
        chats: payload,
        filteredChats: payload,
      };
    case FILTER_CHATS:
      const regex = new RegExp(payload, 'i');
      const availableChats = [...state.chats];
      let newFilteredChat;
      const filtered =
        availableChats.filter(
          (chat) =>
            regex.test(chat.recipientNumber) ||
            chat.recipientName.toLowerCase().startsWith(payload.toLowerCase())
        ) || chat.lastMessageText.toLowercase().include(payload.toLowerCase());
      if (payload.trim() !== '') {
        newFilteredChat = filtered;
      } else {
        newFilteredChat = availableChats;
      }
      return {
        ...state,
        filteredChats: newFilteredChat,
      };
    case ADD_TO_CHATS:
      return {
        ...state,
        chats: [...state.chats, payload],
        filteredChats: [...state.filteredChats, payload],
      };
    case EDIT_CHAT:
      const allChats = [...state.chats];

      const chatIndex = allChats.findIndex(
        (ch) => ch.recipientNumber === action.recipientNumber
      );
      // console.log(payload)
      let updatedChat;
      if (chatIndex >= 0) {
        // let newValue;
        const newValue = allChats[chatIndex];
        newValue.lastMessageId = payload.id;
        newValue.lastMessageText = payload.message;
        newValue.lastMessageDate = payload.date;
        newValue.unreadMessageCount = action.addUnread
          ? +newValue.unreadMessageCount + 1
          : newValue.unreadMessageCount;
        allChats[chatIndex] = newValue;
        updatedChat = allChats;
      } else {
        const contact = action.contact;
        const newChat = {
          id: uuid.v4(),
          // creator: getState().auth.phone,
          recipientNumber: action.recipientNumber,
          recipientName: contact ? contact.name : action.recipientNumber,
          recipientImage: contact ? contact.imageUrl : action.recipientImage,
          lastMessageText: payload.message,
          lastMessageId: payload.id,
          lastMessageDate: payload.date,
          contactId: contact ? contact.id : null,
          unreadMessageCount: action.addUnread ? 1 : 0,
        };
        updatedChat = [...allChats, newChat];
      }
      return {
        ...state,
        chats: updatedChat,
        filteredChats: updatedChat,
      };
    case MARK_ALL_READ:
      const allTheChats = [...state.chats];
      const theChatIndex = allTheChats.findIndex(
        (ch) => ch.recipientNumber === payload
      );
      let theChat;
      if (theChatIndex >= 0) {
        theChat = allTheChats[theChatIndex];
        theChat.unreadMessageCount = 0;
        allTheChats[theChatIndex] = theChat;
      }
      return {
        ...state,
        chats: allTheChats,
        filteredChats: allTheChats,
      };
    default:
      return state;
  }
};
export default reducer;
