import React from 'react';
import {SafeAreaProvider} from "react-native-safe-area-context"
import { Provider } from 'react-native-paper';
import BottomNavbar from './Navigators/BottomNavbar';


export default function App1() {

  return (
    <Provider>
      <SafeAreaProvider>
        <BottomNavbar />
      </SafeAreaProvider>
    </Provider>

  );
}


