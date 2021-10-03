import React, { useCallback, useEffect, useState } from 'react'
import { StyleSheet, FlatList } from 'react-native'
import { useSelector, useDispatch } from "react-redux"
import AContact from '../../components/contact/AContact'
import PageActivity from '../../components/utils/PageActivity'
import * as contactActions from "../../store/actions/contacts"
import * as messageActions from "../../store/actions/messages"

const ContactScreen = ({ route }) => {
    const contacts = useSelector(state => state.contact.contacts)
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)

    const fetchContacts = useCallback(
        async () => {
            setLoading(true)
            try {
                await dispatch(contactActions.setContacts())
            } catch (error) {
                dispatch(messageActions.setMessage(error.message, "error"))
            }
            setLoading(false)
        },
        [dispatch, setLoading],
    )
    useEffect(() => {
        fetchContacts()
    }, [fetchContacts])
    const handleShowImage = (contact) => {
        dispatch(contactActions.showPortalImage(contact, route.name))
    }
    if (loading) {
        return <PageActivity />
    }
    return (
        <FlatList data={contacts} keyExtractor={item => item.id.toString()} renderItem={item =>
            <AContact contact={item.item}
                handleShowImage={handleShowImage.bind(this, item.item)} />
        } />
    )
}

export default ContactScreen

const styles = StyleSheet.create({})
