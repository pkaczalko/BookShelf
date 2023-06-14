import React from "react";
import { Text } from "react-native";
import Profile from "../../Profile/Profile";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator()

export default function SettingsRoute(){
    const ProfileRoute = () => <Profile />
    
    return(
        <Stack.Navigator screenOptions={{gestureEnabled:false}}
                         headerMode="float" animation="fade"> 
            <Stack.Screen
                name="addMenu"
                component={ProfileRoute}
                options={{title: 'Mój Profil',}}
            />
        </Stack.Navigator>
    )
}