import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import AddMenu from '../Add/AddMenu';
import {NavigationContainer} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import BottomSheet from '../Components/BottomSheet';
import SetTabBar from './Components/SetTabBar';

import SettingsRoute from './BottomRoutes/SettingsRoute';
import WishListRoute from './BottomRoutes/WishListRoute';
import SearchRoute from './BottomRoutes/SearchRoute';
import AddRoute from './BottomRoutes/AddRoute';
import HomeRoute from './BottomRoutes/HomeRoute';
import BookPreview from './BottomRoutes/BookPreviewRoute';

export default function BottomNavbar(){
    const Stack = createStackNavigator();
    
    return(
        <NavigationContainer>

            <Stack.Navigator>
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
            </Stack.Navigator>
        </NavigationContainer>
)}