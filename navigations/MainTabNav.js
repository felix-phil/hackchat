import React, { useEffect, useState } from 'react'
import HomeTab from '../screens/tab/HomeTab'
import StatusTab from '../screens/tab/StatusTab';
import HistoryTab from '../screens/tab/HistoryTab';
import CameraTab from '../screens/tab/CameraScreen';
import Ionicons from "@expo/vector-icons/Ionicons";
import { Portal, FAB, useTheme } from "react-native-paper"
import { useIsFocused, getFocusedRouteNameFromRoute } from "@react-navigation/native"
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

const Tab = createMaterialTopTabNavigator();

const MainTabs = ({ route, navigation }) => {
  const isFocused = useIsFocused()
  const [showFab, setShowFab] = useState(true)
  const [showSmallFab, setShowSmallFab] = useState(false)
  const routeName = getFocusedRouteNameFromRoute(route) ?? 'CHATS';
  const theme = useTheme()

  let icon = "camera"
  let smallIcon = "pencil"
  useEffect(() => {
    if (routeName == "Camera") {
      setShowFab(false)
    } else {
      setShowFab(true)
    }
    if (routeName === "CALLS" || routeName === "STATUS") {
      setShowSmallFab(true)
    } else {
      setShowSmallFab(false)
    }
  }, [routeName])

  switch (routeName) {
    case 'CHATS':
      icon = 'android-messages';
      break;
    case 'CALLS':
      icon = 'phone-plus'
      smallIcon = "video-plus"
      break
    case 'STATUS':
      smallIcon = "pencil"
    case "Camera":
    default:
      icon = 'camera';
      break;
  }
  const getTabBarVisibily = (route) => {
    const routeName = route.state ? route.state.routes[route.state.index].name : ''
    if (routeName === "Camera") {
      return false
    }
    return true
  }
  const fabClickedHandler = () => {
    if (routeName === "CHATS") {
      navigation.navigate("Contacts")
    }
  }
  return (
    <React.Fragment>
      <Tab.Navigator initialRouteName="CHATS" screenOptions={{
        showIcon: true,
        tabBarLabelStyle: {
          fontWeight: "bold"
        },
        tabBarActiveTintColor: theme.colors.primary
      }}
        backBehavior="initialRoute" >
        <Tab.Screen name="Camera" component={CameraTab} options={({ route }) => ({
          tabBarShowLabel: false,
          tabBarIcon: (tabInfo) => (<Ionicons name="ios-camera" size={24} color={tabInfo.color} />),
          tabBarVisible: getTabBarVisibily(route),
        })}
        />
        <Tab.Screen name="CHATS" component={HomeTab} />
        <Tab.Screen name="STATUS" component={StatusTab} />
        <Tab.Screen name="CALLS" component={HistoryTab} />
      </Tab.Navigator>
      {showFab && <Portal>
        {showSmallFab ?
          <FAB
            visible={isFocused}
            icon={smallIcon}
            small={true}
            style={{
              position: 'absolute',
              bottom: "17%",
              right: "13%",
              backgroundColor: theme.colors.backdrop
            }}
            color="white"
            onPress={fabClickedHandler}

          />
          :
          null
        }
        <FAB
          visible={isFocused}
          icon={icon}
          small={false}
          style={{
            position: 'absolute',
            bottom: "7%",
            right: "10%",
            backgroundColor: theme.colors.primary
          }}
          color="white"
          onPress={fabClickedHandler}

        />
      </Portal>}
    </React.Fragment>

  );

}
export default MainTabs
