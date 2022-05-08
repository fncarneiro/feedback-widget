import 'react-native-gesture-handler';
import { LogBox } from 'react-native';

import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';

import Widget from './src/components/Widget';
import { theme } from './src/theme';
import { useCallback, useEffect, useState } from 'react';

LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you\'re using an old API with gesture components, check out new Gestures system!",
]);

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);

  const customFonts = {
    'Inter_400Regular': 'https://rsms.me/inter/font-files/Inter_400Regular.otf?v=3.12',
    'Inter_500Medium': 'https://rsms.me/inter/font-files/Inter_500Medium.otf?v=3.12',
  };

  useEffect(() => {
    async function prepare() {
      try {
        await SplashScreen.preventAutoHideAsync();
        await Font.loadAsync(customFonts);

      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme.colors.background,
      }}
      onLayout={onLayoutRootView}
    >
      <StatusBar
        style="light"
        backgroundColor="transparent"
        translucent
      />

      <Widget />
    </View>
  );
}

