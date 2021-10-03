import React from 'react'
import { StyleSheet, View } from 'react-native'
import { ActivityIndicator } from 'react-native-paper'

const PageActivity = () => {
    return (
        <View style={styles.screen}>
            <ActivityIndicator />
        </View>
    )
}

export default PageActivity

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }
})
