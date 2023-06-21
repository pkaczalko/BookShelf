import React from "react";
import BookDetailed from "./BookDetailed";
import { FlatList } from "react-native";

export default function DetailedView(props){

    const renderBooks = ({item}) =>{
        return (
          <BookDetailed title={item.title} authors={item.authors} imgURI={item.imgURI} rating={item.rating} borrower={item.borrower}
                        isbn={item.isbn} currentPage={item.currentPage} pageCount={item.pageCount} wishList={item.wishList}/>
        )
    }

    return(
        <FlatList data={props.data} renderItem={renderBooks} keyExtractor={item => item.id} numColumns={1} /> 
    )
}