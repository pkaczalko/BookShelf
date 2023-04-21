import React from "react";
import { StyleSheet, View, Dimensions, BackHandler} from "react-native";
import { TextInput, Button } from "react-native-paper";
import { useNavigation, CommonActions } from "@react-navigation/native";

const {width: SCREEN_WIDTH} = Dimensions.get('window')

export default function AddBookManually(){
    const navigation = useNavigation()
    const [data, setData] = React.useState({
        isbn: "",
        title: "",
        author: "",
        category: "",
        descript: ""
    })

    function handleChange(name, value){
        setData(prevData => ({
            ...prevData,
            [name]: value
        }))
    }

    React.useEffect(() => {
        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            handleBackPress
        );

        return () => backHandler.remove();
    }, []);

    const handleBackPress = () => {
        navigation.dispatch(
            CommonActions.reset({
            index: 0,
            routes: [{ name: "catalogue" }],
            })
        );
        return true
    };

    return(
        <View style={styles.formsContainer}>
            <View style={styles.textContainer}>
                <TextInput mode="outlined" label = "ISBN(optional)" value={data.isbn} onChangeText={(value) => handleChange("isbn", value)} style={styles.textInput}/>
                <TextInput mode="outlined" label = "Title" value={data.title} onChangeText={(value) => handleChange("title", value)} style={styles.textInput}/>
                <TextInput mode="outlined" label = "Author" value={data.author} onChangeText={(value) => handleChange("author", value)} style={styles.textInput}/>
                <TextInput mode="outlined" label = "Kategoria" value={data.category} onChangeText={(value) => handleChange("category", value)} style={styles.textInput}/>
                <TextInput mode="outlined" label = "Opis" value={data.descript} onChangeText={(value) => handleChange("descript", value)} style={styles.textInput}/>
            </View>
            <Button mode="contained" onPress={()=>console.log("Zrobić POSTa")} style={styles.saveButton}>Save</Button>
        </View>
    )
}

const styles = StyleSheet.create({
    formsContainer:{
        flex:1,
        justifyContent:"space-between",
        alignItems: "flex-start",
        padding:10
    },
    modalContent:{
        backgroundColor: "white",
        padding: 20
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