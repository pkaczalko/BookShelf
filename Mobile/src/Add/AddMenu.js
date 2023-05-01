import React from "react";
import { StyleSheet, View, SafeAreaView, StatusBar, Platform, Modal } from "react-native";
import { List } from "react-native-paper";
import { useNavigation, useRoute } from '@react-navigation/native';
import BarCodeScanner from "./BarCodeScanner/BarCodeScanner";

export default function AddMenu({handleBottomSheetMenu}){
    const navigation = useNavigation();

    const [isVisibleBarCode, setIsVisibleBarCode] = React.useState(false)
    const barCodeScannerRef = React.useRef()
    
    function handleISBN(){
        navigation.navigate('bookPreview', {screen:'barCodeScanner'})
        handleBottomSheetMenu(false)
    }
    function handleManual(){
        navigation.navigate('add', {screen: 'addBookManually'})
        handleBottomSheetMenu(false)
    }
    function handleShelf(){
        navigation.navigate('add', {screen: 'addShelf'})
        handleBottomSheetMenu(false)
    }
    return(
        <SafeAreaView style={styles.safeContainer}>
    
            <List.Section style={styles.listContainer}>
                <List.Item title="Dodaj książkę przez ISBN" left={()=> <List.Icon icon="barcode-scan" style={styles.listIcon}/>}
                           onPress={handleISBN}/>
                <List.Item title="Dodaj książkę ręcznie" left={()=> <List.Icon icon="pencil" style={styles.listIcon}/>} 
                           onPress={handleManual}/>
                <List.Item title="Dodaj nową półkę" left={()=> <List.Icon icon="bookshelf" style={styles.listIcon}/>} 
                           onPress={handleShelf}/>
            </List.Section>
        </SafeAreaView>    
    )
}

const styles = StyleSheet.create({
    safeContainer: {
        flex: 1,
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
    },
    listContainer: {
        width: "auto",
        marginTop: -20
    },
    listIcon:{
        paddingLeft: 15
    },
    listItem:{

    }
})