export const AUTHENTICATE_SUCCESS = "AUTHENTICATE_SUCCESS"
export const AUTHENTICATE = "AUTHENTICATE"
export const AUTHENTICATE_FAIL = "AUTHENTICATE_FAIL"
export const SET_DEVICE_ID = "SET_DEVICE_ID"
export const SET_COMPLETE_SETUP = "SET_COMPLETE_SETUP"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { refreshTokenUrl, requestLoginUrl, syncContactUrl, verifyLoginUrl } from "../../constants/endpoints"
import * as loadActions from "./loading";
import Contact from "../../models/contacts";
import { getAllContacts } from "../../helpers/contacts"

export const setDeviceId = (deviceId) => {
	return async dispatch => {
		try {
			await AsyncStorage.setItem("deviceId", deviceId)
			// console.log(deviceId)
			await dispatch({ type: SET_DEVICE_ID, payload: deviceId })
		} catch (error) {
			console.log(error)
		}
	}
}


export const authenticate = (phone, channel) => {
	return async (dispatch, getState) => {
		try {
			// console.log("loading...")
			const deviceId = getState().auth.deviceId
			dispatch(loadActions.startLoading("Sending Verification SMS to " + phone))
			console.log(`requesting from ${requestLoginUrl}...`)

			const res = await fetch(requestLoginUrl, {
				method: "POST",
				body: JSON.stringify({ phone: phone, deviceId: deviceId, channel: channel }),
				headers: {
					"Content-Type": "application/json",
					"Accept": "application/json"
				}
			})
			if (!res.ok) {
				dispatch(loadActions.stopLoading())
				let errorMessage = "Internal server error!"
				const errorData = await res.json()
				if (errorData.data && errorData.data.length !== 0) {
					errorMessage = errorData.data[0].msg
				} else {
					errorMessage = errorData.message
				}
				throw new Error(errorMessage)
			}
			const resData = await res.json()
			console.log(resData)
			dispatch({ type: AUTHENTICATE, payload: resData })
			dispatch(loadActions.stopLoading())
		} catch (error) {
			throw error
		}
	}
}
export const verifyOtp = (otp, phone) => {
	return async (dispatch, getState) => {
		const controller = new AbortController()

		const timeoutId = setTimeout(() => controller.abort(), 30000)
		try {
			dispatch(loadActions.startLoading("Verifying OTP"))
			console.log(`requesting from ${verifyLoginUrl}...`)
			const res = await fetch(verifyLoginUrl, {
				method: "POST",
				body: JSON.stringify({ phone: phone, deviceId: getState().auth.deviceId, code: otp }),
				headers: {
					"Content-Type": "application/json",
					"Accept": "application/json"
				},
				signal: controller.signal
			})
			if (!res.ok) {
				// clearTimeout(timeoutId)
				dispatch(loadActions.stopLoading())
				let errorMessage = "Internal server error!"
				const errorData = await res.json()
				if (errorData.data && errorData.data.length !== 0) {
					errorMessage = errorData.data[0].msg
				} else {
					errorMessage = errorData.message
				}
				throw new Error(errorMessage)
			}
			const resData = await res.json()
			console.log(resData)

			const refreshToken = resData.refresh
			const accessToken = resData.token
			const user = resData.user
			const expiresIn = new Date(Date.now() + 6 * (60 * 60 * 1000)).toISOString()

			await storeData("authData", { refreshToken, accessToken, user, expiresIn })
			
			// dispatch({ type: AUTHENTICATE_SUCCESS, payload: { refreshToken, accessToken, user, expiresIn } })
			dispatch(loadActions.stopLoading())
			await dispatch(authenticateUser({ refreshToken, accessToken, user, expiresIn }))
			await dispatch(syncContacts())
			dispatch(setupComplete())
			// clearTimeout(timeoutId)
		} catch (error) {
			if (error.message === "Aborted") {
				error.message = "Request Timeout"
			}
			dispatch(loadActions.stopLoading())
			throw error

		}
	}
}
export const authFail = () => {
	return dispatch => {
		dispatch({ type: AUTHENTICATE_FAIL })
	}
}
export const authenticateUser = (userValues) => {
	return dispatch => {
		const { refreshToken, accessToken, user, expiresIn } = userValues
		try {
			dispatch({ type: AUTHENTICATE_SUCCESS, payload: { refreshToken, accessToken, user, expiresIn } })
		} catch (error) {
			throw error
		}
	}
}

