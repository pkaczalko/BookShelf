import React from 'react';
import { Camera, RNCamera, CameraType } from 'expo-camera';
import { StyleSheet, View, Modal, Text } from 'react-native';
import { useNavigation,CommonActions,useRoute } from "@react-navigation/native";
import { Dimensions } from 'react-native';

const screenHeight = Dimensions.get('screen').height;
const screenWidth = Dimensions.get('screen').width;

const BarCodeScanner = React.forwardRef((props, ref) => {
    const navigation = useNavigation()
    const [isVisible, setIsVisible] = React.useState(false)
    const [hasCameraPermission, setHasCameraPermission] = React.useState();
    const [isbn, setIsbn] = React.useState();
    const [isPreview, setIsPreview] = React.useState(false)

    const onPressHandle = () =>{
        setIsPreview(!isPreview)
    }

    const turnOnBarCode = () =>{
        setIsVisible(true)
    }
    
    console.log(isVisible)

    React.useImperativeHandle(ref, ()=>({turnOnBarCode}), [turnOnBarCode])
    
    React.useEffect(()=>{
        (async () =>{
            const cameraPermission = await Camera.requestCameraPermissionsAsync();
            setHasCameraPermission(cameraPermission.status === "granted")
        })();
    },[])

    if (hasCameraPermission === undefined){
        return <Text>Requesting Permission</Text>
    } else if(!hasCameraPermission){
        return <Text>Permission denied</Text>
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
                onPressHandle()
                setIsVisible(false)
                navigation.navigate('bookPreview', {screen: 'bookPreviewInfoAdd', params:{isbn: scannedData.data}})
            }
        }
      };

    return(
        <View style={styles.screen}>
                {isbn === undefined && <Camera style={{flex: 1}} 
                                        onBarCodeScanned={isbn ? undefined : handleBarCode}
                                        ratio='16:9'>
                    <View style={{flex:1, justifyContent:"center", alignItems:"center"}}>
                        <View style={{height:250, width: 250, backgroundColor: "rgba(255, 255, 255, 0)", borderWidth:4, borderColor:"silver"}}/>
                    </View>
                </Camera>}          
        </View>
    )    
})

export default BarCodeScanner
const styles = StyleSheet.create({
    screen:{
        flex:1,
    },

    cameraContainer:{
    },
})