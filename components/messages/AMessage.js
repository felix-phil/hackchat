import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import { useTheme, Colors } from 'react-native-paper';
import {
  formatDate,
  getMessageStatusFontNameAndColor,
} from '../../constants/easy_functions';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

const AMessage = ({
  message,
  selectionMode,
  setSelectionMode,
  selectedMessages,
  setSelectedMessages,
}) => {
  const theme = useTheme();
  const authPhone = useSelector((state) => state.auth.phone);
  // const authPhone = "+2348171551089"
  const [selected, setSelected] = useState(false);

  const handleLongPress = (message) => {
    if (!selectionMode) {
      setSelectionMode(true);
    }
    handlePress(message);
  };
  const handlePress = (message) => {
    if (!selectionMode) {
      return;
    }
    let result;
    if (selected) {
      const previousSelectedMessages = [...selectedMessages];
      const theMessageIndex = previousSelectedMessages.findIndex(
        (msg) => msg.id === message.id
      );
      delete previousSelectedMessages[theMessageIndex];
      setSelectedMessages(previousSelectedMessages);
      result = false;
    } else {
      setSelectedMessages((prev) => [...prev, message]);
      result = true;
    }
    setSelected(result);
    if (selectedMessages.length < 1) {
      setSelectionMode(false);
    }
    console.log(selectedMessages);
  };
  return (
    <TouchableWithoutFeedback
      style={{
        backgroundColor: selected ? '#ccc' : 'transparent',
        marginVertical: 5,
      }}
      onLongPress={handleLongPress.bind(this, message)}
      onPress={handlePress.bind(this, message)}
    >
      <View
        style={{
          ...styles.msgCont,
          alignSelf: authPhone === message.from ? 'flex-end' : 'flex-start',
        }}
      >
        <View
          style={{
            ...styles.msgheader,
            backgroundColor:
              authPhone === message.from
                ? theme.colors.primary
                : theme.mode === 'adaptive'
                ? theme.colors.surface
                : Colors.blueGrey500,
            borderTopLeftRadius: authPhone === message.from ? 10 : null,
            borderBottomRightRadius: authPhone === message.from ? 10 : null,
            borderTopEndRadius: authPhone === message.from ? null : 10,
            borderBottomLeftRadius: authPhone === message.from ? null : 10,
          }}
        ></View>
        <View
          style={{
            ...styles.msgBody,
            backgroundColor:
              authPhone === message.from
                ? theme.colors.primary
                : theme.mode === 'adaptive'
                ? theme.colors.surface
                : Colors.blueGrey500,
            alignSelf: authPhone === message.from ? 'flex-start' : 'flex-end',
            borderTopStartRadius: authPhone === message.from ? 10 : 0,
          }}
        >
          <Text
            style={{ ...styles.msg, fontSize: 16 }}
            selectable={true}
            selectionColor={theme.colors.placeholder}
          >
            {message.message}
          </Text>
          <View style={styles.report}>
            <Text style={{ ...styles.msg, ...styles.reportText }}>
              {formatDate(message.date)}
            </Text>
            <Text>{''}</Text>
            {authPhone === message.from && (
              <MaterialCommunityIcons
                name={getMessageStatusFontNameAndColor(message.status).name}
                size={13}
                color={getMessageStatusFontNameAndColor(message.status).color}
              />
            )}
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default AMessage;

const styles = StyleSheet.create({
  msgCont: {
    width: '60%',
    marginHorizontal: 10,
    marginVertical: 7,
    paddingHorizontal: 1,
    backgroundColor: 'transparent',
    position: 'relative',
  },
  msgheader: {
    flex: 1,
    height: 10,
    width: '100%',
    // borderTopWidth: 0,
    bottom: -7,
    zIndex: 0,
  },
  msgBody: {
    width: '98%',
    borderRadius: 10,
    borderTopRightRadius: 10,
    // alignSelf: "flex-end"
  },
  report: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginHorizontal: 5,
    // justifyContent: "space-between"
  },
  msg: {
    color: 'white',
    marginHorizontal: 5,
  },
  reportText: {
    fontSize: 13,
  },
});
