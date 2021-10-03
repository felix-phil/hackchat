const initialState = {
	isAuthenticated: false,
	token: null,
	refresh: null,
	_id: null,
	phone: null,
	status: "",
	deviceId: null,
	firstName: null,
	tokenExpiryTime: "",
	lastName: null,
	setUpComplete: false
}
import { SET_DEVICE_ID, AUTHENTICATE_SUCCESS, AUTHENTICATE, AUTHENTICATE_FAIL, SET_COMPLETE_SETUP} from "../actions/auth"

const reducer = (state=initialState, action ) => {
	const {type, payload} = action

	switch(type){
		case SET_DEVICE_ID:
			return {
				...state,
				deviceId: payload
			}
		case AUTHENTICATE:
			return {
				...state,
				phone: payload.phone
			}
		case AUTHENTICATE_SUCCESS:
			return {
				...state,
				token: payload.accessToken,
				refresh: payload.refresh,
				_id: payload.user._id,
				phone: payload.user.phone,
				status: payload.user.status,
				firstName: payload.user.firstName || "",
				lastName: payload.user.lastName || "",
				isAuthenticated: true
			}
		case AUTHENTICATE_FAIL:
			return {
				...state,
				token: initialState.token,
				refresh: initialState.refresh,
				_id: initialState._id,
				status: initialState.status,
				firstName: initialState.firstName,
				lastName: initialState.lastName,
				isAuthenticated: false
			}
		case SET_COMPLETE_SETUP:
			return {
				...state,
				setUpComplete: true
			}
		default: return state
	}

}

export default reducer
