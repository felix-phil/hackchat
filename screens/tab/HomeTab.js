import React, { useEffect, useState, useCallback } from 'react';
import { View, StyleSheet, FlatList, VirtualizedList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import * as socket from "../../helpers/socket"
import { Button, TextInput, Text, List } from "react-native-paper"
import * as chatActions from "../../store/actions/chat"

const HomeTab = ({ navigation, options }) => {
        const [destination, setDestination] = useState({ message: "", to: "" })
        const phone = useSelector(state => state.auth.phone)
        // const Socket = socket.getScoket()
        const [messages, setMessages] = useState([])
        const chats = useSelector(state => state.chat.filteredChats)
        const dispatch = useDispatch()

        const displayChat = useCallback(
                async () => {

                        try {
                                await dispatch(chatActions.setChats())
                        } catch (err) {
                                console.log(err)
                        }
                },
                [dispatch],
        )
        const onSearchValueChange = (value) => {
                dispatch(chatActions.filterChats(value))
        }

        useEffect(() => {
                navigation.getParent().setOptions({
                        onHeaderSearchValueChange: onSearchValueChange
                })
        }, [])
        // console.log(options)
        useEffect(() => {
                displayChat()
        }, [displayChat])

        return (
                <FlatList data={chats} keyExtractor={item => item.id} renderItem={itemData => (
                        <List.Item title={itemData.item.recipientName || itemData.item.recipientNumber}
                                description={itemData.item.lastMessageText}
                                onPress={() => { }}

                        />
                )} />
        )
}
const styles = StyleSheet.create({})
export default HomeTab
