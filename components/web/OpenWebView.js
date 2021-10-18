import React from 'react'
import { StyleSheet, Linking } from 'react-native'
import { TouchableRipple } from 'react-native-paper'
const OpenWebView = ({ children, source, onPress }) => {
    const handleOnPress = () => {
        onPress ? onPress() :
        console.log("open ", source, " in web")
    }
    return (
        <TouchableRipple rippleColor="transparent" onPress={handleOnPress}>
            {children}
        </TouchableRipple>
    )
}

export default OpenWebView

const styles = StyleSheet.create({})
