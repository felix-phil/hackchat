import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainTabs from './MainTabNav';
import CustomAppbar from '../components/main/headers/CustomNavigationAppbar';
import Contacts from '../screens/others/Contacts';
import DefaultAppbar from '../components/main/headers/DefaultHeader';
import FullScreenImage from '../screens/others/FullScreenImage';
import ChatScreen from '../screens/chats/ChatScreen';
import ChatHeader from '../components/main/headers/ChatHeader';


const Stack = createNativeStackNavigator()

const MainStack = () => {
	return (
		<Stack.Navigator
			headerMode="screen"
		>
			<Stack.Screen name="HackChat" component={MainTabs} options={{
				headerTitle: "HackChat",
				header: (props) => {
					return <CustomAppbar {...props} searchOption otherOptions/>
				}
			}} />
			<Stack.Screen name="Contacts" component={Contacts} options={{
				headerTitle: "Select contact",
				header: (props) => <CustomAppbar {...props} searchOption otherOptions />
			}} />
			<Stack.Screen name="FullScreenImage" component={FullScreenImage} options={{
				header: (props) => <DefaultAppbar {...props} backButton />,
				animation: "slide_from_right"
			}} />
			<Stack.Screen name="ChatScreen" component={ChatScreen} options={{
				header: (props) => <ChatHeader {...props} backButton />,
				animation: "slide_from_bottom"
			}} />
			
		</Stack.Navigator >
	)
}
export default MainStack
