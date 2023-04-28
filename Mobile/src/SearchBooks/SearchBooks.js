import React from "react";
import { View, Text, StyleSheet} from "react-native";
import { Searchbar, Divider } from "react-native-paper";
import Book from "./Components/Book";
import { NativeViewGestureHandler, FlatList } from "react-native-gesture-handler";
export default function SearchBooks(){
    const [data, setData] = React.useState("")
    const [searchQuery, setSearchQuery] = React.useState('')

    React.useEffect(()=>{
        fetch('http://192.168.0.80:8081/books')
        .then(res => res.json())
        .then((fetched_data) =>{
            const editedData = fetched_data.map(item => ({...item, isChecked: false}))
            setData(editedData)
        })
        .catch(err => console.log(err))
    },[])

    const renderBooks = ({item}) =>{
        return (
          <Book isbn={item.isbn}/>
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