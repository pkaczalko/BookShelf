import React from "react";
import { Card } from "react-native-paper";
import { Text, StyleSheet, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { ActivityIndicator, MD2Colors } from 'react-native-paper';

export default function Book(props){
    console.log(props.uri)
    const [img, setImg] = React.useState({backgroundColor: "#DCDCDC", uri: props.uri, isLoaded: true})
    const navigation = useNavigation()

    function check(param){
        return param ? param : 'nonPic'
    }

    // React.useEffect(()=>{
    //     fetch("https://www.googleapis.com/books/v1/volumes?q=isbn:" + props.isbn)
    //     .then(res => res.json())
    //     .then((bookData) => {
    //         const imgUri = bookData?.items[0]?.volumeInfo?.imageLinks?.thumbnail 
    //         setImg({...img, uri: check(imgUri), isLoaded: true})
    //     })
    //     .catch((err)=>{
    //         setImg({...img, isLoaded: true})
    //     })
    // },[])

    const onPressHandle = () =>{
        navigation.navigate('bookPreview', {isbn: props.isbn})
    }

    return(
            <View style={styles.container}>
                <Card style={styles.cardContainer} mode="elevated" elevation={1} onPress={onPressHandle}>
                    {img.isLoaded && <Card.Cover style={styles.cardCover} source={{ uri: img.uri }} />}
                    {img.isLoaded === false && <Card.Cover style={[styles.cardCover, {backgroundColor:img.backgroundColor}]} />}
                    <ActivityIndicator animating={!img.isLoaded} color={MD2Colors.black} style={styles.cardCover}/>
                </Card>
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
