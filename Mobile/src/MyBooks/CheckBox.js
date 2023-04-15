import React from "react"
import { View,Text, StyleSheet } from "react-native"
import { Checkbox } from "react-native-paper"

export default function CheckBox(props){
    const [checked, setChecked] = React.useState(false)

    return(
        <View style={styles.container}>
            <Checkbox status={checked ? 'checked':'unchecked'} onPress={()=> setChecked(!checked)} />
            <Text style={{marginTop:8}}>{props.title}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        justifyContent:"flex-start",
        alignItems:"flex-start",
        flexDirection:"row",
        margin:10
    }
})