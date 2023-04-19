import React from "react";
import { View, Text, StyleSheet} from "react-native";
import { Searchbar, Divider } from "react-native-paper";
import Book from "../MyBooks/Book";
import { NativeViewGestureHandler, FlatList } from "react-native-gesture-handler";
export default function SearchBooks(){
    const fetchedData =[{title: "Thriller", id: 14},
                    {title: "Horror", id: 1},
                    {title: "Technika", id: 2},
                    {title: "Biografia", id: 3},
                    {title: "Poezja", id: 4},
                    {title: "Fantasy", id: 5},
                    {title: "Sci-Fi", id: 6},
                    {title: "Przygodowe", id: 7},
                    {title: "Sport", id: 8},
                    {title: "Naukowe", id: 9},
                    {title: "asdasd", id: 10},
                    {title: "asdasd", id: 11},
                    {title: "asdasd", id: 12},
                    {title: "asdasd", id: 13}]
    const editedData = fetchedData.map(item => ({...item, isChecked: false}))

    const [data, setData] = React.useState(editedData)
    const [searchQuery, setSearchQuery] = React.useState('')

    const renderBooks = ({item}) =>{
        return (
          <Book name={item.title}/>
        )
    }

    return(
        <NativeViewGestureHandler>
            <View style={{flex:1}}>
                <Searchbar elevation={2} placeholder='Szukaj'  
                            onChangeText={(query) => setSearchQuery(query)} value={searchQuery}
                            style={{backgroundColor:"white", height:40, alignItems:"center", margin: 10}}
                            inputStyle={{marginTop:-7}}/>
                <Divider bold={true}/>
                <FlatList data={data} style={styles.books} renderItem={renderBooks} keyExtractor={item => item.id} numColumns={3} /> 
                
            </View>
        </NativeViewGestureHandler>
    )
}

const styles = StyleSheet.create({
    searchButton:{
    },
    books:{
    }
})