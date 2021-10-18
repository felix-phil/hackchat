import * as Notifications from "expo-notifications";
import Constants from "expo-constants";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const fetchDeviceId = async () => {
    let fetchedId;
    const deviceId = await AsyncStorage.getItem("deviceId")
    if (deviceId) {
        fetchedId = deviceId
    } else {
        try {
            if (Constants.isDevice) {
                const { status: existingStatus } = await Notifications.getPermissionsAsync();
                let finalStatus = existingStatus;
                if (existingStatus !== "granted") {
                    const { status } = await Notifications.requestPermissionsAsync();
                    finalStatus = status
                }
                if (finalStatus !== "granted") {
                    alert('Failed ti get push token notifications')
                    throw new Error("Notifications permission not granted")
                }
                const token = await Notifications.getExpoPushTokenAsync()
                fetchedId = token.data
            }
        } catch (error) {
            throw error
        }
    }
    return fetchedId
}