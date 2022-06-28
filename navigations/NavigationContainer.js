import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import AuthNavigation from "./AuthNavigation";
import MainNavigation from "./MainNavigation";
import * as authActions from "../store/actions/auth"
import Activity from "../components/utils/Activity";
import * as loadAction from "../store/actions/loading";
import * as messageAction from "../store/actions/messages";
import Alert from "../components/utils/Alert";
import { refreshTokenUrl } from "../constants/endpoints";
import PortalImage from "../components/images/PortalImage";
import { ToastAndroid, View } from "react-native";
import { useNetInfo } from "@react-native-community/netinfo"
import { fetchDeviceId } from "../helpers/notifications";
import * as SplashScreen from "expo-splash-screen"
import * as socket from "../helpers/socket"

const NavContainer = (props) => {
	const [appIsReady, setAppIsReady] = useState(false)
	const dispatch = useDispatch()
	const isAuth = useSelector(state => state.auth.isAuthenticated)
	const token = useSelector(state => state.auth.token)
	const setUpComplete = useSelector(state => state.auth.setUpComplete)
	const netInfo = useNetInfo()
	const isLoading = useSelector(state => state.load.loading)
	const isLongLoading = useSelector(state => state.load.longLoading)
	const loadText = useSelector(state => state.load.loadText)

	const { show, message, type } = useSelector(state => state.messages)

	const fetchDevId = useCallback(
		async () => {
			try {
				// console.log(netInfo)
				const token = await fetchDeviceId()
				// console.log(token)
				dispatch(authActions.setDeviceId(token))
			} catch (error) {
				// if (!netInfo.isConnected) {
				// 	error.message = "Internet connection not available"
				// }

				console.log(error)
				ToastAndroid.show(error.message, ToastAndroid.SHORT)
			}
		},
		[dispatch],
	)
	const tryAuthenticate = useCallback(
		async () => {
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
		},
		[dispatch],
	)

	const prepare = useCallback(
		async () => {
			try {
				await SplashScreen.preventAutoHideAsync()
				await fetchDevId()
				await tryAuthenticate()
				await new Promise(resolve => setTimeout(resolve, 500));
			} catch (e) {
				console.log(e)
			} finally {
				setAppIsReady(true)
			}
		},
		[fetchDevId, tryAuthenticate],
	)
	const initializeSocket = useCallback(
		() => {
			let Socket;
			if (isAuth) {
				Socket = socket.init(token)
				Socket.on('connect', () => {
					console.log('Socket connected')
					Socket.emit('NOT_OFFLINE_ACTIONS', {})
				})
				Socket.on('disconnect', reason => {
					console.log('Socket disconnected')
				})
			}
		},
		[isAuth, token],
	)
	useEffect(() => {
		initializeSocket()
		return () => {
			// if(Socket){
			// 	Socket.disconnect()
			// }
		}
	}, [initializeSocket])

	useEffect(() => {
		prepare()
	}, [prepare])

	const onLayoutRootView = useCallback(async () => {
		if (appIsReady) {
			await SplashScreen.hideAsync();
		}
	}, [appIsReady]);

	if (!appIsReady) {
		return null
	}
	return (
		<React.Fragment>

			<View
				style={{ flex: 1 }}
				onLayout={onLayoutRootView}
			>
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

			</View>
		</React.Fragment>

	)
}

export default NavContainer

