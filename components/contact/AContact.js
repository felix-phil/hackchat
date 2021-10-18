import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { host } from "../../constants/endpoints"
import { List, Avatar, TouchableRipple } from "react-native-paper"

const AContact = (props) => {
    // const { contact, handleShowImage } = props
    return (
        <List.Item
            title={props.contact.name}
            description={props.contact.status}
            onPress={props.handlePress}
            left={prop => (
                <TouchableRipple
                    borderless
                    onPress={props.handleShowImage}>
                    <Avatar.Image size={50} source={{ uri: host + props.contact.imageUrl }} />
                </TouchableRipple>
                )
            }
        />
    )
}

export default AContact

const styles = StyleSheet.create({})
