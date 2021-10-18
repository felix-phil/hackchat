import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WelcomeScreen, { screenOptions as welcomeScreenOptions } from "../screens/auth/Welcome"
import LoginScreen, { screenOptions as loginScreenOptions } from "../screens/auth/Login"
import VerifyScreen, { screenOptions as verifyScreenOptions } from "../screens/auth/Verify"
import Coutries, {screenOptions as coutryScreenOptions} from '../screens/auth/Coutries';

const Stack = createNativeStackNavigator()

const AuthStack = () => {
	return (
		<Stack.Navigator initialRouteName="Welcome">
			<Stack.Screen name="Welcome" component={WelcomeScreen} options={welcomeScreenOptions} />
			<Stack.Screen name="Login" component={LoginScreen} options={loginScreenOptions} />
			<Stack.Screen name="Verify" component={VerifyScreen} options={verifyScreenOptions} />
			<Stack.Screen name="Countries" component={Coutries} options={coutryScreenOptions} />
		</Stack.Navigator>
	)
}
export default AuthStack
