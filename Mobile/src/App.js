import React from 'react';
import App from './BottomNavbar/BottomNavbar';
import {SafeAreaProvider} from "react-native-safe-area-context"
import { GestureHandlerRootView } from 'react-native-gesture-handler'


export default function App1() {

  return (
    <GestureHandlerRootView style={{flex:1}}>

      <SafeAreaProvider>
        <App />
      </SafeAreaProvider>

    </GestureHandlerRootView>

  );
}


