import React from "react"
import { View, StatusBar, StyleSheet  } from "react-native"
import {List } from "react-native-paper";
import BottomSheet from "../../../Components/BottomSheet";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from 'expo-image-picker';

const AddShelfBottomSheetPicture = React.forwardRef(({children}, ref) =>{
    const navigation = useNavigation()
    const refBottomSheet = React.useRef(null)

    React.useImperativeHandle(ref, ()=>({onHandlePress}), [onHandlePress])

    function onHandlePress(){
        const isActive = refBottomSheet?.current?.isActive()
        isActive ? refBottomSheet?.current?.scrollTo(0) : refBottomSheet?.current?.scrollTo(-250)
        refBottomSheet?.current?.setIsVisible(true);
    }

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          aspect: [4, 3],
          quality: 1,
        });

        if (!result.canceled) {
            navigation.navigate('addShelf', {uri: result.assets[0].uri})
        }
    }

    return ( 
    <View style={{flex:1}}>
        <View style={styles.container}>
            <StatusBar style="light" />
            <BottomSheet ref={refBottomSheet} scale={3}>
                <List.Section style={styles.listContainer}>
                    <List.Item title="Zrób zdjęcie" left={()=> <List.Icon icon="camera" style={styles.listIcon}/>}
                               onPress={() => navigation.navigate('myCamera')}/>
                    <List.Item title="Dodaj zdjęcie z galerii" left={()=> <List.Icon icon="image" style={styles.listIcon}/>} 
                               onPress={pickImage}/>
                </List.Section>
            </BottomSheet>
        </View>
    </View>    
    )
})

export default AddShelfBottomSheetPicture

const styles = StyleSheet.create({
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
    },
    listIcon:{
        paddingLeft: 15
    },
})