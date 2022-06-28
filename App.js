import React, { useEffect, useCallback } from 'react';
import { StyleSheet, LogBox } from 'react-native';
import { Provider as StoreProvider } from "react-redux";
import store from "./store/store"
import { Provider as PaperProvider, DarkTheme as PaperDarkTheme, DefaultTheme as PaperDefaultTheme } from 'react-native-paper';
import NavContainer from "./navigations/NavigationContainer";
import { NavigationContainer, DarkTheme, DefaultTheme } from '@react-navigation/native';
import merge from "deepmerge";

import { PreferencesContext } from './constants/PreferencesContext';
import Contact from "./models/contacts"
import Chat from "./models/chat"
import Message from './models/message';
import { dropTable } from './helpers/db';
// import { deleteAllObjects } from './helpers/realmdb';
// import { init, getRealm } from './helpers/realmdb';

export default function App() {
  const [isThemeDark, setIsThemeDark] = React.useState(false);
  const CombinedDefaultTheme = merge({
    ...PaperDefaultTheme,
    colors: {
      ...PaperDefaultTheme.colors,
      primary: "#9013FE"
    }

  }, {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: "#9013FE"
    }

  });
  const CombinedDarkTheme = merge({
    ...PaperDarkTheme,
  }, {
    ...DarkTheme
  });

  let theme = isThemeDark ? CombinedDarkTheme : CombinedDefaultTheme;


  const toggleTheme = React.useCallback(() => {
    return setIsThemeDark(!isThemeDark);
  }, [isThemeDark]);

  const preferences = React.useMemo(
    () => ({
      toggleTheme,
      isThemeDark,
    }),
    [toggleTheme, isThemeDark]
  );

  const prepareDatabases = useCallback(
    async() => {
      try {
        await Contact.init()
        await Chat.init()
        await Message.init()
        const d = new Date()
        // console.log(new Date(d.setDate(d.getDate()-1)).toISOString())
        // await dropTable('chat')
        // const newChat = new Chat({
        //   creator: "+2349064462188",
        //   recipientName: "My Sister",
        //   recipientNumber: "+2348063778054",
        //   roomId: "616741f8d7bed06de11ed2a7",
        //   lastMessageText: "Hello",
        //   lastMessageId: 1,
        //   lastMessageDate: new Date().toISOString(),
        //   unreadMessageCount: 1,
        //   recipientImage: "/profile_images/default.png",
        // })
        // await newChat.save()
      } catch (err) {
        console.log(err)
      }
    },
    [],
  )
    useEffect(() => {
      prepareDatabases()
    }, [prepareDatabases])
  useEffect(() => {
    LogBox.ignoreLogs(["[expo-notifications]", "Setting a timer"])
    // deleteAllObjects()
  }, [])

  return (
    <PreferencesContext.Provider value={preferences}>
      <StoreProvider store={store}>
        <PaperProvider theme={theme}>
          <NavigationContainer theme={theme}>
            <NavContainer />
          </NavigationContainer>
        </PaperProvider>
      </StoreProvider>
    </PreferencesContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
