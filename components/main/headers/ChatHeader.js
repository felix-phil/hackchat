import React, { useEffect, useState } from "react"
import { Appbar, Menu, TextInput, useTheme, Avatar, TouchableRipple, IconButton } from "react-native-paper"
import { View, StyleSheet, Dimensions, Text } from "react-native"
import { useDispatch } from "react-redux";
import * as authActions from "../../../store/actions/auth";
import * as contactActions from "../../../store/actions/contacts";
import * as msgActions from "../../../store/actions/messages";
import { host } from "../../../constants/endpoints";

const ChatHeader = ({ navigation, options, route }) => {
    const previous = navigation.canGoBack()
    const [visible, setVisible] = useState(false)
    const [moreVisible, setMoreVisible] = useState(false)
    const [searchField, setSearchField] = useState(false)
    const [searchValue, setSearchValue] = useState("")
    const dispatch = useDispatch()
    const theme = useTheme();
    const searchSubmitExecutor = options && options.onHeaderSearch ? options.onHeaderSearch : () => { }
    const searchValueChangeExecutor = options && options.onHeaderSearchValueChange ? options.onHeaderSearchValueChange : () => { }
    const contact = options && options.contact ? options.contact : null

    const openMenu = () => setVisible(true);
    const closeMenu = () => setVisible(false);

    const openMoreMenu = () => setMoreVisible(true);
    const closeMoreMenu = () => setMoreVisible(false);

    const openSearchField = () => setSearchField(true)
    const closeSearchField = () => setSearchField(false)

    useEffect(() => {
        navigation.addListener('beforeRemove', (e) => {
            if (!searchField) {
                return
            }
            e.preventDefault()
            setSearchField(false)
        })
        return () => {
            navigation.removeListener('beforeRemove')
        }
    }, [navigation, searchField, setSearchField])

    const onSubmitHandler = () => {
        searchSubmitExecutor(searchValue)
        setSearchField(false)
    }
    const onChangeTextHandler = (text) => {
        setSearchValue(text)
        searchValueChangeExecutor(text)
    }
    return (
        <Appbar.Header>
                {
                    previous && !searchField &&
                    <Appbar.BackAction color="white" onPress={()=> navigation.goBack()} />
                }
                {
                    !searchField &&
                    <Appbar.Action icon={({ size, color }) => <Avatar.Image size={size} source={{ uri: host + options.avatarImageUrl }} />
                    } color="white" size={35} />
                }

            {!searchField && <Appbar.Content title={options.headerTitle} subtitle={options.headerSubtitle} onPress={() => console.log('View full profile')} />}
            {searchField &&
                <View style={styles.textInpCont}>
                    <TextInput value={searchValue}
                        mode="flat"
                        underlineColor="transparent"
                        selectionColor={theme.colors.surface}
                        placeholder="Type anything..."
                        placeholderTextColor="#ccc"
                        theme={{
                            colors: { text: "white" }
                        }}
                        autoFocus={true}
                        focusable={searchField}
                        returnKeyType="search"
                        onChangeText={onChangeTextHandler}
                        style={styles.textInp}
                        left={<TextInput.Icon
                            name="arrow-left"
                            color="white"
                            size={24}
                            onPress={closeSearchField} />}
                        right={<TextInput.Icon
                            color="white"
                            name="close"
                            size={24}
                            onPress={() => setSearchValue("")}
                        />}
                        onEndEditing={onSubmitHandler}
                    />
                </View>
            }
            {!searchField && <Appbar.Action icon="video" color="white" onPress={() => { console.log('handle video') }} size={20} />}
            {!searchField && <Appbar.Action icon="phone" color="white" onPress={() => { console.log('handle call') }} size={20} />}
            {!searchField && (
                <Menu
                    visible={visible}
                    onDismiss={closeMenu}
                    anchor={
                        <Appbar.Action icon="dots-vertical" color="white" onPress={openMenu} size={20} />
                    }>

                    {
                        contact && contact.name ?
                            <Menu.Item onPress={() => { console.log('Invite was pressed'); closeMenu(); }} title="View contact" />
                            :
                            <Menu.Item onPress={() => { console.log('Handle Media'); closeMenu(); }} title="Add to contacts" />
                    }
                    <Menu.Item onPress={() => { console.log('Handle Media'); closeMenu(); }} title="Media, links and doc" />
                    <Menu.Item onPress={() => { openSearchField(); closeMenu(); }} title="Search" />
                    <Menu.Item onPress={() => { console.log('Handle Mute'); closeMenu(); }} title="Mute notifications" />
                    <Menu.Item onPress={() => { console.log('Handle Wallpaper'); closeMenu(); }} title="Wallpaper" />
                    <Menu.Item onPress={() => { closeMenu(); openMoreMenu(); }} title="More" icon="menu-right" />
                </Menu>
            )
            }
            {!searchField && <Menu
                visible={moreVisible}
                onDismiss={closeMoreMenu}
                anchor={{ x: Dimensions.get('screen').width - 2, y: (5 / 100) * Dimensions.get('screen').height }}
            >
                <Menu.Item onPress={() => { console.log('Handle Report'); closeMoreMenu(); }} title="Report" />
                <Menu.Item onPress={() => { console.log('Handle Block'); closeMoreMenu(); }} title="Block" />
                <Menu.Item onPress={() => { console.log('Handle Clear chat'); closeMoreMenu(); }} title="Clear chat" />
                <Menu.Item onPress={() => { console.log('Handle Export chat'); closeMoreMenu(); }} title="Export chat" />
                <Menu.Item onPress={() => { console.log('Handle Add Shortcut'); closeMoreMenu(); }} title="Add shortcut" />
            </Menu>}
        </Appbar.Header >
    )
}
const styles = StyleSheet.create({
    textInp: {
        // flex: 1,
        width: "100%",
        height: 40,
        backgroundColor: "transparent",
        color: "white",
        // borderBottomColor: "white"
    },
    textInpCont: {
        width: "100%",
        justifyContent: "center",
        alignItems: "center"
    }
})
export default ChatHeader