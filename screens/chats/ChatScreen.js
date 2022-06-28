import React, { useEffect, useCallback, useState, useRef } from 'react'
import { StyleSheet, View, ImageBackground, Dimensions, FlatList, Keyboard } from 'react-native'
import { Surface, Text } from "react-native-paper"
import { useDispatch, useSelector } from 'react-redux'
import FileMessage from '../../components/chat/FileMessage'
import ChatBottom from '../../components/chat/ChatDetailBottom'
import * as chatMessageAction from '../../store/actions/chatMessages'
import * as chatActions from '../../store/actions/chat'
import AMessage from '../../components/messages/AMessage'

const ChatScreen = ({ navigation, route }) => {
    const phoneNumber = route.params ? route.params.phone : null
    const contact = route.params ? route.params.contact : null
    const flatListRef = useRef(null)
    const dispatch = useDispatch()
    const auth = useSelector(state => state.auth)
    const [showOtherMessageType, setShowOtherMessageType] = useState(false)
    const [message, setMessage] = useState('')
    const previousMessages = useSelector(state => state.chatMessages.allMessages)[phoneNumber]
    const [selectionMode, setSelectionMode] = useState(false)
    const [selectedMessages, setSelectedMessages] = useState([])

    // console.log(previousMessages)
    const onSubmitHandler = () => {
        if (message.trim() === '') {
            return
        }
        const newTime = new Date()
        dispatch(chatMessageAction.sendMessage({ message: message, date: newTime.toISOString() }, phoneNumber, contact.imageUrl))
        setMessage('')
    }
    // const onSeachValueChange = (value) => {
    //     // dispatch(contactActions.filterContact(value))
    //     console.log(value)
    // }

    useEffect(() => {
        dispatch(chatActions.markAllRead(phoneNumber))
    }, [phoneNumber, dispatch, previousMessages])

    const setOptions = useCallback(
        () => {
            navigation.setOptions({
                headerTitle: contact.name ? contact.name : phoneNumber,
                avatarImageUrl: contact.imageUrl,
                contact: contact,
                // onHeaderSearchValueChange: onSeachValueChange
            })
        },
        [navigation, phoneNumber, contact],
    )
    useEffect(() => {
        setOptions()
    }, [setOptions])

    const _scrollFlatListToEnd = useCallback(
        () => {
            if (flatListRef.current && previousMessages) {
                flatListRef.current.scrollToEnd({ animated: true })
            }
        },
        [flatListRef, previousMessages],
    )

    useEffect(() => {
        _scrollFlatListToEnd()
    }, [_scrollFlatListToEnd])

    return (
        <Surface style={styles.container}>
            <FlatList
                ref={flatListRef}
                data={previousMessages}
                keyExtractor={(item, index) => item.id + index.toString()}
                onLayout={() => _scrollFlatListToEnd()}
                renderItem={item =>
                    <AMessage
                        message={item.item}
                        selectionMode={selectionMode}
                        setSelectionMode={setSelectionMode}
                        selectedMessages={selectedMessages}
                        setSelectedMessages={setSelectedMessages}
                    />}
                style={styles.chats}
            />
            <View style={styles.form}>
                <ChatBottom
                    messageText={message}
                    setMessageText={setMessage}
                    showOtherMessageType={() => setShowOtherMessageType(true)}
                    submitHandler={onSubmitHandler}
                />
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
        backgroundColor: "white"
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