export const refreshToken = () => {
	return async (dispatch, getState) => {
		try {
			// console.log("loading...")
			const deviceId = await AsyncStorage.getItem("deviceId")
			const authData = await getData("authData")
			dispatch(loadActions.startLoading("Loading... "))
			console.log(deviceId)
			console.log(`requesting from ${refreshTokenUrl}...`)
			const res = await fetch(refreshTokenUrl, {
				method: "POST",
				body: JSON.stringify({ deviceId: deviceId, refreshToken: authData.refreshToken }),
				headers: {
					"Content-Type": "application/json",
					"Accept": "application/json"
				}
			})
			if (!res.ok) {
				dispatch(loadActions.stopLoading())
				let errorMessage = "Internal server error!"
				const errorData = await res.json()
				if (errorData.data && errorData.data.length !== 0) {
					errorMessage = errorData.data[0].msg
				} else {
					errorMessage = errorData.message
				}
				throw new Error(errorMessage)
			}
			const resData = await res.json()
			// console.log(resData)
			const newRefreshToken = resData.refresh
			const accessToken = resData.token
			const { user } = await getData("authData")
			const expiresIn = new Date(Date.now() + 6 * (60 * 60 * 1000)).toISOString()
			dispatch(authenticateUser({ refreshToken: newRefreshToken, accessToken, user, expiresIn }))
			dispatch(setupComplete())
			await storeData("authData", { refreshToken: newRefreshToken, accessToken, user, expiresIn })
			dispatch(loadActions.stopLoading())
		} catch (error) {
			dispatch(loadActions.stopLoading())
			throw error
		}
	}
}

export const syncContacts = () => {
	return async (dispatch, getState) => {
		const allContacts =  await getAllContacts()
		const allFormattedContacts = allContacts.filter(con => con.phoneNumber.length > 9)
		// console.log(allFormattedContacts)
		try {
			dispatch(loadActions.startLoading("Syncing Contacts..."))
			console.log(`requesting from ${syncContactUrl}...`)
			const res = await fetch(syncContactUrl, {
				method: "POST",
				body: JSON.stringify({ contacts: allFormattedContacts }),
				headers: {
					"Content-Type": "application/json",
					"Accept": "application/json",
					"Authorization": `Bearer ${getState().auth.token}`,
					"device": `Bearer ${getState().auth.deviceId}`
				}
			})
			if (!res.ok) {
				dispatch(loadActions.stopLoading())
				let errorMessage = "Internal server error!"
				const errorData = await res.json()
				if (errorData.data && errorData.data.length !== 0) {
					errorMessage = errorData.data[0].msg
				} else {
					errorMessage = errorData.message
				}
				throw new Error(errorMessage)
			}
			const resData = await res.json()
			// console.log(resData)
			const contacts = resData.contacts
			const contactsInLocalDB = await Contact.findAll()
			if(contacts.length > 0){
				for(const contact of contacts){
					const contactExistsInLocalDB = contactsInLocalDB.find(con => con.contactSystemId === contact.contactSystemId)
					// const contactExistsInLocalDB = await Contact.findOne("contactSystemId", "==", contact.contactSystemId.toString())
					// console.log(contactExistsInLocalDB.phoneNumber)
					if(!contactExistsInLocalDB){
						const newContact = new Contact({
							firstName: contact.firstName || "First Name",
							lastName: contact.lastName || "Last Name",
							contactSystemId: contact.contactSystemId,
							phoneNumber: contact.phone,
							name: contact.aliasName || contact.phone,
							imageUrl: contact.image,
							status: contact.status
						})
						const saved =await newContact.save()
						// console.log(saved)
					}else{
						const updateContact = new Contact({
							firstName: contact.firstName,
							lastName: contact.lastName,
							contactSystemId: contact.contactSystemId,
							phoneNumber: contact.phone,
							name: contact.aliasName,
							imageUrl: contact.image,
							status: contact.status,
							id: contactExistsInLocalDB.id
						})
						await updateContact.save()
					}
				}
			}
			// console.log(resData)
			dispatch(loadActions.stopLoading())
		} catch (error) {
			dispatch(loadActions.stopLoading())
			throw error
		}
	}
}
export const setupComplete = () => {
	return { type: SET_COMPLETE_SETUP }
}
export const storeData = async (key, value) => {
	// return async dispatch => {
	try {
		const jsonValue = JSON.stringify(value)
		await AsyncStorage.setItem(key, jsonValue)
	} catch (e) {
		throw e
	}
	// }
}

export const getData = async (key) => {
	try {
		const jsonValue = await AsyncStorage.getItem(key)
		return jsonValue !== null ? JSON.parse(jsonValue) : null;
	} catch (e) {
		throw e
	}
}
