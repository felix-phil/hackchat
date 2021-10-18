import { FILTER_CONTACTS, HIDE_PORTAL_IMAGE, SET_CONTACTS, SHOW_PORTAL_IMAGE } from "../actions/contacts"

const initialState = {
	contacts: [],
	filteredContacts: [],
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
                contacts: payload,
				filteredContacts: payload
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
		case FILTER_CONTACTS:
			const regex = RegExp(payload, "i")
			const availableContacts = [...state.contacts]
			let newFilteredContact
			const filtered = availableContacts.filter(con => con.name.toLowerCase().startsWith(payload.toLowerCase()) || regex.test(con.phoneNumber))
			
			if (payload.trim() !== "") {
				newFilteredContact = filtered
			} else {
				newFilteredContact = availableContacts
			}
			return {
				...state,
				filteredContacts: newFilteredContact
			}
		default: return state
	}

}

export default reducer
