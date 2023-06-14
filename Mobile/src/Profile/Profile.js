import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Avatar } from "react-native-elements";
import { List } from "react-native-paper";

export default function Profile(){
    return(
        <View style={styles.profileContainer}>
            <View style={styles.container}>
                <Avatar size="large" rounded title="IN" onPress={() => console.log("avatar")} 
                        activeOpacity={0.7} containerStyle={styles.avatar}/>
                <View style={styles.textContainer}>
                    <Text style={styles.name}>Imie Nazwisko</Text>
                    <Text style={styles.nickname}>jakisnick127</Text>
                </View>
            </View>
            <List.Section style={styles.logoutContainer}>
                <List.Item title="Wyloguj się" left={()=> <List.Icon icon="logout" style={styles.logoutIcon}/>} 
                           onPress={()=>console.log("clicked")}/>
            </List.Section>
        </View>
    )
}

const styles = StyleSheet.create({
    profileContainer:{
        flex:1,
        justifyContent:"space-between"
    },
    avatar:{
        backgroundColor:"gray",
        margin:10,
        marginTop:20,
        marginLeft:15
    },
    container:{
        flexDirection:"row",
        alignItems:"center",
    },
    textContainer:{
        marginLeft:10,
        flexDirection:"column",
        alignItems:"flex-start",
    },
    logoutContainer:{

    },
    logoutIcon:{
        marginLeft:15
    },
    name:{
        fontSize:24,
        fontWeight:"bold",
    },
    nickname:{
        fontWeight:"normal",
        fontSize:15,
        color:"#888888",
        maxWidth:"100%",
    }
})
