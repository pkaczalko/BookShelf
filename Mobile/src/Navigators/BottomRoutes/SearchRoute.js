import React from "react";
import { SafeAreaView,  } from "react-native";
import SearchBooks from "../../SearchBooks/SearchBooks";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {CardStyleInterpolators} from '@react-navigation/stack'
import BookPreview from "../../SearchBooks/BookPreview";

export default function SearchRoute(){
    const Stack = createNativeStackNavigator();
    const SearchBooksRoute = () => <SearchBooks />
    const BookPreviewRoute = () => <BookPreview />
    return (
        <SafeAreaView style={{flex:1}}>
            <Stack.Navigator screenOptions={{gestureEnabled:true, gestureDirection:'horizontal', CardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS}}
                         headerMode="float" animation="fade" initialRouteName='addMenu'> 
            <Stack.Screen
                name="searchBooks"
                component={SearchBooksRoute}
                options={{title: 'Wyszukaj książkę',}}
            />
            <Stack.Screen
                name="bookPreview"
                component={BookPreviewRoute}
                options={{title: 'Podgląd',}}
            />
            </Stack.Navigator>
    </SafeAreaView>
    )
}