import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Avatar } from "react-native-elements";
import { List } from "react-native-paper";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from "@react-navigation/native";

export default function Profile(){
    const [data, setData] = React.useState()
    const navigation = useNavigation()

    React.useEffect(()=>{
        retrieveData("loginData")
    },[])

    const retrieveData = async (key) => {
        try {
          const value = await AsyncStorage.getItem(key);
          if (value !== null) {
            const jsonValue = JSON.parse(value)
            setData(jsonValue)
            console.log('Retrieved value:', value);
          } else {
            console.log('No data found for the key:', key);
          }
        } catch (error) {
          console.log('Failed to retrieve data:', error);
        }
    };

    return(
        <View style={styles.profileContainer}>
            <View style={styles.container}>
                <Avatar size="large" rounded title="IN" onPress={() => console.log("avatar")} 
                        activeOpacity={0.7} containerStyle={styles.avatar}/>
                <View style={styles.textContainer}>
                    <Text style={styles.name}>{data ? data.login : "johny21312"}</Text>
                    <Text style={styles.nickname}>{data ? data.email : "sampl@gmail.com"}</Text>
                </View>
            </View>
            <List.Section style={styles.logoutContainer}>
                <List.Item title="Wyloguj się" left={()=> <List.Icon icon="logout" style={styles.logoutIcon}/>} 
                           onPress={()=>navigation.navigate('login')}/>
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
