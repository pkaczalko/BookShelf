import React from "react";
import { Card } from "react-native-paper";
import { Text, StyleSheet, View } from "react-native";

export default function Book(props){
    return(
            <View style={styles.container}>
                <Card style={styles.cardContainer} mode="elevated" elevation={5} onPress={()=> console.log("book")}>
                    <Card.Content>
                        <Text>{props.name}</Text>
                    </Card.Content>
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
        width:105,
        height: 140,
        justifyContent:"center",
        alignItems:"center",
        backgroundColor:"white"
    }
})
