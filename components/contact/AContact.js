import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { host } from "../../constants/endpoints"
import { List, Avatar, TouchableRipple } from "react-native-paper"

const AContact = (props) => {
    const { contact, handleShowImage } = props
    return (
        <List.Item
            title={contact.name}
            description={contact.status}
            onPress={() => {
                console.log(contact.phoneNumber)
            }}
            left={props => (
                <TouchableRipple
                    borderless
                    onPress={handleShowImage}>
                    <Avatar.Image size={50} source={{ uri: host + contact.imageUrl }} />
                </TouchableRipple>)
            }
        />
    )
}

export default AContact

const styles = StyleSheet.create({})
