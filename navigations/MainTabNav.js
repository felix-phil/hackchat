import React, { useEffect, useState } from 'react';
import ChatTab from '../screens/tab/ChatTab';
import StatusTab from '../screens/tab/StatusTab';
import HistoryTab from '../screens/tab/HistoryTab';
import CameraTab from '../screens/tab/CameraScreen';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Portal, FAB, useTheme } from 'react-native-paper';
import {
  useIsFocused,
  getFocusedRouteNameFromRoute,
} from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { View, Text } from 'react-native';
import ChatHOC from '../screens/hocs/ChatHOC';

const Tab = createMaterialTopTabNavigator();

const MainTabs = ({ route, navigation }) => {
  // console.log(options)
  const isFocused = useIsFocused();
  const [showFab, setShowFab] = useState(true);
  const [showSmallFab, setShowSmallFab] = useState(false);
  const routeName = getFocusedRouteNameFromRoute(route) ?? 'CHATS';
  const theme = useTheme();

  let icon = 'camera';
  let smallIcon = 'pencil';
  useEffect(() => {
    if (routeName == 'Camera') {
      setShowFab(false);
    } else {
      setShowFab(true);
    }
    if (routeName === 'CALLS' || routeName === 'STATUS') {
      setShowSmallFab(true);
    } else {
      setShowSmallFab(false);
    }
  }, [routeName]);

  switch (routeName) {
    case 'CHATS':
      icon = 'android-messages';
      break;
    case 'CALLS':
      icon = 'phone-plus';
      smallIcon = 'video-plus';
      break;
    case 'STATUS':
      smallIcon = 'pencil';
    case 'Camera':
    default:
      icon = 'camera';
      break;
  }
  const getTabBarVisibily = (route) => {
    const routeName = route.state
      ? route.state.routes[route.state.index].name
      : '';
    if (routeName === 'Camera') {
      return false;
    }
    return true;
  };
  const fabClickedHandler = () => {
    if (routeName === 'CHATS') {
      navigation.navigate('Contacts');
    }
  };
  return (
    <ChatHOC>
      <Tab.Navigator
        initialRouteName="CHATS"
        screenOptions={{
          showIcon: true,
          tabBarLabelStyle: {
            fontWeight: 'bold',
          },
          tabBarActiveTintColor: theme.colors.primary,
        }}
        backBehavior="initialRoute"
      >
        <Tab.Screen
          name="Camera"
          component={CameraTab}
          options={({ route }) => ({
            tabBarShowLabel: false,
            tabBarIcon: (tabInfo) => (
              <Ionicons name="ios-camera" size={24} color={tabInfo.color} />
            ),
            tabBarVisible: getTabBarVisibily(route),
          })}
        />
        <Tab.Screen name="CHATS" component={ChatTab} />
        <Tab.Screen name="STATUS" component={StatusTab} />
        <Tab.Screen name="CALLS" component={HistoryTab} />
      </Tab.Navigator>
      {showFab && (
        <Portal>
          <View
            style={{
              position: 'absolute',
              bottom: '5%',
              right: '5%',
              flexDirection: 'column',
              justifyContent: 'flex-end',
              alignItems: 'center',
              // padding: 10
            }}
          >
            {showSmallFab && (
              <FAB
                visible={isFocused}
                icon={smallIcon}
                small
                style={{
                  backgroundColor:
                    theme.mode === 'adaptive'
                      ? theme.colors.placeholder
                      : theme.colors.surface,
                  marginVertical: '30%',
                }}
                color={
                  theme.mode === 'adaptive'
                    ? theme.colors.text
                    : theme.colors.primary
                }
                onPress={fabClickedHandler}
              />
            )}
            <FAB
              visible={isFocused}
              icon={icon}
              small={false}
              style={{
                backgroundColor: theme.colors.primary,
              }}
              color="white"
              onPress={fabClickedHandler}
            />
          </View>
        </Portal>
      )}
    </ChatHOC>
  );
};
export default MainTabs;
