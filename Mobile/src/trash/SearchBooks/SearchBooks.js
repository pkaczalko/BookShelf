import React from "react";
import { View, Text, StyleSheet, Modal} from "react-native";
import { Searchbar, Divider } from "react-native-paper";
import Book from "../../Catalogue/Categories/Components/BookSimple";
import { NativeViewGestureHandler, FlatList } from "react-native-gesture-handler";

// export default function SearchBooks(){
//     const [data, setData] = React.useState("")
//     const [searchQuery, setSearchQuery] = React.useState('')
//     const [isLoaded, setIsLoaded] = React.useState(false)
    
//     React.useEffect(()=>{
//         setIsLoaded(false)
//         fetch('https://bookshelf-java.azurewebsites.net/books?q=' + searchQuery)
//         .then(res => res.json())
//         .then((fetched_data) =>{
//             const editedData = fetched_data.map(item => ({...item, isChecked: false}))
//             setData(editedData)
//             setIsLoaded(true)
//         })
//         .catch(err => console.log(err))
//     },[searchQuery])


//     const renderBooks = ({item}) =>{
//         return (
//           <Book isbn={item.isbn} uri={item.imgURI}/>
//         )
//     }

//     return(
//         <NativeViewGestureHandler>
//             <View style={{flex:1}}>
//                 <Searchbar elevation={2} placeholder='Szukaj' loading={!isLoaded}
//                             onChangeText={(query) => setSearchQuery(query)} value={searchQuery}
//                             style={{backgroundColor:"white", height:40, alignItems:"center", margin: 10}}
//                             inputStyle={{marginTop:-7}}/>
//                 <Divider bold={true}/>
//                 <FlatList data={data} style={styles.books} renderItem={renderBooks} keyExtractor={item => item.id} numColumns={3} /> 
//             </View>
//         </NativeViewGestureHandler>
//     )
// }

// const styles = StyleSheet.create({
//     searchButton:{
//     },
//     books:{
//     }
// })