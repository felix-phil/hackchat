import React from 'react'
import { StyleSheet, Text, View, Linking } from 'react-native'
import { TouchableRipple } from 'react-native-paper'
import { useDispatch } from 'react-redux'
import * as messageAction from "../../store/actions/messages"
const Link = ({ children, to, onPress, style }) => {
    const dispatch = useDispatch()
    const handleOnPress = () => {
        onPress ? onPress() :
        Linking.openURL(to).catch(err=>{
            dispatch(messageAction.setMessage(`Unable to open ${to}`, "error"))
        })
    }
    return (
        <Text onPress={handleOnPress} style={{...style, color: "blue"}}>
            {children}
        </Text>
    )
}

export default Link

const styles = StyleSheet.create({})
