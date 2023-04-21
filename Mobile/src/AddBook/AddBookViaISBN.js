import React from "react";
import { StyleSheet, View, Dimensions } from "react-native";
import BarCodeScanner from "./BarCodeScanner/BarCodeScanner";

const {width: SCREEN_WIDTH} = Dimensions.get('window')

export default function AddBookViaISBN(){
    return(
        <View style={styles.formsContainer}>
            <BarCodeScanner />
        </View>
    )
}

const styles = StyleSheet.create({
    formsContainer:{
        flex:1,
        justifyContent:"space-between",
        alignItems: "flex-start",
        padding: 10
    },
    textContainer:{
        width:SCREEN_WIDTH*0.9,
        margin:5
    },
    textInput:{
        marginBottom:13
    },
    saveButton:{
        width:"100%",
        justifyContent:"flex-end",
    },
})