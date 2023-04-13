import React from "react";
import { StyleSheet, View, SafeAreaView, StatusBar, Platform } from "react-native";
import { List } from "react-native-paper";
import { useNavigation } from '@react-navigation/native';

export default function AddBookMenu(){
    const navigation = useNavigation();

    return(
        <SafeAreaView style={styles.safeContainer}>
    
            <List.Section style={styles.listContainer}>
                <List.Item title="Dodaj książkę przez ISBN" left={()=> <List.Icon icon="barcode-scan" style={styles.listIcon}/>}
                           onPress={() => navigation.navigate('addBookViaISBN')}/>
                <List.Item title="Dodaj książkę ręcznie" left={()=> <List.Icon icon="pencil" style={styles.listIcon}/>} 
                           onPress={() => navigation.navigate('addBookManually')}/>
                <List.Item title="Dodaj nową półkę" left={()=> <List.Icon icon="bookshelf" style={styles.listIcon}/>} 
                           onPress={() => navigation.navigate('addShelf')}/>
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