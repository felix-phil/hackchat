import React, { useEffect, useState, useRef } from "react";
import { View, Text, StyleSheet, ScrollView, KeyboardAvoidingView, Platform, ToastAndroid } from "react-native";
import { Subheading, List, useTheme } from 'react-native-paper'
import { useDispatch, useSelector } from "react-redux"
import * as authActions from "../../store/actions/auth"
import { TextInput, Button, HelperText } from 'react-native-paper';
import { Formik } from "formik"
import countries from "../../data/countries";
import ConfirmDialog from "../../components/utils/ConfirmDialog";
import * as messageActions from '../../store/actions/messages';
import * as loadingActions from '../../store/actions/loading';
import { lookUpPhone } from "../../constants/requests";
import DefaultAppbar from "../../components/main/headers/DefaultHeader";
import Link from "../../components/web/Link";

const Login = (props) => {
	const { navigation } = props
	const isAuth = useSelector(state => state.auth.isAuthenticated);
	const dispatch = useDispatch();
	const country = props.route.params ? props.route.params.country : { dialCode: "+234", name: "Nigeria" }
	const phone = props.route.params ? props.route.params.phone : ""
	const [countryList, setCountryList] = useState(countries)
	const [visible, setVisible] = useState(false)
	const [formFinalValues, setFormFinalValues] = useState({})
	const theme = useTheme()
	const ref = useRef()

	const initialValues = {
		phone: phone,
		countryCode: country.dialCode,
		countryName: country.name
	}

	const validate = (values, prop) => {
		const errors = {};
		if (!values.countryCode) {
			errors.countryCode = "Country code is required"
		} else if (!/^(\+?\d{1,4}|\d{1,5})$/.test(values.countryCode)) {
			errors.countryCode = "Invalid country code"
		}
		const numberRegex = /^\+(?:[0-9] ?){6,14}[0-9]$/
		if (!values.phone) {
			errors.phone = "Phone Number is required!"
		} else if (!numberRegex.test(values.countryCode.concat(values.phone))) {
			errors.phone = "Invalid Phone Number"
		}
		if (values.countryName.startsWith("Invalid")) {
			errors.countryCode = "Invalid country code"
		}
		return errors
	}
	// const handleCodeChange = (e, field) => {
	// 	// handleChange.bind(e, field)
	// }
	const onSubmitHandler = async (values) => {
		try {
			dispatch(loadingActions.startLoading("Connecting..."))
			const phoneDetails = await lookUpPhone(values.countryCode, values.phone)
			console.log(phoneDetails)
			dispatch(loadingActions.stopLoading())
			setFormFinalValues(phoneDetails)
			setVisible(true)
		} catch (error) {
			dispatch(loadingActions.stopLoading())
			// dispatch(messageActions.setMessage(error.message, "info"))
			ToastAndroid.show(error.message, ToastAndroid.SHORT)
		}

	}
	const executionFunction = async () => {
		// console.log(formFinalValues)
		try {
			await dispatch(authActions.authenticate(formFinalValues.phoneNumber, "sms"))
			props.navigation.navigate("Verify", { formattedPhoneNumber: formFinalValues.formattedPhoneString })
		} catch (error) {
			console.log(error)
			dispatch(messageActions.setMessage(error.message, "error"))
		}
	}
	//Stop backbutton
	useEffect(() => {
		navigation.addListener('beforeRemove', (e) => {
			e.preventDefault()
		})
		return () => {
			navigation.removeListener('beforeRemove')
		}
	}, [navigation])
	return (
		// <SafeAreaView >
		<ScrollView style={{ flex: 1 }}>
			<KeyboardAvoidingView behavior={Platform.OS === 'ios' ? "height" : "padding"}>
				<View style={styles.sub}>
					<Subheading style={{ textAlign: "center", lineHeight: 17, fontSize: 13 }}>Hack will send an SMS message to verify your phone number.</Subheading>
					<Link to={"https://google.com"}>
						What's my number?
					</Link>
				</View>
				<Formik
					initialValues={initialValues}
					onSubmit={values => { onSubmitHandler(values) }}
					validate={validate}
					enableReinitialize
				>
					{({ handleChange, handleBlur, handleSubmit, values, errors, touched, setFieldValue, setFieldError, setFieldTouched }) => (
						<View style={styles.form}>
							<View style={styles.formField}>
								<View style={{ width: "70%" }}>
									<TextInput
										underlineColor={theme.colors.primary}
										label="Choose a country"
										mode="flat"
										placeholder={"Choose a country"}
										render={textProps => <List.Item title={values.countryCode ? textProps.value : textProps.placeholder} onPress={() => {
											props.navigation.navigate('Countries', { phone: values.phone, name: values.countryName })
										}}
											right={() => <List.Icon icon="menu-down" />}
											rippleColor="transparent"
										/>}
										style={styles.input}
										value={values.countryName}
									/>
								</View>
							</View>
							<View style={{ ...styles.formField }}>
								<View style={{ width: "70%", flexDirection: "row", justifyContent: "space-between" }}>
									<View style={{ width: "25%" }}>
										<TextInput mode="flat"
											underlineColor={theme.colors.primary}
											label="Code"
											value={values.countryCode}
											onChangeText={(text) => {
												setFieldValue('countryCode', text)
												const result = countryList.filter(c => c.dialCode === text)
												if (result.length > 0) {
													setFieldValue('countryName', result[0].name)
													ref.current.focus()
												} else {
													setFieldValue('countryName', 'Invalid country code')
													setFieldTouched('countryCode', true)
													setFieldError('countryCode', 'Invalid country code')
												}
											}}
											onBlur={handleBlur('countryCode')}
											keyboardType="number-pad"
											style={{ ...styles.input }}
											error={errors.countryCode ? true : false}
											returnKeyType="next"
											onEndEditing={() => {
												ref.current.focus()
											}}
										/>
										<HelperText type="error" visible={errors.countryCode ? true : false}>
											{errors.countryCode}
										</HelperText>
									</View>
									<View style={{ width: "75%" }}>
										<TextInput mode="flat"
											underlineColor={theme.colors.primary}
											label="Phone Number"
											autoCompleteType="tel"
											onBlur={handleBlur('phone')}
											onChangeText={handleChange('phone')}
											keyboardType="number-pad"
											style={{ ...styles.input }}
											error={errors.phone && touched.phone ? true : false}
											ref={ref}
											returnKeyType="done"
											onSubmitEditing={handleSubmit}
										/>
										<HelperText type="error" visible={errors.phone && touched.phone ? true : false}>
											{errors.phone}
										</HelperText>
									</View>
								</View>
							</View>
							<Subheading style={{ color: "gray", fontWeight: "100", textAlign: "center", fontSize: 12 }} >Carrier SMS charges may apply</Subheading>
							<View style={styles.formField}>
								<Button mode="contained" disabled={errors.phone || errors.countryCode ? true : false} style={"btn"} onPress={handleSubmit}>Next</Button>
							</View>
						</View>
					)
					}
				</Formik>
				<ConfirmDialog
					okText="OK"
					cancelText="CANCEL"
					visible={visible}
					hideDialog={() => setVisible(false)}
					executionFunction={executionFunction}
					justifyAction="space-between"
					title={"Confirm"}
					content={`By cliking OK, HackChat will send a verification message to ${formFinalValues.formattedPhoneString}. Click CANCEL to change number. Continue?`}
				/>
			</KeyboardAvoidingView>
		</ScrollView>
		// </SafeAreaView>
	)
}
export const screenOptions = {
	headerTitle: "Enter your phone number",
	header: (props) => <DefaultAppbar {...props} alignText="center" backButton={false} />
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
		marginVertical: "2%",
		flexDirection: "column",
	},
	input: {
		backgroundColor: "transparent"
	},
	form: {
		marginVertical: "2%",
	},
	formField: {
		flex: 1,
		alignItems: "center"
	}
})
export default Login
