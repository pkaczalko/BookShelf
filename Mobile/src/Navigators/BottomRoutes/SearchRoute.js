import React from "react";
import { SafeAreaView,  } from "react-native";
import SearchBooks from "../../SearchBooks/SearchBooks";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {CardStyleInterpolators} from '@react-navigation/stack'

export default function SearchRoute(){
    const Stack = createNativeStackNavigator();
    const SearchBooksRoute = () => <SearchBooks />
    return (
        <SafeAreaView style={{flex:1}}>
            <Stack.Navigator screenOptions={{gestureEnabled:true, gestureDirection:'horizontal', CardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS}}
                         headerMode="float" animation="fade" initialRouteName='addMenu'> 
            <Stack.Screen
                name="searchBooks"
                component={SearchBooksRoute}
                options={{title: 'Wyszukaj książkę',}}
            />
            </Stack.Navigator>
    </SafeAreaView>
    )
}