import React from 'react';
import { Camera, RNCamera ,CameraType } from 'expo-camera';
import { StyleSheet, View, Modal, Text, Button, Image, SafeAreaView, Animated, ImageBackground, Pressable } from 'react-native';
import * as MediaLibrary from 'expo-media-library';
import { useNavigation,CommonActions } from "@react-navigation/native";
import { BarCodeScanner } from 'expo-barcode-scanner';
import { Dimensions } from 'react-native';

const screenHeight = Dimensions.get('screen').height;
const screenWidth = Dimensions.get('screen').width;

export default function MyBarCodeScanner(){
    const navigation = useNavigation();
    const [isVisible, setIsVisible] = React.useState(true)
    const [hasCameraPermission, setHasCameraPermission] = React.useState();
    const [isbn, setIsbn] = React.useState();

    React.useEffect(()=>{
        (async () =>{
            const cameraPermission = await Camera.requestCameraPermissionsAsync();
            setHasCameraPermission(cameraPermission.status === "granted")
        })();
        console.log("dasdassd")
    },[])

    // React.useEffect(()=>{
    //     if (isbn){
    //         console.log(isbn)
    //     }
    // },[isbn])

                // navigation.navigate('add', {screen: 'bookPreview', params: {isbn:isbn}})


    if (hasCameraPermission === undefined){
        return <Text>Requesting Permission</Text>
    } else if(!hasCameraPermission){
        return <Text>Permission denied</Text>
    }

    function handleBackPress(){
        setIsVisible(false);
        navigation.goBack()
    }


    const handleBarCode = (scannedData) => {
        const { boundingBox } = scannedData;

        const { x: borderX, y: borderY, width: borderWidth, height: borderHeight } = {
          x: (screenHeight - 250) / 2,
          y: (screenWidth - 250) / 2,
          width: 250,
          height: 250,
        };

        if (
          boundingBox.origin.x >= borderX &&
          boundingBox.origin.y >= borderY &&
          boundingBox.origin.x + boundingBox.size.width <= borderX + borderWidth &&
          boundingBox.origin.y + boundingBox.size.height <= borderY + borderHeight
        ) {
            if (scannedData.type === 32){
                setIsbn(scannedData.data);
                console.log(`Bar code with type ${scannedData.type} and data ${scannedData.data} has been scanned!`);
                navigation.navigate('bookPreview', {isbn: scannedData.data})
                setIsVisible(false)
            }
        }
      };

    return(
        <View style={styles.screen}>
            <Modal visible={isVisible} onRequestClose={handleBackPress} statusBarTranslucent={true} >
                {isbn === undefined && <Camera style={{flex: 1}} 
                                        onBarCodeScanned={isbn ? undefined : handleBarCode}
                                        ratio='16:9'>
                    <View style={{flex:1, justifyContent:"center", alignItems:"center"}}>
                        <View style={{height:250, width: 250, backgroundColor: "rgba(255, 255, 255, 0)", borderWidth:4, borderColor:"silver"}}/>
                    </View>
                </Camera>}          
            </Modal>
        </View>
    )    
}

const styles = StyleSheet.create({
    screen:{
        flex:1,
    },

    cameraContainer:{
    },
})