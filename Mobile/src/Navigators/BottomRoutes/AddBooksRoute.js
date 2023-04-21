import React from "react"
import AddBookManually from "../../AddBook/AddBookManually"
import AddBookMenu from "../../AddBook/AddBookMenu"
import AddBookViaISBN from "../../AddBook/AddBookViaISBN"
import AddShelf from "../../AddBook/AddShelf"
import AddCamera from "../../AddBook/Camera/AddCamera"
import BookPreview from "../../AddBook/BookPreview"
import { createNativeStackNavigator } from "@react-navigation/native-stack"

export default function AddBooksRoute(){
    const Stack = createNativeStackNavigator();
    
    const AddBookMenuRoute = () => <AddBookMenu />
    const AddByHandRoute = () => <AddBookManually />
    const AddBookViaISBNRoute = () => <AddBookViaISBN />
    const AddShelfRoute = () => <AddShelf />
    const AddCameraRoute = () => <AddCamera />
    const BookPreviewRoute = () => <BookPreview />

    return(
        // ogarnac te screenoptions bo nie dziala
        <Stack.Navigator screenOptions={{gestureEnabled:false}}
                         headerMode="float" animation="fade"> 
            <Stack.Screen
                name="addMenu"
                component={AddBookMenuRoute}
                options={{title: 'Dodaj Nowe',}}
            />
             <Stack.Screen
                name="addBookManually"
                component={AddByHandRoute}
                options={{title: 'Dodaj Książkę Ręcznie',}}
            />
             <Stack.Screen
                name="addBookViaISBN"
                component={AddBookViaISBNRoute}
                options={{title: 'Dodaj Książkę przez ISBN',}}
            />
             <Stack.Screen
                name="addShelf"
                component={AddShelfRoute}
                initialParams={{ uri: null }}
                options={{title: 'Dodaj Nową Półkę',}}
            />
             <Stack.Screen
                name="addCamera"
                component={AddCameraRoute}
                options={{headerShown: false}}
             /> 
              <Stack.Screen
                name="bookPreview"
                component={BookPreviewRoute}
                options={{title: 'Podgląd książki'}}
             /> 
        </Stack.Navigator>
    )
}