import React, { useState } from 'react'
import { StyleSheet } from 'react-native'
import { Modal, Portal, Card, IconButton, useTheme, TouchableRipple } from 'react-native-paper'
import { useNavigation } from "@react-navigation/native"
import { useSelector, useDispatch } from 'react-redux'
import * as conAction from "../../store/actions/contacts"
import { host } from "../../constants/endpoints"

const PortalImage = (props) => {
    const portalOption = useSelector(state => state.contact)
    const dispatch = useDispatch()
    const theme = useTheme()
    const navigation = useNavigation()

    return (
        <Portal>
            <Modal visible={portalOption.showPortalImage}
                onDismiss={() => {
                    dispatch(conAction.hidePortalImage())
                }}
                style={styles.modal}
                contentContainerStyle={styles.containerStyle}>
                <Card>
                    <Card.Title style={{ backgroundColor: "transparent" }} title={portalOption.profileName} />
                    <TouchableRipple onPress={() => { dispatch(conAction.hidePortalImage()); navigation.navigate("FullScreenImage", { imageUrl: host + portalOption.profileImageUrl, title: portalOption.profileName }) }}>
                        <Card.Cover resizeMode="cover" source={{ uri: host + portalOption.profileImageUrl }} style={{ width: "100%" }} />
                    </TouchableRipple>
                    <Card.Actions style={{ justifyContent: "space-evenly", alignItems: "center" }} >
                        <IconButton color={theme.colors.primary} icon="android-messages" onPress={() => {
                            dispatch(conAction.hidePortalImage())
                            portalOption.functionToHandleChat()
                        }} />
                        {
                            portalOption.routeName === "Contacts" &&
                            <>
                                <IconButton color={theme.colors.primary} icon="phone" onPress={() => {
                                    dispatch(conAction.hidePortalImage())
                                    portalOption.functionToHandleCall()
                                }} />
                                <IconButton color={theme.colors.primary} icon="video" onPress={() => {
                                    dispatch(conAction.hidePortalImage())
                                    portalOption.functionToHandleVideo()
                                }} />
                            </>
                        }
                        <IconButton color={theme.colors.primary} icon="information-outline" onPress={() => {
                            dispatch(conAction.hidePortalImage())
                            portalOption.functionToHandleProfileInfo()
                        }} />
                    </Card.Actions>
                </Card>
            </Modal>
        </Portal>
    )
}

export default PortalImage

const styles = StyleSheet.create({
    modal: {
        flex: 1
    },
    containerStyle: {
        backgroundColor: 'black',
        // padding: 10,
        width: "70%",
        height: "40%",
        alignSelf: "center",
        // justifyContent: "center"
    }
})
