import React, { useState } from 'react';
import { BottomNavigation, IconButton, Text, TextInput, useTheme } from 'react-native-paper';
import { View, StyleSheet, Dimensions, KeyboardAvoidingView, Platform, ToastAndroid } from "react-native"

// import EmojiBoard from "react-native-emoji-board"

const ChatBottom = ({ showOtherMessageType, messageText, setMessageText, submitHandler }) => {
    // const [index, setIndex] = useState(0);
    const theme = useTheme()
    const [emoji, setEmoji] = useState(false)
    const enterKey = "send"
    const [isTextMessage, setIsTextMessage] = useState(false)
    const toggleEmoji = () => {
        // ToastAndroid.show('Coming Soon', ToastAndroid.SHORT)
        setEmoji(prev => !prev)
    }
    const onTextChange = (text) => {
        if (text.trim() !== "") {
            setMessageText(text)
            if (!isTextMessage) {
                setIsTextMessage(true)
            }
        } else {
            setMessageText(text)
            if (isTextMessage) {
                setIsTextMessage(false)
            }
        }
    }
    const onSubmitHandler = () => {
        if(!isTextMessage){
            return
        }
        submitHandler()
    }
    return (
        <KeyboardAvoidingView behavior={Platform.OS === "android" ? "padding" : "height"} style={styles.keyview}>
            <View style={styles.textInputCont}>
                <TextInput
                    mode="flat"
                    multiline
                    numberOfLines={5}
                    selectionColor={theme.colors.primary}
                    textAlignVertical="center"
                    textBreakStrategy="balanced"
                    style={styles.textInput}
                    placeholder="Type in a message"
                    returnKeyType="send"
                    // returnKeyLabel="Send"
                    value={messageText}
                    onChangeText={onTextChange}
                    left={<TextInput.Icon name="emoticon" onPress={toggleEmoji} color={theme.colors.primary} />}
                    right={<TextInput.Icon name="attachment" onPress={showOtherMessageType} color={theme.colors.primary} />}
                />
                <IconButton
                    icon={isTextMessage ? "send" : "microphone"}
                    color="white"
                    style={{ backgroundColor: theme.colors.primary }}
                    onPress={onSubmitHandler}
                    size={30}
                    accessibilityLabel="Send"
                    animated={true}
                />
            </View>
            {/* <EmojiBoard 
                onClick={emoji => console.log(emoji)}
            /> */}
        </KeyboardAvoidingView>
    );
};
const styles = StyleSheet.create({
    keyview: {
        flex: 1,
        height: Dimensions.get("window").height,
        justifyContent: "flex-end",
    },
    textInputCont: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },
    textInput: {
        // flex: 1,
        width: "85%",
        justifyContent: "center",
        alignItems: "flex-start",
        borderRadius: 30,
        borderTopRightRadius: 30,
        borderTopLeftRadius: 30,
        fontSize: 20,
        // alignContent: "center",
        // flexDirection: "column",
    },
    emojiCont: {
        flex: 1
    }
})
export default ChatBottom;