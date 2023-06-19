import React from "react";
import { View, StyleSheet, Text, Image } from "react-native";
import { Card, ProgressBar, MD3Colors, IconButton } from "react-native-paper";
import { useNavigation} from "@react-navigation/native";
import { Rating} from 'react-native-elements';

export default function BookDetailed(props){
    const navigation = useNavigation()
    const percantage = props.pageCount > 0 ? props.currentPage/props.pageCount : 0
    const authors = props.authors.map((author, idx)=>{
        if ((idx < 1) && (props.authors.length > 1)){ 
            return <Text numberOfLines={1} key={idx} style={styles.author}>{author} {'(+' + (props.authors.length - 1) + ')'}</Text>
        }
        else if ((idx < 1) && (props.authors.length === 1)){
            return <Text numberOfLines={1} key={idx} style={styles.author}>{author}</Text>
        }
    })

    const onPressHandle = () =>{
        navigation.navigate('bookPreview', {screen: 'bookPreviewInfo', params:{isbn: props.isbn}})
    }

    return(
        <Card style={styles.container} onPress={onPressHandle} elevation={1}>
            <Card.Content style={styles.content}>
                <Card.Cover style={styles.imgCover} source={{ uri: props.imgURI ? props.imgURI : "brak" }} />
                <View style={styles.info}>
                    <View style={{flex:1, justifyContent:"flex-start"}}>
                        <Text style={styles.title}numberOfLines={2} >{props.title}</Text>
                        {authors}
                    </View>
                    <View style={{flex:1, justifyContent:"flex-end"}}>
                        <View style={styles.progressContainer}>
                            <ProgressBar style={styles.progressBar} progress={percantage} color={MD3Colors.blue} />
                            <Text style={{fontSize:12, fontWeight:"normal", color:"#888888", marginTop:2}}>{parseInt(percantage * 100)}%</Text>
                        </View>
                        <View style={styles.pageCounterContainer}>
                            <IconButton style={{marginTop:-9, marginLeft: -8, marginRight: -4}} icon="book-open-page-variant" size={20} iconColor={MD3Colors.silver} />
                            <Text style={{fontSize:12, fontWeight:"normal", color:"#888888", marginTop:2}}>{props.currentPage}/{props.pageCount}</Text>
                        </View>
                        <Rating imageSize={25} startingValue={props.rating} style={styles.rating} readonly={true}/>
                    </View>
                </View>
            </Card.Content>
        </Card>
    )
}

const styles = StyleSheet.create({
    container:{
        backgroundColor: 'white',
        margin: 10,
    },
    content:{
        flex:1,
        flexDirection:"row",
        height:200
    },
    imgCover:{
        flex:0.5,
        borderWidth:1,
        borderColor:"#C8C8C8",
        width:"30%",
        height:"100%",
        objectFit: "fill",
        backgroundColor:"silver",
        elevation: 5,
    },
    rating:{
        color:"black",
        alignSelf:"flex-start",
    },
    info:{
        flex:0.8,
        flexDirection:"column",
        marginLeft: 16,
        height:"100%"
    },
    title:{
        fontSize:17, 
        fontWeight:'bold'
    },
    author:{
        marginTop:10,
        fontSize:13, 
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