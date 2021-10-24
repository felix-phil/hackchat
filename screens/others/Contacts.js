import React, { useCallback, useEffect, useState } from 'react'
import { StyleSheet, FlatList } from 'react-native'
import { Avatar, IconButton, List, useTheme } from 'react-native-paper'
import { useSelector, useDispatch } from "react-redux"
import AContact from '../../components/contact/AContact'
import PageActivity from '../../components/utils/PageActivity'
import * as contactActions from "../../store/actions/contacts"
import * as messageActions from "../../store/actions/messages"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import { addContact } from '../../constants/linking'

const ContactScreen = ({ navigation, route }) => {
    const contacts = useSelector(state => state.contact.filteredContacts)
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)
    const theme = useTheme()
    const fetchContacts = useCallback(
        async () => {
            // setLoading(true)
            try {
                await dispatch(contactActions.setContacts())
            } catch (error) {
                dispatch(messageActions.setMessage(error.message, "error"))
            }
            // setLoading(false)
        },
        [dispatch, setLoading],
    )
    useEffect(() => {
        fetchContacts()
    }, [fetchContacts])

    const onSearchValueChange = (value) => {
        dispatch(contactActions.filterContact(value))
    }
    useEffect(() => {
        navigation.setOptions({
            onHeaderSearchValueChange: onSearchValueChange,
            headerSubtitle: contacts ? contacts.length + " contacts" : ""
        })
    }, [])
    const toChat = (contact) => {
        navigation.navigate('ChatScreen', { phone: contact.phoneNumber, contact: contact })
    }
    const handleShowImage = (contact) => {
        dispatch(contactActions.showPortalImage(contact, route.name, {
            functionToHandleChat: toChat.bind(this, contact)
        }))
    }
    const addNewContact = async() => {
        try{
            // Do this after ejecting
            await addContact()
        }catch(err){
            console.log(err)
        }
    }
    if (loading) {
        return <PageActivity />
    }
    return (
        <React.Fragment>
            <List.Item
                title="New group"
                left={prop => <Avatar.Icon size={50} icon="account-multiple" color="white" />}
            />
            <List.Item
                title="New contact"
                left={prop => <Avatar.Icon size={50} icon="account" color="white" />}
                onPress={addNewContact}
                right={prop => <IconButton
                    size={25}
                    onPress={() => { }}
                    icon={({ color, size }) => <MaterialCommunityIcons name="qrcode-scan" size={size} color={color} />}
                />}

            />
            <FlatList data={contacts} keyExtractor={item => item.id.toString()} renderItem={item =>
                <AContact contact={item.item}
                    handlePress={toChat.bind(this, item.item)}
                    handleShowImage={handleShowImage.bind(this, item.item)}
                />
            } />
        </React.Fragment>
    )
}

export default ContactScreen

const styles = StyleSheet.create({})
