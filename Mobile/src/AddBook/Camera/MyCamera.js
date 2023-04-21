import React from 'react';
import { StyleSheet, View, Modal,Text, Button, Image, SafeAreaView, Animated, ImageBackground, Pressable } from 'react-native';
import { IconButton,MD3Colors  } from 'react-native-paper';
import { Camera, CameraType } from 'expo-camera';
import {shareAsync} from 'expo-sharing';
import * as MediaLibrary from 'expo-media-library';
import { useNavigation } from "@react-navigation/native";
import { BackHandler } from 'react-native';
import RecordButton from './Components/RecordButton';


export default function MyCamera(){
    const navigation = useNavigation();
    const [cameraType, setCameraType] = React.useState(Camera.Constants.Type.back)
    const [isVisible, setIsVisible] = React.useState(true)
    const [hasCameraPermission, setHasCameraPermission] = React.useState();
    const [hasMediaLibraryPermission, setHasMediaLibraryPermission] = React.useState()
    const [image, setImage] = React.useState();

    let cameraRef = React.useRef(null);

    React.useEffect(()=>{
        (async () =>{
            const cameraPermission = await Camera.requestCameraPermissionsAsync();
            const mediaLibraryPermission = await MediaLibrary.requestPermissionsAsync();
            setHasCameraPermission(cameraPermission.status === "granted")
            setHasMediaLibraryPermission(mediaLibraryPermission.status === "granted")
        })();
    },[])

    if (hasCameraPermission === undefined){
        return <Text>Requesting Permission</Text>
    } else if(!hasCameraPermission){
        return <Text>Permission denied</Text>
    }

    function handleBackPress(){
        setIsVisible(false);
        navigation.goBack()
    }

    function toggleCameraType() {
        setCameraType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
    }

    let takePicture = async () =>{
        let options = {
            quality: 1,
            base64: true,
            exif: false
        }
        let newImage = await cameraRef.current.takePictureAsync(options)
        setImage(newImage)
    }

    function savePicture(){
        navigation.navigate('addShelf', {uri: "data:image/jpg;base64," + image.base64})
    }

    return(
        <View style={styles.screen}>
            <Modal visible={isVisible} onRequestClose={handleBackPress} statusBarTranslucent={true} >
                {image === undefined && <Camera style={{ flex: 1 }} type={cameraType} ref={cameraRef} ratio='16:9'>
                    <View style = {{flex:0.18, backgroundColor:"black"}}/>
                    <View style={styles.cameraContainer} />
                    <View style = {styles.bottomButtonContainer}>
                        <RecordButton handleOnPress={takePicture} />
                    </View>
                </Camera>}

                {image && <View style={{flex:1}}>
                    <ImageBackground style={styles.preview} source={{ uri: "data:image/jpg;base64," + image.base64 }}>
                        <IconButton icon="replay" mode="contained" iconColor={MD3Colors.error0} size={30} onPress={()=>{setImage(undefined)}} />
                        <IconButton icon="check-bold" mode="contained" iconColor={MD3Colors.error0} size={30} onPress={savePicture} />
                    </ImageBackground>
                </View>}
            
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    screen:{
        flex:1,
    },
    recordButton:{
        borderRadius:80, 
        backgroundColor:"white", 
        alignSelf:"flex-end",                                
        width:75, 
        height:75, 
        borderWidth:7, 
        borderColor:"#404040", 
        marginBottom:35
    },
    pressableRecordButton:{
        backgroundColor: 'white',
        borderRadius: 50,
        width: '100%',
        height: '100%',
    },
    bottomButtonContainer:{
        flex:0.38, 
        backgroundColor:"black", 
        flexDirection:'row', 
        justifyContent:"center"
    },
    cameraContainer:{
        flex:1,
        flexDirection:'row',
        justifyContent:"center",
        alignItems:"center",

    },
    preview:{
        flex:1,
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"flex-end",
        padding:15
    },
    imagePreview:{
        flex:1,
    }
})