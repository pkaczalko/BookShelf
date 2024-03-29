import React from "react"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { IconButton } from "react-native-paper";
import BookPreviewEditAdd from "../../Add/AddBook/BookPreview/BookPreviewEditAdd";
import BarCodeScanner from "../../Add/BarCodeScanner/BarCodeScanner";
import BookPreviewInfo from "../../Catalogue/BookPreviewInfo";
import BookPreviewEdit from "../../Catalogue/BookPreviewEdit";

const Stack = createNativeStackNavigator();

const BarCodeScannerRoute = () => <BarCodeScanner />
const BookPreviewInfoRoute = () => <BookPreviewInfo />
const BookPreviewEditAddRoute = () => <BookPreviewEditAdd />
const BookPreviewEditRoute = () => <BookPreviewEdit />

export default function BookPreview(props){
    return(
        <Stack.Navigator screenOptions={{gestureEnabled:false}} initialRouteName="bookPreviewInfo"
                        headerMode="float" animation="fade"> 
            <Stack.Screen
                name="barCodeScanner"
                component={BarCodeScannerRoute}
                options={{title: 'barcode', headerShown: false}}
            />
            <Stack.Screen
                name="bookPreviewEdit"
                component={BookPreviewEditRoute}
                options={{title: 'Edytuj', headerShown: false}}
            />
            <Stack.Screen
                name="bookPreviewEditAdd"
                component={BookPreviewEditAddRoute}
                options={{title: 'Edytuj', headerShown: false}}
            />
            <Stack.Screen
                name="bookPreviewInfo"
                component={BookPreviewInfoRoute}
                options={{title: 'Informacje', headerShown: false, }}
            />
        </Stack.Navigator>
    )
}