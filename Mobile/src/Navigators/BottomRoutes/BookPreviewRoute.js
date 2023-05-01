import React from "react"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import BookPreviewEdit from "../../Add/AddBook/BookPreview/BookPreviewEdit";
import BookPreviewInfo from "../../Add/AddBook/BookPreview/BookPreviewInfo";
import BarCodeScanner from "../../Add/BarCodeScanner/BarCodeScanner";

export default function BookPreview(props){
    const Stack = createNativeStackNavigator();

    const BarCodeScannerRoute = () => <BarCodeScanner />
    const BookPreviewInfoRoute = () => <BookPreviewInfo isbn={props.isbn} onPressHandle={props.onPressHandle} handleBottomSheetMenu={props.handleBottomSheetMenu}/>
    const BookPreviewEditRoute = () => <BookPreviewEdit isbn={props.isbn} onPressHandle={props.onPressHandle} handleBottomSheetMenu={props.handleBottomSheetMenu}/>
    return(
            <Stack.Navigator screenOptions={{gestureEnabled:false}} initialRouteName="bookPreviewInfo"
                            headerMode="float" animation="fade"> 
                <Stack.Screen
                    name="barCodeScanner"
                    component={BarCodeScannerRoute}
                    options={{title: 'barcode', headerShown: false}}
                />
                <Stack.Screen
                    name="bookPreviewInfo"
                    component={BookPreviewInfoRoute}
                    options={{title: 'Informacje', headerShown: false}}
                />
                <Stack.Screen
                    name="bookPreviewEdit"
                    component={BookPreviewEditRoute}
                    options={{title: 'Edytuj', headerShown: false}}
                />
            </Stack.Navigator>
    )
}