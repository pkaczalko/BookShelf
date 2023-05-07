import React from "react"
import AddBookManually from "../../Add/AddBook/AddBookManually"
import AddMenu from "../../Add/AddMenu"
import AddBookViaISBN from "../../Add/AddBook/AddBookViaISBN"
import AddShelf from "../../Add/AddShelf/AddShelf"
import MyCamera from "../../Add/Camera/MyCamera"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { useNavigation } from "@react-navigation/core"

export default function Add(){
    const Stack = createNativeStackNavigator();
    const navigation = useNavigation()

    const AddMenuRoute = () => <AddMenu />
    const AddByHandRoute = () => <AddBookManually />
    const AddBookViaISBNRoute = () => <AddBookViaISBN />
    const AddShelfRoute = () => <AddShelf />
    const MyCameraRoute = () => <MyCamera />

    // React.useEffect(() => {
    //     console.log(navigation)
    //     navigation.setOptions({
    //       tabBarStyle: {
    //         display: "none"
    //       }
    //     });
    //     return () => navigation.setOptions({
    //       tabBarStyle: undefined
    //     });
    //   }, [navigation]);

    return(
        // ogarnac te screenoptions bo nie dziala
        <Stack.Navigator screenOptions={{gestureEnabled:false}}
                         headerMode="float" animation="fade"> 
            <Stack.Screen
                name="addMenu"
                component={AddMenuRoute}
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
                name="myCamera"
                component={MyCameraRoute}
                options={{headerShown: false}}
             />
        </Stack.Navigator>
    )
}