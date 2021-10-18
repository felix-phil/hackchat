import React, { useEffect, useCallback, useState } from 'react'
import { StyleSheet, View, ImageBackground, Dimensions, FlatList } from 'react-native'
import { Surface, Text } from "react-native-paper"
import { useDispatch, useSelector } from 'react-redux'
import FileMessage from '../../components/chat/FileMessage'
import ChatBottom from '../../components/chat/ChatBottom'
import { getProfile } from '../../constants/requests'
import * as messageAction from "../../store/actions/messages"

const ChatScreen = ({ navigation, route }) => {
    const phoneNumber = route.params ? route.params.phone : null
    const contact = route.params ? route.params.contact : null
    const dispatch = useDispatch()
    const auth = useSelector(state => state.auth)
    const [showOtherMessageType, setShowOtherMessageType] = useState(false)

    
    // const onSeachValueChange = (value) => {
    //     // dispatch(contactActions.filterContact(value))
    //     console.log(value)
    // }
    
    const setOptions = useCallback(
        async () => {
            let headerTitleName
            let avatarImageUrl
            if (contact.name) {
                headerTitleName = contact.name
                avatarImageUrl = contact.imageUrl
            } else {
                headerTitleName = phoneNumber
            }
            try {
                const userProfile = await getProfile(phoneNumber, auth.token, auth.deviceId)
                avatarImageUrl = userProfile.profileImage
            } catch (err) {
                console.log(err)
                dispatch(messageAction.setMessage(err.message, "error"))
            }
            navigation.setOptions({
                headerTitle: headerTitleName,
                avatarImageUrl: avatarImageUrl,
                contact: contact,
                // onHeaderSearchValueChange: onSeachValueChange
            })
        },
        [navigation, phoneNumber, contact, auth],
    )
    useEffect(() => {
        setOptions()
    }, [setOptions])
    const testData = ["Hello", "Hello", "Hello", "Hello", "Hello", "Hello", "Hello", "Hello", "Hello", "Hello", "Hello", "Hello", "Hello", "Hello", "Hello", "Hello", "Hello", "Hello", "Hello", "Hello", "Hello", "Hello", "Hello", "Hello", "Hello", "Hello", "Hello", "Hello"]
    return (
        <Surface style={styles.container}>
            <FlatList data={testData} keyExtractor={(item, index) => item + index.toString()} renderItem={item => <Text>{item.item}</Text>} style={styles.chats} />
            <View style={styles.form}>
                <ChatBottom showOtherMessageType={() => setShowOtherMessageType(true)} />
            </View>
            <FileMessage show={showOtherMessageType} close={() => setShowOtherMessageType(false)} />
        </Surface>
    )
}

export default ChatScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: Dimensions.get('window').height,
        // justifyContent: ""
    },
    chats: {
        // height: "80%"
        height: (90 / 100) * Dimensions.get('window').height,
        // flex: 1
    },
    form: {
        // flex: 1,
        height: (10 / 100) * Dimensions.get('window').height,
        // flexDirection:"column",
        // alignSelf: "flex-end"
    }
})
