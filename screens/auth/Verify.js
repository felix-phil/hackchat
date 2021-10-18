import React, { useState, useEffect } from "react";
import { View, StyleSheet, SafeAreaView, ScrollView, KeyboardAvoidingView } from "react-native";
import { Subheading, useTheme, Title, Text } from "react-native-paper";
import { CodeField, Cursor, useBlurOnFulfill, useClearByFocusCell } from 'react-native-confirmation-code-field';
import { Button, List, Divider } from "react-native-paper";
import * as authActions from "../../store/actions/auth"
import { useDispatch, useSelector } from "react-redux"
import * as messageActions from '../../store/actions/messages';
import DefaultAppbar from "../../components/main/headers/DefaultHeader";

const CELL_COUNT = 6;

const RESEND_OTP_TIME_LIMIT = 90;

const Verify = ({ navigation, route }) => {
	const theme = useTheme()
	const dispatch = useDispatch()
	const phone = useSelector(state => state.auth.phone)
	const  {formattedPhoneNumber}  = route.params || "+2348171551089"
	// console.log(route)
	const [value, setValue] = useState('');
	let resendOtpTimerInterval;
	const [resendButtonDisabledTime, setResendButtonDisabledTime] = useState(RESEND_OTP_TIME_LIMIT,);

	useEffect(() => {
		navigation.setOptions({
			headerTitle: "Verify " + formattedPhoneNumber
		})
	}, [navigation])
	//Stop backbutton
	useEffect(() => {
		navigation.addListener('beforeRemove', (e) => {
			e.preventDefault()
		})
		return () => {
			navigation.removeListener('beforeRemove')
		}
	}, [navigation])
	//to start resent otp option 
	const startResendOtpTimer = () => {
		if (resendOtpTimerInterval) {
			clearInterval(resendOtpTimerInterval);
		}
		resendOtpTimerInterval = setInterval(() => {
			if (resendButtonDisabledTime <= 0) {
				clearInterval(resendOtpTimerInterval);
			} else {
				setResendButtonDisabledTime(resendButtonDisabledTime - 1);
			}
		}, 1000);
	};
	//on click of resend button 
	const onResendOtpButtonPress = () => {
		//clear input field
		setValue('')
		setResendButtonDisabledTime(RESEND_OTP_TIME_LIMIT);
		startResendOtpTimer();
		// resend OTP Api call
		// todo 
		console.log('todo: Resend OTP');
	};
	//declarations for input field 
	const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
	const [props, getCellOnLayoutHandler] = useClearByFocusCell({ value, setValue, });

	//start timer on screen on launch 
	useEffect(() => {
		startResendOtpTimer();
		return () => {
			if (resendOtpTimerInterval) {
				clearInterval(resendOtpTimerInterval);
			}
		};
	}, [resendButtonDisabledTime]);
	const onSubmitHandler = async () => {
		if (value.length < 6) {
			return
		}
		try {
			await dispatch(authActions.verifyOtp(value, phone))
			await dispatch(authActions.syncContacts())
		} catch (error) {
			console.log(error)
			dispatch(messageActions.setMessage(error.message, "error"))
		}
	}
	const onChangeTextHandler = (inputValue) => {
		if (!/^\d*$/.test((inputValue))) {
			return
		}
		setValue(inputValue)
	}
	const reAuthenticate = async (channel) => {
		try {
			await dispatch(authActions.authenticate(phone, channel))
		} catch (error) {
			console.log(error)
			dispatch(messageActions.setMessage(error.message, "error"))
		}
		onResendOtpButtonPress()
	}
	return (
		<SafeAreaView style={styles.root}>
			<ScrollView>
				<KeyboardAvoidingView behavior={Platform.OS === 'ios' ? "height" : "padding"} style={{ flex: 1 }} >
					<View style={styles.sub}>
						<Subheading style={{ textAlign: "center"}}>Waiting to verify SMS sent to</Subheading>
						<Title> {formattedPhoneNumber} </Title>
					</View>
					<View>
						<CodeField ref={ref}
							{...props} value={value}
							onChangeText={onChangeTextHandler}
							cellCount={CELL_COUNT}
							rootStyle={styles.codeFieldRoot}
							keyboardType="number-pad"
							onEndEditing={onSubmitHandler}
							textContentType="oneTimeCode"
							renderCell={({ index, symbol, isFocused }) => (
								<View onLayout={getCellOnLayoutHandler(index)}
									key={index}
									style={[styles.cellRoot, isFocused && styles.focusCell]}>
									<Text style={{...styles.cellText, color: theme.colors.text}}>
										{symbol || (isFocused ? <Cursor /> : null)}
									</Text>
								</View>)}
						/>
						<Subheading style={{ alignSelf: "center" }}>Enter {CELL_COUNT}-digit code</Subheading>

						{resendButtonDisabledTime > 0 ?
							<List.Item left={props => <List.Icon {...props} icon="message-bulleted" />} disabled={true} title="Resend SMS" right={props => <Text>{resendButtonDisabledTime}s</Text>} />
							:
							<List.Item left={props => <List.Icon {...props} icon="message-bulleted" />} onPress={reAuthenticate.bind(this, "sms")} title="Resend SMS" right={props => <Text>{resendButtonDisabledTime}</Text>} />
						}
						<Divider />
						<List.Item left={props => <List.Icon {...props} icon="phone" />} onPress={reAuthenticate.bind(this, "call")} title="Call me" />

						<View style={styles.button}>
							<Button mode="contained" disabled={value.length < 6 ? true : false} onPress={() => onSubmitHandler()}>Submit</Button>
						</View>
					</View>
				</KeyboardAvoidingView>
			</ScrollView>
		</SafeAreaView>
	)
}
export const screenOptions = {
	header: (props) => <DefaultAppbar {...props} alignText="center" />
}
const styles = StyleSheet.create({
	center: {
		justifyContent: "center",
		alignItems: "center",
		marginTop: "10%"
	},
	sub: {
		flex: 1,
		textAlign: "center",
		justifyContent: "center",
		alignItems: "center",
		marginTop: "5%",
		flexDirection: "column"
	},
	gridPad: { padding: 30 },
	textMargin: { margin: 3 },
	inputRadius: { textAlign: "center" },
	root: {
		flex: 1,
		padding: 20,
		alignContent: 'center',
		justifyContent: 'center'
	},
	title: {
		textAlign: 'left',
		fontSize: 20,
		marginStart: 20,
		fontWeight: 'bold'
	},
	subTitle: {
		textAlign: 'left',
		fontSize: 16,
		marginStart: 20,
		marginTop: 10
	},
	codeFieldRoot: {
		marginTop: 40,
		width: '90%',
		marginLeft: 20,
		marginRight: 20,
	},
	cellRoot: {
		width: 40, height: 40,
		justifyContent: 'center',
		alignItems: 'center', borderBottomColor: '#ccc',
		borderBottomWidth: 1,
	},
	cellText: {
		fontSize: 28,
		textAlign: 'center',
	},
	focusCell: {
		borderBottomColor: '#007AFF',
		borderBottomWidth: 2,
	},
	button: {
		marginTop: 20,
		justifyContent: "center",
		alignItems: "center"
	},
	resendCode: {
		color: "blue",
		marginStart: 20,
		marginTop: 40,
	},
	resendCodeText: {
		marginStart: 20,
		marginTop: 40,
	},
	resendCodeContainer: {
		flexDirection: 'row',
		alignItems: 'center'
	}
})
export default Verify
