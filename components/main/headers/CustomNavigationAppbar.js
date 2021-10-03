import React, { useState } from "react"
import { Appbar, Menu, TextInput, useTheme, } from "react-native-paper"
import { View, StyleSheet } from "react-native"
import { MaterialIcons } from '@expo/vector-icons';
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import * as authActions from "../../../store/actions/auth";
import * as contactActions from "../../../store/actions/contacts";
import * as msgActions from "../../../store/actions/messages";

const CustomAppbar = ({ navigation, options, route }) => {
    const previous = navigation.canGoBack()
    const [visible, setVisible] = useState(false)
    const [searchField, setSearchField] = useState(false)
    const [searchValue, setSearchValue] = useState("")
    const routeName = getFocusedRouteNameFromRoute(route)
    const dispatch = useDispatch()
    const theme = useTheme();

    const openMenu = () => setVisible(true);
    const closeMenu = () => setVisible(false);

    const openSearchField = () => setSearchField(true)
    const closeSearchField = () => setSearchField(false)

    const onSubmitHandler = () => {
        console.log(searchValue)
        setSearchField(false)
    }
    return (
        <Appbar.Header>
            {previous ? <Appbar.BackAction onPress={navigation.goBack} /> : null}
            {!searchField && <Appbar.Content title={options.headerTitle} />}
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
                        returnKeyType="search"
                        onChangeText={(text) => setSearchValue(text)}
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
            {!searchField && <Appbar.Action icon={({ size, color, direction }) => (<MaterialIcons name="search" size={size} color={color} />)} color="white" onPress={openSearchField} size={20} />}
            {!searchField ? (
                <Menu
                    visible={visible}
                    onDismiss={closeMenu}
                    anchor={
                        <Appbar.Action icon="dots-vertical" color="white" onPress={openMenu} size={20} />
                    }>
                    {
                        route.name === "Contacts" &&
                        <>
                            <Menu.Item onPress={() => { console.log('Invite was pressed'); closeMenu(); }} title="Invite a friend" />
                            <Menu.Item onPress={() => { console.log('Contacts was pressed'); closeMenu(); }} title="Contacts" />
                            <Menu.Item onPress={async() => {
                                closeMenu();
                                try{
                                    await dispatch(authActions.syncContacts());
                                    await dispatch(contactActions.setContacts())
                                }catch(err){
                                    dispatch(msgActions.setMessage(err.message, "error"))
                                    console.log(err)
                                }
                            }} title="Refresh" />
                            <Menu.Item onPress={() => { console.log('Help was pressed'); closeMenu(); }} title="Help" />
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
            ) : null}
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