import { combineReducers } from 'redux';
import authReducer from './auth';
import loadReducer from './loading';
import messagesReducer from './messages';
import contactReducer from './contacts';
import chatReducer from './chat';
import chatMessagesReducer from './chatMessages'
import chatAdjustReducer from './chatAdjust';

const rootReducer = combineReducers({
	auth: authReducer,
	load: loadReducer,
	messages: messagesReducer,
	contact: contactReducer,
	chat: chatReducer,
	chatMessages: chatMessagesReducer,
	// chatAdj: chatAdjustReducer
})
export default rootReducer
