import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import {
  Avatar,
  List,
  TouchableRipple,
  Text,
  Badge,
  useTheme,
} from 'react-native-paper';
import { formatDate } from '../../constants/easy_functions';
import { host } from '../../constants/endpoints';

const AChat = (props) => {
  const theme = useTheme();
  return (
    <List.Item
      title={props.chat.recipientName || props.chat.recipientNumber}
      titleStyle={{ fontWeight: 'bold', paddingLeft: 5 }}
      description={props.chat.lastMessageText}
      descriptionStyle={{ paddingLeft: 10 }}
      onPress={props.handlePress}
      right={(prop) => (
        <View style={{ justifyContent: 'space-between' }}>
          <Text
            style={{
              color:
                props.chat.unreadMessageCount > 0
                  ? theme.colors.primary
                  : theme.colors.text,
            }}
          >
            {formatDate(props.chat.lastMessageDate)}
          </Text>
          {props.chat.unreadMessageCount > 0 && (
            <Badge
              visible={true}
              theme={theme}
              style={{ backgroundColor: theme.colors.primary }}
            >
              {props.chat.unreadMessageCount}
            </Badge>
          )}
        </View>
      )}
      left={(prop) => (
        <TouchableRipple borderless onPress={props.handleShowImage}>
          <Avatar.Image
            size={50}
            source={{ uri: host + props.chat.recipientImage }}
          />
        </TouchableRipple>
      )}
    />
  );
};

export default AChat;

const styles = StyleSheet.create({});
