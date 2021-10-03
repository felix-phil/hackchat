import React, { useEffect, useState, useRef } from "react";
import { View, Text, FlatList, StyleSheet, ScrollView, SafeAreaView, KeyboardAvoidingView, Platform, Picker } from "react-native";
import { Title, Subheading } from 'react-native-paper'
import { useDispatch, useSelector } from "react-redux"
import * as authActions from "../../store/actions/auth"
// import DropDown from "react-native-paper-dropdown";
import { TextInput, Button, HelperText } from 'react-native-paper';
import { Formik } from "formik"
import countries from "../../data/countries";
import ConfirmDialog from "../../components/utils/ConfirmDialog";
import * as messageActions from '../../store/actions/messages';

const Login = (props) => {
	const isAuth = useSelector(state => state.auth.isAuthenticated);
	const dispatch = useDispatch();
	const [countryList, setCountryList] = useState(countries)
	const [visible, setVisible] = useState(false)
	const [formFinalValues, setFormFinalValues] = useState({})
	const ref = useRef()

	const initialValues = {
		phone: "",
		countryCode: "+234"
	}
	const validate = (values, prop) => {
		const errors = {};
		if (!values.countryCode) {
			errors.countryCode = "Country code is required"
		} else if (!/^(\+?\d{1,4}|\d{1,5})$/.test(values.countryCode)) {
			errors.countryCode = "Invalid Country Code"
		}
		const numberRegex = /^\+(?:[0-9] ?){6,14}[0-9]$/
		if (!values.phone) {
			errors.phone = "Phone Number is required!"
		} else if (!numberRegex.test(values.countryCode.concat(values.phone))) {
			errors.phone = "Invalid Phone Number"
		}
		return errors
	}
	const onSubmitHandler = (values) => {
		setVisible(true)
		setFormFinalValues(values)
	}
	const executionFunction = async () => {
		// console.log(formFinalValues)
		try {
			await dispatch(authActions.authenticate(formFinalValues.countryCode + formFinalValues.phone, "sms"))
			props.navigation.navigate("Verify")
		} catch (error) {
			console.log(error)
			dispatch(messageActions.setMessage(error.message, "error"))
		}
	}
	return (
		// <SafeAreaView >
		<ScrollView style={{ flex: 1 }}>
			<KeyboardAvoidingView behavior={Platform.OS === 'ios' ? "height" : "padding"}>
				<View style={styles.center}>
					<Title>Enter your phone number</Title>
				</View>
				<View style={styles.sub}>
					<Subheading style={{ textAlign: "center", lineHeight: 17 }}>Hack will send an SMS to verify your phone number</Subheading>
				</View>
				<Formik
					initialValues={initialValues}
					onSubmit={values => { onSubmitHandler(values) }}
					validate={validate}
				>
					{({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
						<View style={{ marginVertical: "5%" }}>
							<View style={styles.form1}>
								<HelperText type="info" visible={true}>
									Select Country
								</HelperText>
								<Picker selectedValue={values.countryCode} onValueChange={handleChange('countryCode')} style={styles.picker}>
									{
										countryList.map((item, index) => <Picker.Item label={item.name} value={item.dialCode} key={index} />)
									}
								</Picker>
							</View>
							<View style={styles.form2}>
								<View style={styles.code}>
									<TextInput mode="flat"
										label="Code"
										value={values.countryCode}
										onChangeText={handleChange('countryCode')}
										onBlur={handleBlur('countryCode')}
										keyboardType="number-pad"
										style={styles.input}
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
								<View style={styles.phone}>
									<TextInput mode="flat"
										label="Phone Number"
										autoCompleteType="tel"
										onBlur={handleBlur('phone')}
										onChangeText={handleChange('phone')}
										keyboardType="number-pad"
										style={styles.input}
										error={errors.phone && touched.phone ? true : false}
										ref={ref}
										onEndEditing={handleSubmit}
									/>
									<HelperText type="error" visible={errors.phone && touched.phone ? true : false}>
										{errors.phone}
									</HelperText>
								</View>
							</View>
							<View style={styles.form3}>
								<Button mode="contained" disabled={errors.phone || errors.countryCode ? true : false} style={"btn"} onPress={handleSubmit}>Next</Button>
							</View>
						</View>
					)}
				</Formik>
				<ConfirmDialog
					okText="OK"
					cancelText="CANCEL"
					visible={visible}
					hideDialog={() => setVisible(false)}
					executionFunction={executionFunction}
					title={"Confirm"}
					content={`By cliking OK, Hack will send a verification message to ${formFinalValues.countryCode + formFinalValues.phone}. Click CANCEL to change number. Continue?`}
				/>
			</KeyboardAvoidingView>
		</ScrollView>
		// </SafeAreaView>
	)
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
	input: {
		backgroundColor: "transparent"
	},
	form1: {
		// flex: 1,
		marginTop: "5%",
		width: "100%",
		// justifyContent: "center",
		borderBottomWidth: 2,
		borderBottomColor: "#ccc"

		// flexDirection: "row",
		// alignItems: "center"
	},
	form2: {
		marginTop: "5%",
		// flex: 1,
		flexDirection: "row",
		width: "100%",
		justifyContent: "space-between",
		// alignItems: "center"
	},
	picker: {
		height: 50,
		width: "100%",
	},
	code: {
		width: "30%",
	},
	phone: {
		width: "65%"
	},
	dropdown: {
		width: "100%"
	},
	form3: {
		alignItems: "center",
	}
})
export default Login
