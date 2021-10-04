import { HIDE_PORTAL_IMAGE, SET_CONTACTS, SHOW_PORTAL_IMAGE } from "../actions/contacts"

const initialState = {
	contacts: [],

	showPortalImage: false,
	routeName: "Contacts",
	profileName: "",
	profileImageUrl: "",
	functionToHandleChat: () => {
		console.log("Handle Chat")
	},
	functionToHandleCall: () => {
		console.log("Handle Call")
	},
	functionToHandleVideo: () => {
		console.log("Handle Video")
	},
	functionToHandleProfileInfo: () => {
		console.log("Handle Info")
	},

}

const reducer = (state=initialState, action ) => {
	const {type, payload} = action

	switch(type){
		case SET_CONTACTS:
            return {
                ...state,
                contacts: payload
            }
		case SHOW_PORTAL_IMAGE:
			return {
				...state,
				showPortalImage: true,
				routeName: payload.routeName,
				profileName: payload.profileName,
				profileImageUrl: payload.profileImageUrl,
				functionToHandleChat: payload.functionToHandleChat || state.functionToHandleChat,
				functionToHandleCall: payload.functionToHandleCall || state.functionToHandleCall,
				functionToHandleVideo: payload.functionToHandleVideo || state.functionToHandleVideo,
				functionToHandleProfileInfo: payload.functionToHandleProfileInfo || state.functionToHandleProfileInfo
			}
		case HIDE_PORTAL_IMAGE:
			return {
				...state,
				showPortalImage: false,
				routeName: "Contacts"
			}
		default: return state
	}

}

export default reducer
