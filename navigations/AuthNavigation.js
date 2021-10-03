import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from "../screens/auth/Login"
import VerifyScreen from "../screens/auth/Verify"
const Stack = createNativeStackNavigator()
const AuthStack = () => {
	return (
		<Stack.Navigator initialRouteName="Login">
			<Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
			<Stack.Screen name="Verify" component={VerifyScreen} options={{ headerShown: false }} />
		</Stack.Navigator>
	)
}
export default AuthStack
