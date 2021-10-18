import React, { useState } from 'react';
import { BottomNavigation, IconButton, Text, TextInput, useTheme } from 'react-native-paper';
import { View, StyleSheet, Dimensions, KeyboardAvoidingView, Platform, ToastAndroid } from "react-native"

const ChatBottom = ({ showOtherMessageType }) => {
    // const [index, setIndex] = useState(0);
    const theme = useTheme()
    const [emoji, setEmoji] = useState(false)
    const enterKey = "send"
    const toggleEmoji = () => {
        ToastAndroid.show('Coming Soon', ToastAndroid.SHORT)
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
                    left={<TextInput.Icon name="emoticon" onPress={toggleEmoji} color={theme.colors.primary} />}
                    right={<TextInput.Icon name="attachment" onPress={showOtherMessageType} color={theme.colors.primary} />}
                />
                <IconButton
                    icon="send"
                    color="white"
                    style={{ backgroundColor: theme.colors.primary, padding: 10 }} onPress={() => { }} size={30}
                />
            </View>
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