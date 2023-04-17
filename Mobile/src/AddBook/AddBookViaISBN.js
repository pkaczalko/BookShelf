import React from "react";
import { StyleSheet, View, Dimensions } from "react-native";
import { TextInput, Button } from "react-native-paper";
import MyBarCodeScanner from "./BarCodeScanner/MyBarCodeScanner";

const {width: SCREEN_WIDTH} = Dimensions.get('window')

export default function AddBookViaISBN({navigation}){
    const [data, setData] = React.useState({
        isbn: "",
    })

    function handleChange(name, value){
        setData(prevData => ({
            ...prevData,
            [name]: value
        }))
    }

    return(
        <View style={styles.formsContainer}>
            {/* <View style={styles.textContainer}>
                <TextInput mode="outlined" label = "ISBN" value={data.isbn} 
                           onChangeText={(value) => handleChange("isbn", value)} style={styles.textInput}/>
            </View>
            <Button mode="contained" onPress={()=>console.log("Zrobić POSTa")} style={styles.saveButton}>Save</Button> */}
            <MyBarCodeScanner />
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