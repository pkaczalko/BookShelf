import React from "react";
import { StyleSheet, View, Text, Dimensions, BackHandler} from "react-native";
import { Image } from 'react-native-elements';
import { TextInput, Button, IconButton, MD3Colors } from "react-native-paper";
import {useRoute, useNavigation, CommonActions } from "@react-navigation/native";
import AddShelfBottomSheetPicture from "./Components/AddShelfBottomSheet";

const {width: SCREEN_WIDTH} = Dimensions.get('window')

export default function AddShelf(){
    const navigation = useNavigation()
    const route = useRoute()

    const [img, setImg] = React.useState();

    React.useEffect(() => {
        if (route.params?.uri) {
            setImg(route.params.uri)
        }
    }, [route.params]);

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

    const [data, setData] = React.useState({
        name: "",
    })

    function handleChange(name, value){
        setData(prevData => ({
            ...prevData,
            [name]: value
        }))
    }

    const refBottomSheet = React.useRef(null)

    function onHandleClick(){
        console.log("SS")
        refBottomSheet?.current?.onHandlePress()
    }

    return (
        <View style={styles.formsContainer}>
            <View style={styles.textContainer}>
                <TextInput mode="outlined" label = "Nazwa" value={data.isbn} 
                        onChangeText={(value) => handleChange("name", value)} style={styles.textInput}/>
                    <Text style={{marginBottom:3}}>Okładka (opcjonalna)</Text>
                    {img === undefined && <IconButton icon="image-plus" mode="contained" iconColor={MD3Colors.error0} size={30} onPress={onHandleClick} style={styles.addIcon} />}
                    {img && 
                        <Image source={{uri: img}} style={styles.addedImage} onPress={onHandleClick}/>
                    }
                
            </View>
            <AddShelfBottomSheetPicture ref={refBottomSheet} />

            <Button mode="contained" onPress={()=>console.log("Zrobić POSTa")} style={styles.saveButton}>Save</Button>

        </View>
    )
}

const styles = StyleSheet.create({
    formsContainer:{
        flex:1,
        justifyContent:"space-between",
        alignItems: "flex-start",
        padding: 10,
        height:400,
    },
    textContainer:{
        width:250,
        margin:5
    },
    textInput:{
        width:SCREEN_WIDTH*0.9,
        marginBottom:13
    },
    addIcon:{
        borderRadius:0,
        width:"50%",
        height:"50%",
        backgroundColor:"white",
        borderWidth: 1.5,
        marginLeft: -0.5,
        borderStyle:"dashed",
        borderColor:"silver",
    },
    container:{
        flex:1,
        backgroundColor:"black",
        alignItems:"center",
        justifyContent:"center"
    },
    button:{
        height:60,
        aspectRatio:1,
        backgroundColor:"white",
        borderRadius:25,
        opacity:0.6
    },
    listContainer: {
        width: "auto",
        marginTop: 20,
        marginLeft: 15
    },
    saveButton:{
        width:"100%",
        justifyContent:"flex-end",
    },
    addedImage:{
        borderRadius:0,
        width:"50%",
        height:"65%",
        borderWidth: 1.5,
        borderColor:"silver",
    }
})