import React, { useState } from "react"
import { Appbar} from "react-native-paper"
import { StyleSheet } from "react-native"

const DefaultAppbar = (props) => {
    const { navigation, route, options, backButton } = props
    const previous = navigation.canGoBack()
    return (
        <Appbar.Header>
            {previous && backButton ? <Appbar.BackAction onPress={navigation.goBack} /> : null}
            <Appbar.Content title={options.headerTitle} titleStyle={{
                // alignItems: "center",
                alignSelf: props.alignText || "flex-start"
            }}/>

        </Appbar.Header>
    )
}
const styles = StyleSheet.create({
    
})
export default DefaultAppbar