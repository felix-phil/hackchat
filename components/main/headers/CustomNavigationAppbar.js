import React, { useEffect, useState, useCallback } from "react"
import { Appbar, Menu, TextInput, useTheme, } from "react-native-paper"
import { View, StyleSheet, BackHandler } from "react-native"
import { MaterialIcons } from '@expo/vector-icons';
import { useDispatch } from "react-redux";
import * as authActions from "../../../store/actions/auth";
import * as contactActions from "../../../store/actions/contacts";
import * as msgActions from "../../../store/actions/messages";
import { openContacts, openWebUrl, shareText } from "../../../constants/linking";

const CustomAppbar = ({ navigation, options, route, searchOption, otherOptions }) => {
    const previous = navigation.canGoBack()
    const [visible, setVisible] = useState(false)
    const [searchField, setSearchField] = useState(false)
    const [searchValue, setSearchValue] = useState("")
    const dispatch = useDispatch()
    const theme = useTheme();
    const searchSubmitExecutor = options && options.onHeaderSearch ? options.onHeaderSearch : () => { }
    const searchValueChangeExecutor = options && options.onHeaderSearchValueChange ? options.onHeaderSearchValueChange : () => { }
    const openMenu = () => setVisible(true);
    const closeMenu = () => setVisible(false);

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
    const inviteFriend = async() => {
        try{
            await shareText("We can use HackChat to messsage and call each other for free. Download at https://hackchat.com/download/", 
            { title: "Invite a friend via...", url: "https://hackchat.com/download/" });
        }catch(err){
            dispatch(msgActions.setMessage(err.message, "error"))
        }
    }
    const openContactApp = async() => {
        try{
            await openContacts()
        }
        catch(err){
            dispatch(msgActions.setMessage(err.message, "error"))
        }
    }
    return (
        <Appbar.Header>
            {previous && !searchField && <Appbar.BackAction onPress={() => {
                navigation.goBack()
            }} />}
            {!searchField && <Appbar.Content title={options.headerTitle} subtitle={options.headerSubtitle} />}
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
                            onPress={() => { closeSearchField(); setSearchValue("") }} />}
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
            {!searchField && searchOption && <Appbar.Action icon={({ size, color }) => (<MaterialIcons name="search" size={size} color={color} />)} color="white" onPress={openSearchField} size={20} />}
            {!searchField && otherOptions && (
                <Menu
                    visible={visible}
                    onDismiss={closeMenu}
                    anchor={
                        <Appbar.Action icon="dots-vertical" color="white" onPress={openMenu} size={20} />
                    }>
                    {
                        route.name === "Contacts" &&
                        <>
                            <Menu.Item onPress={async () => {
                                closeMenu();
                                inviteFriend()
                            }} title="Invite a friend" />
                            <Menu.Item onPress={async() => {
                                closeMenu();
                                openContactApp()
                            }} title="Contacts" />
                            <Menu.Item onPress={async () => {
                                closeMenu();
                                try {
                                    await dispatch(authActions.syncContacts());
                                    await dispatch(contactActions.setContacts())
                                } catch (err) {
                                    dispatch(msgActions.setMessage(err.message, "error"))
                                    console.log(err)
                                }
                            }} title="Refresh" />
                            <Menu.Item onPress={() => { openWebUrl('https://hackchat.com/help'); closeMenu(); }} title="Help" />
                        </>
                    }
                    {
                        route.name == "HackChat" &&
                        <React.Fragment>
                            <Menu.Item onPress={() => { console.log('Option 1 was pressed'); closeMenu(); }} title="Option 1" />
                            <Menu.Item onPress={() => { console.log('Option 2 was pressed'); closeMenu(); }} title="Option 2" />
                            <Menu.Item onPress={() => { console.log('Option 3 was pressed'); closeMenu(); }} title="Option 3" disabled />
                        </React.Fragment>
                    }
                </Menu>
            )}
        </Appbar.Header>
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
export default CustomAppbar