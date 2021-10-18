import React, { useState } from 'react'
import { Dimensions, StyleSheet, Text, View } from 'react-native'
import { IconButton, Portal, Surface, Modal } from 'react-native-paper'
import { FlatGrid } from "react-native-super-grid"
import { MaterialCommunityIcons } from "@expo/vector-icons"

const FileMessage = ({show, open, close}) => {
    const menu = [
        {
            label: "Document",
            icon: "file-document",
            color: "blue",
            onPress: () => {}
        },
        {
            label: "Camera",
            icon: "camera",
            color: "pink",
            onPress: () => {}
        },
        {
            label: "Gallery",
            icon: "image",
            color: "purple",
            onPress: () => {}
        },
        {
            label: "Audio",
            icon: "music-circle",
            color: "orange",
            onPress: () => {}
        },
        {
            label: "Room",
            icon: ({size, color})=><MaterialCommunityIcons name="link-variant" size={size} color={color} />,
            color: "blue",
            onPress: () => {}
        },
        {
            label: "Location",
            icon: "map-marker",
            color: "green",
            onPress: () => {}
        },
        {
            label: "Contact",
            icon: "account",
            color: "blue",
            onPress: () => {}
        }

    ]
    return (
        <Portal>
            <Modal
                animationType="fade"
                visible={show}
                onDismiss={close}
                // style={styles.modal}
                contentContainerStyle={styles.modal}
            >
                <Surface style={styles.container}>
                    <FlatGrid
                        keyExtractor={(item, index) => item.icon + index.toString()}
                        itemDimension={(22.5/100)* Dimensions.get("screen").width}                        
                        data={menu}
                        contentContainerStyle={styles.grid}
                        spacing={10}
                        renderItem={({ item }) => (
                            <View style={styles.item}>
                                <IconButton icon={item.icon} size={40} onPress={item.onPress} color="white" style={{...styles.gridItem, backgroundColor: item.color }}/>
                                <Text>{item.label}</Text>
                            </View>
                        )}
                    />
                </Surface>
            </Modal>
        </Portal>
    )
}

export default FileMessage

const styles = StyleSheet.create({
    modal: {
        alignSelf: "center",
        bottom: -Dimensions.get("window").width * (23/100)
    },
    container: {
        width: Dimensions.get("window").width - ((5/100)*Dimensions.get('window').width),
        borderRadius: 20,
        // justifyContent: "flex-start"
        // justifyContent: "flex-end",
    },
    grid: {
        // flex: 1,
        // flexDirection: "row",
        width: Dimensions.get("window").width - ((10/100)*Dimensions.get('window').width),
 
    },
    item: {
        alignItems: "center",
    },
    gridItem: {
        alignItems: "center",
        justifyContent: "center",
    }

})
