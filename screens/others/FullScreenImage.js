import React, { useEffect } from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'

const FullScreenImage = ({route, navigation}) => {
    const {imageUrl, title } = route.params
    useEffect(() => {
        navigation.setOptions({ headerTitle: title })
    }, [navigation])
    return (
        <View style={styles.screen}>
            <Image style={{ width: "100%", height: "50%"}} source={{ uri: imageUrl }} />
        </View>
    )
}

export default FullScreenImage

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }
})
