import React from 'react';
import {SafeAreaProvider} from "react-native-safe-area-context"
import BottomNavbar from './Navigators/BottomNavbar';


export default function App1() {

  return (
      <SafeAreaProvider>
        <BottomNavbar />
      </SafeAreaProvider>
  );
}


