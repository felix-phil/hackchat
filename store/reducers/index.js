import { combineReducers  } from 'redux';
import authReducer from './auth';
import loadReducer from './loading';
import messagesReducer from './messages';
import contactReducer from './contacts';
import chatReducer from './chat'

const rootReducer = combineReducers({
	auth: authReducer,
	load: loadReducer,
	messages: messagesReducer,
	contact: contactReducer,
	chat: chatReducer
})
export default rootReducer
