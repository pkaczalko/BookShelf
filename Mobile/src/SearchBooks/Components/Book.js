import React from "react";
import { Card } from "react-native-paper";
import { Text, StyleSheet, View, Modal } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { ActivityIndicator, MD2Colors } from 'react-native-paper';
import BookPreview from "../BookPreview";

export default function Book(props){
    console.log(props.uri)
    const [isPreview, setIsPreview] = React.useState(false)

    const onPressHandle = () =>{
        setIsPreview(!isPreview)
    }

    return(
            <View style={styles.container}>
                <Card style={styles.cardContainer} mode="elevated" elevation={1} onPress={onPressHandle}>
                    <Card.Cover style={styles.cardCover} source={{ uri: props.uri }} />
                    {/* {img.isLoaded === false && <Card.Cover style={[styles.cardCover, {backgroundColor:img.backgroundColor}]} />}
                    <ActivityIndicator animating={!img.isLoaded} color={MD2Colors.black} style={styles.cardCover}/> */}
                </Card>
                <Modal visible={isPreview} onRequestClose={onPressHandle} statusBarTranslucent={true}>
                    <BookPreview isbn={props.isbn} onPressHandle={onPressHandle}/>
                </Modal>
            </View>
    )
}

const styles = StyleSheet.create({
    container:{
        alignItems:"center", 
        margin: 7,
    },
    cardContainer:{
        flex:1,
        width:105,
        height: 140,
        alignItems:"flex-start",
    },
    cardCover:{
        flex:1,
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        width:105,
        height:140
    }
})
