import React, { useState } from "react"
import { Appbar} from "react-native-paper"
import { StyleSheet } from "react-native"

const DefaultAppbar = ({ navigation, route, options }) => {
    const previous = navigation.canGoBack()
    return (
        <Appbar.Header>
            {previous ? <Appbar.BackAction onPress={navigation.goBack} /> : null}
            <Appbar.Content title={options.headerTitle} />
        </Appbar.Header>
    )
}
const styles = StyleSheet.create({
    
})
export default DefaultAppbar