import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { NavigationContainer } from '@react-navigation/native';
import AuthNavigation from "./AuthNavigation";
import MainNavigation from "./MainNavigation";
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";
import * as authActions from "../store/actions/auth"
import AsyncStorage from "@react-native-async-storage/async-storage";
import Activity from "../components/utils/Activity";
import * as loadAction from "../store/actions/loading";
import * as messageAction from "../store/actions/messages";
import Alert from "../components/utils/Alert";
import { refreshTokenUrl } from "../constants/endpoints";
import PortalImage from "../components/images/PortalImage";
// import LongActivity from "../components/utils/LongActivity";

const NavContainer = (props) => {
	const dispatch = useDispatch()
	const isAuth = useSelector(state => state.auth.isAuthenticated)
	const setUpComplete = useSelector(state => state.auth.setUpComplete)

	const isLoading = useSelector(state => state.load.loading)
	const isLongLoading = useSelector(state => state.load.longLoading)
	const loadText = useSelector(state => state.load.loadText)

	const { show, message, type } = useSelector(state => state.messages)
	const fetchDeviceId = async () => {
		const deviceId = await AsyncStorage.getItem("deviceId")
		if (deviceId) {
			// console.log(deviceId)
			dispatch(authActions.setDeviceId(deviceId))
		} else {
			try {
				if (Constants.isDevice) {
					const { status: existingStatus } = await Notifications.getPermissionsAsync();
					let finalStatus = existingStatus;
					if (existingStatus !== "granted") {
						const { status } = await Notifications.requestPermissionsAsync();
						finalStatus = status
					}
					if (finalStatus !== "granted") {
						alert('Failed ti get push token notifications')
						return
					}
					const token = await Notifications.getExpoPushTokenAsync()
					dispatch(authActions.setDeviceId(token.data))
				}
			} catch (error) {
				console.log(error.message)
			}
		}
	}
	const tryAuthenticate = async () => {
		try {
			const authData = await authActions.getData("authData")
			if (!authData) {
				dispatch(authActions.authFail())
				return
			}
			const { refreshToken, accessToken, user, expiresIn } = authData
			const expiryTime = new Date(expiresIn)
			// console.log(Date.now() >= expiryTime.getTime())
			if (Date.now() >= expiryTime.getTime() && accessToken && user && refreshTokenUrl) {
				await dispatch(authActions.refreshToken())
				return
			}
			if (Date.now() >= expiryTime.getTime() || !accessToken || !user || !refreshToken) {
				dispatch(authActions.authFail())
				return
			}
			dispatch(authActions.authenticateUser({ refreshToken, accessToken, user, expiresIn }))
			dispatch(authActions.setupComplete())
		} catch (error) {
			dispatch(messageAction.setMessage(error.message, "error"))
			// console.log(error)
		}
	}
	useEffect(() => {
		fetchDeviceId()
	}, [dispatch])

	useEffect(() => {
		tryAuthenticate()
	}, [dispatch])

	return (
			<React.Fragment>
				<Activity
					visible={isLoading}
					loadingText={loadText}
					hideDialog={() => {
						dispatch(loadAction.stopLoading())
					}}
				/>
				<PortalImage />
				{isAuth ? <MainNavigation /> : <AuthNavigation />}
				<Alert visible={show} type={type} message={message} onDismiss={() => dispatch(messageAction.clearMessage())} />
			</React.Fragment>

	)
}

export default NavContainer

