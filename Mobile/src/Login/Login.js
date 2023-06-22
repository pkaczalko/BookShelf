import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { Button, TextInput } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function Login(){
    const navigation = useNavigation()
    const [loginData, setLoginData] = React.useState()
    const [validLogin, setValidLogin] = React.useState(false)
    const [validPassword, setValidPassword] = React.useState(false)
    const [showPassword, setShowPassword] = React.useState(false)

    React.useEffect(()=>{
        fetch("https://bookshelf-java.azurewebsites.net/users/1") 
        .then(res => res.json())
        .then((loginData) => {
            setLoginData(loginData)
        })
        .catch((err) =>{
            console.log(err)
        })
    },[])

    const storeLoginData = async (key, value) => {
        try {
          const jsonValue = JSON.stringify(value);
          await AsyncStorage.setItem(key, jsonValue);
          console.log('Data stored successfully.');
        } catch (error) {
          console.log('Failed to store data:', error);
        }
    };

      
    const handleOnLoginClick = () =>{
        if (validLogin && validPassword){
            storeLoginData("loginData", loginData)
            navigation.navigate('home')
        }
    }

    return(
        <View style={{flex:1, flexDirection:"column", justifyContent:"center"}}>
            <Text style={{alignSelf:"center", fontSize:25, fontWeight:"bold"}}>Logowanie</Text>
            <TextInput mode="outlined" onChangeText={(value) => loginData.login === value ? setValidLogin(true) : setValidLogin(false)}
                       style={[styles.textInput, {marginTop:13}]} label="Nazwa Użytkownika"/>
            <TextInput mode="outlined" onChangeText={(value) => loginData.password === value ? setValidPassword(true) : setValidPassword(false)}
                       style={[styles.textInput, {marginTop:13}]} label="Hasło" secureTextEntry={!showPassword} 
                       right={<TextInput.Icon icon="eye" onPress={()=>setShowPassword(!showPassword)}/>}/>
            <Button mode="contained" onPress={handleOnLoginClick} style={{width:150, alignSelf:"center", marginTop:15}}>Zaloguj się</Button>
        </View>
    )
}

const styles = StyleSheet.create({
    textInput:{
        backgroundColor: "white",
        marginBottom: 12,
        marginLeft:20,
        marginRight:20
    },
})