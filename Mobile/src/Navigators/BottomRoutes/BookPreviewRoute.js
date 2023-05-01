import React from "react"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import BookPreviewEdit from "../../Add/AddBook/BookPreview/BookPreviewEdit";
import BookPreviewInfoAdd from "../../Add/AddBook/BookPreview/BookPreviewInfoAdd";
import BarCodeScanner from "../../Add/BarCodeScanner/BarCodeScanner";
import BookPreviewInfo from "../../SearchBooks/BookPreviewInfo";

export default function BookPreview(props){
    const Stack = createNativeStackNavigator();

    const BarCodeScannerRoute = () => <BarCodeScanner />
    const BookPreviewInfoRoute = () => <BookPreviewInfo />
    const BookPreviewEditRoute = () => <BookPreviewEdit />
    const BookPreviewInfoAddRoute = () => <BookPreviewInfoAdd />
    return(
            <Stack.Navigator screenOptions={{gestureEnabled:false}} initialRouteName="bookPreviewInfo"
                            headerMode="float" animation="fade"> 
                <Stack.Screen
                    name="barCodeScanner"
                    component={BarCodeScannerRoute}
                    options={{title: 'barcode', headerShown: false}}
                />
                <Stack.Screen
                    name="bookPreviewInfoAdd"
                    component={BookPreviewInfoAddRoute}
                    options={{title: 'Informacje', headerShown: false}}
                />
                <Stack.Screen
                    name="bookPreviewEdit"
                    component={BookPreviewEditRoute}
                    options={{title: 'Edytuj', headerShown: false}}
                />
                <Stack.Screen
                    name="bookPreviewInfo"
                    component={BookPreviewInfoRoute}
                    options={{title: 'Informacje', headerShown: false}}
                />
            </Stack.Navigator>
    )
}