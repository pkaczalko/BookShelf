import React from "react";
import { SafeAreaView, View, Text, StyleSheet, Image } from "react-native";
import { Searchbar, TextInput, Surface } from 'react-native-paper';
import ShelfCard from "./ShelfCard";

export default function Shelves(){
    const [searchQuery, setSearchQuery] = React.useState('')
  
    return (
        <View style={styles.searchButton}>
            <Searchbar elevation={2} placeholder='Szukaj' 
                       onChangeText={(query) => setSearchQuery(query)} value={searchQuery}
                       style={{backgroundColor:"white", height:40, alignItems:"center"}}
                       inputStyle={{marginTop:-7}}/>
            <ShelfCard title="Póła" number={4} />
            <ShelfCard title="Póła 2" number={4} />
            <ShelfCard title="Póła 5" number={23} />

        </View>
    )
  }
  
  const styles = StyleSheet.create({
    searchButton:{
        padding: 7,
    },
})