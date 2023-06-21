import React from "react";
import BookSimple from "./BookSimple";
import { FlatList,StyleSheet } from "react-native";

export default function SimpleView(props){
    const renderBooks = ({item}) =>{
        return (
          <BookSimple isbn={item.isbn} uri={item.imgURI} title={item.title}/>
        )
    }
    
    return(
        <FlatList data={props.data} style={styles.books} renderItem={renderBooks} keyExtractor={item => item.id} numColumns={3} />
    )
}

const styles = StyleSheet.create({
    books:{

    }
})