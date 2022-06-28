import React, { useEffect, useState, useCallback } from 'react';
import { StyleSheet, FlatList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Badge, useTheme } from 'react-native-paper';
import * as chatActions from '../../store/actions/chat';
import * as contactActions from '../../store/actions/contacts';
import AChat from '../../components/chat/AChat';

const HomeTab = ({ navigation, route }) => {
  const chats = useSelector((state) => state.chat.filteredChats);
  const theme = useTheme();
  const chatsWithUnread = chats.filter((ch) => ch.unreadMessageCount > 0);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(chatActions.fetchOfflineActions());
  }, [dispatch]);

  const displayChat = useCallback(async () => {
    try {
      await dispatch(chatActions.setChats());
    } catch (err) {
      console.log(err);
    }
  }, [dispatch]);
  const onSearchValueChange = (value) => {
    dispatch(chatActions.filterChats(value));
  };

  useEffect(() => {
    navigation.setOptions({
      tabBarBadge: () => (
        <Badge
          visible={chatsWithUnread.length > 0 ? true : false}
          theme={theme}
          style={{ backgroundColor: theme.colors.primary }}
        >
          {chatsWithUnread.length}
        </Badge>
      ),
    });
  }, [chats]);
  useEffect(() => {
    navigation.getParent().setOptions({
      onHeaderSearchValueChange: onSearchValueChange,
    });
  }, []);

  const toChat = (chat) => {
    const contact = {
      imageUrl: chat.recipientImage,
      name: chat.recipientName,
      phone: chat.recipientNumber,
    };
    navigation.navigate('ChatScreen', {
      phone: chat.recipientNumber,
      contact: contact,
      roomId: chat.roomId,
    });
  };
  const handleShowImage = (chat) => {
    const contact = {
      imageUrl: chat.recipientImage,
      name: chat.recipientName,
      phone: chat.recipientNumber,
    };
    dispatch(
      contactActions.showPortalImage(contact, route.name, {
        functionToHandleChat: toChat.bind(this, contact),
      })
    );
  };
  // useEffect(() => {
  //         displayChat()
  // }, [displayChat])

  return (
    <FlatList
      data={chats}
      keyExtractor={(item, index) => index.toString()}
      renderItem={(itemData) => (
        <AChat
          chat={itemData.item}
          // {...itemData.item}
          handlePress={toChat.bind(this, itemData.item)}
          handleShowImage={handleShowImage.bind(this, itemData.item)}
        />
      )}
    />
  );
};
const styles = StyleSheet.create({});
export default HomeTab;
