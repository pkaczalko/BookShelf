import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';

import Add from './BottomRoutes/AddRoute';
import HomeRoute from './BottomRoutes/HomeRoute';
import BookPreview from './BottomRoutes/BookPreviewRoute';
import Login from '../Login/Login';

export default function BottomNavbar(){
    const Stack = createStackNavigator();
    
    return(
        <NavigationContainer>

            <Stack.Navigator>
                <Stack.Screen
                    name="login"
                    component={Login}
                    options={{headerShown: false}}
                />
                <Stack.Screen
                    name="home"
                    component={HomeRoute}
                    options={{headerShown: false}}
                />
                <Stack.Screen
                    name="bookPreview"
                    component={BookPreview}
                    options={{title: 'Podgląd', headerShown: false}}
                />
                <Stack.Screen
                    name="add"
                    component={Add}
                    options={{title: 'Dodawanie', headerShown: false}}
                />
            </Stack.Navigator>
        </NavigationContainer>
)}