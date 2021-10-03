import React, { useEffect } from 'react';
import { StyleSheet, Text, View, LogBox } from 'react-native';
import { Provider as StoreProvider } from "react-redux";
import store from "./store/store"
import { Provider as PaperProvider, DarkTheme as PaperDarkTheme, DefaultTheme as PaperDefaultTheme } from 'react-native-paper';
import NavContainer from "./navigations/NavigationContainer";
import { NavigationContainer, DarkTheme, DefaultTheme } from '@react-navigation/native';
import merge from "deepmerge";
import { PreferencesContext } from './constants/PreferencesContext';
import Contact from "./models/contacts"

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
  const CombinedDarkTheme = merge(PaperDarkTheme, DarkTheme);

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

  useEffect(() => {
    LogBox.ignoreLogs(["[expo-notifications]", "Setting a timer"])
    Contact.init().then(() => {
      console.log("Contact DB initialized successfully")
    }).catch(err => {
      console.log(err)
    })
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
