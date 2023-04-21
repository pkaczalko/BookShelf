import React from 'react'
import { Surface, Text } from 'react-native-paper'
import { StyleSheet, Image, View, Pressable } from 'react-native'
import {IconButton, MD3Colors, Card} from 'react-native-paper'


export default function ShelfCard({img, title, number}) {

    return (
        <Card style={styles.shelfContainer} mode="elevated" elevation={5} onPress={()=>console.log("sss")}>
            <Card.Content style={{ height:80, flexDirection:"row", justifyContent:"flex-start", alignItems:"center",}}>
                {img && <Image source = {{uri: img}} style={styles.imgPreview} />}
                {img === undefined && <View style={styles.defaultImgPreview} elevation={5}>
                    <IconButton icon="image" iconColor={MD3Colors.error10} size={25} />
                </View>}
                <Text style={{marginLeft: 15}}>{title}</Text>
                <Text style={{marginLeft:3, color:"silver"}}>{`(${number})`}</Text>
            </Card.Content>
        </Card>
    )
}

const styles = StyleSheet.create({
    shelfContainer:{
        marginTop:20,
        backgroundColor:"white",
        borderRadius:15,
    },
    imgPreview:{
        width:60, 
        height:60, 
        borderColor:"black",
        borderRadius:40, 
        margin:5,
        resizeMode:"contain"
    },
    defaultImgPreview:{
        height: 60, 
        width: 60, 
        backgroundColor:"#F0F0F0", 
        borderRadius:40, 
        margin:4, 
        justifyContent:"center", 
        alignItems:"center",
        borderWidth:1,
        borderColor:"silver"
    }
})