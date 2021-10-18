import React from 'react'
import { StyleSheet, View, ScrollView, SafeAreaView } from 'react-native'
import { Button, Title, useTheme, Text } from 'react-native-paper'
import LottieRounded from '../../components/design/LottieRounded'
import Link from '../../components/web/Link'
import { useNetInfo } from "@react-native-community/netinfo"
import { useDispatch, useSelector } from 'react-redux'
import { fetchDeviceId } from '../../helpers/notifications'
import * as authActions from "../../store/actions/auth"
import * as messageAction from "../../store/actions/messages"
import * as loadActions from "../../store/actions/loading"

const Welcome = ({ navigation }) => {
    const theme = useTheme()
    const netInfo = useNetInfo()
    const deviceId = useSelector(state => state.auth.deviceId)
    const dispatch = useDispatch()

    const handleAgree = async () => {
        try {
            if (!netInfo.isConnected) {
                throw new Error("Internet connection not available")
                // return
            } else {
                // console.log("Reaching here")
                // dispatch(loadActions.startLoading("Connecting..."))
                navigation.navigate("Login")
                const token = await fetchDeviceId()
                dispatch(authActions.setDeviceId(token))
                // handleAgree()
                // dispatch(loadActions.stopLoading())
            }
        } catch (error) {
            // dispatch(loadActions.stopLoading())
            dispatch(messageAction.setMessage(error.message, "error"))
        }
    }

    return (
        <SafeAreaView style={styles.root}>
            <ScrollView style={{ flex: 1 }} contentContainerStyle={{ alignItems: 'center' }}>
                <View style={styles.titleContainer}>
                    <Title style={{ ...styles.title, color: theme.colors.primary }}>Welcome to HackChat</Title>
                </View>
                <View style={{ width: "80%" }}>
                    <LottieRounded />
                </View>
                <View style={styles.subContainer}>
                    <Text style={{ textAlign: "center" }} >
                        <Text style={styles.subhead}>Read Our </Text>
                        <Link to="https://google.com">
                            Privacy Policy
                        </Link>
                        <Text style={styles.subhead}>. Tap "Agree and continue" to accept the</Text>
                        <Link to="https://google.com">
                            Terms of service
                        </Link>
                    </Text>
                    <View style={styles.buttonContainer}>
                        <Button mode="contained" onPress={handleAgree}>
                            Agree and continue
                        </Button>
                    </View>
                </View>

            </ScrollView>
        </SafeAreaView>
    )
}
export const screenOptions = {
    headerShown: false
}
export default Welcome

const styles = StyleSheet.create({
    root: {
        flex: 1,
        padding: 20,
        alignContent: 'center',
        justifyContent: 'center'
    },
    titleContainer: {
        alignItems: 'center',
        marginVertical: "15%",
    },
    title: {
        fontSize: 25,
        alignItems: "center",
        justifyContent: "center"
    },
    subContainer: {
        flex: 1,
        marginVertical: "5%",
        alignItems: "center",
        justifyContent: "center"
    },
    subhead: {
        fontSize: 16,
        color: "gray",
    },
    buttonContainer: {
        marginVertical: "10%",
        justifyContent: "space-between",
        flexDirection: "column"
    }

})
