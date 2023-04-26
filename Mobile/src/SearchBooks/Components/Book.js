import React from "react";
import { Card } from "react-native-paper";
import { Text, StyleSheet, View } from "react-native";

export default function Book(props){
    const [img, setImg] = React.useState("https://picsum.photos/700")

    function check(param){
        return param ? param : 'https://picsum.photos/700'
    }

    React.useEffect(()=>{
        fetch("https://www.googleapis.com/books/v1/volumes?q=isbn:" + props.isbn)
        .then(res => res.json())
        .then((bookData) => {
            const imgUri = bookData?.items[0]?.volumeInfo?.imageLinks?.thumbnail 
            setImg(check(imgUri))
            if (img.length === 0) setImg('https://picsum.photos/700')
        })
        .catch((err)=>{
            setImg('https://picsum.photos/700')
        })
    },[])

    return(
            <View style={styles.container}>
                <Card style={styles.cardContainer} mode="elevated" elevation={5} onPress={()=> console.log("book")}>
                        <Card.Cover style={styles.cardCover} source={{ uri: img }} />
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
        // justifyContent:"center",
        alignItems:"flex-start",
        // backgroundColor:"white",
        // position: 'relative'
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
