import React from "react";
import { View, StyleSheet, Text, Image } from "react-native";
import { Card, ProgressBar, MD3Colors, IconButton } from "react-native-paper";

export default function Book(){
    return(
        <Card style={styles.container}>
            <Card.Content style={styles.content}>
                <Card.Cover style={styles.imgCover} source={{ uri: 'https://picsum.photos/700' }} />
                <View style={styles.info}>
                    <Text style={styles.title}>Tytuł</Text>
                    <Text style={styles.author}>Autor</Text>
                    <View style={styles.progressContainer}>
                        <ProgressBar style={styles.progressBar} progress={0.5} color={MD3Colors.blue} />
                        <Text style={{fontWeight:"normal", color:"#888888"}}>0%</Text>
                    </View>
                    <View style={styles.pageCounterContainer}>
                        <IconButton style={{marginTop:-9, marginLeft: -8, marginRight: -4}} icon="book-open-page-variant" size={20} iconColor={MD3Colors.silver} />
                        <Text style={{fontWeight:"normal", color:"#888888"}}>147/400</Text>
                    </View>
                    <Text>Ocena w gwiazdkach TODO</Text>
                </View>
            </Card.Content>
        </Card>
    )
}

const styles = StyleSheet.create({
    container:{
        backgroundColor: '#fff',
        margin: 10,
    },
    content:{
        flex:1,
        flexDirection:"row"
    },
    imgCover:{
        flex:0.5,
    },
    info:{
        flex:0.8,
        flexDirection:"column",
        justifyContent:"flex-start",
        alignItems:"flex-start",
        marginLeft: 16
    },
    title:{
        fontSize:22, 
        fontWeight:'bold'
    },
    author:{
        marginTop:10,
        fontSize:15, 
        fontWeight:"normal", 
        color:"#888888"
    },
    progressContainer:{
        marginTop:30,
        flexDirection:"row"
    },
    progressBar:{
        height:5, 
        width: 150, 
        marginTop:8, 
        marginRight:8
    },
    pageCounterContainer:{
        flexDirection:"row",
    }
})