import React from "react"
import { View,Text, StyleSheet } from "react-native"
import { Checkbox } from "react-native-paper"

export default function CategoryCheckBox(props){
    const [checked, setChecked] = React.useState(props.isChecked)

    function onCheck(){
        setChecked(!checked)
        props.onChecked()
    }

    return(
        <View style={styles.container}>
            <Text style={{marginTop:8}}>{props.title}</Text>
            <Checkbox status={checked ? 'checked':'unchecked'} onPress={onCheck} />
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        justifyContent:"space-between",
        alignItems:"flex-start",
        flexDirection:"row",
        margin:10
    }
})