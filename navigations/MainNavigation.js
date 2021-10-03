import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainTabs from './MainTabNav';
import CustomAppbar from '../components/main/headers/CustomNavigationAppbar';
import Contacts from '../screens/others/Contacts';
import DefaultAppbar from '../components/main/headers/DefaultHeader';
import FullScreenImage from '../screens/others/FullScreenImage';

const Stack = createNativeStackNavigator()

const MainStack = () => {
	
	return (
		<Stack.Navigator
			headerMode="screen"
		>
			<Stack.Screen name="HackChat" component={MainTabs} options={{
				headerTitle: "HackChat",
				header: (props) => {
					return <CustomAppbar {...props}/>
				}
			}} />
			<Stack.Screen name="Contacts" component={Contacts} options={{
				headerTitle: "Select contact",
				header: (props) => <CustomAppbar {...props} />
			}} />
			<Stack.Screen name="FullScreenImage" component={FullScreenImage} options={{
				header: (props) => <DefaultAppbar {...props} />,
				animation: "slide_from_right"
			}} />
			
		</Stack.Navigator >
	)
}
export default MainStack
