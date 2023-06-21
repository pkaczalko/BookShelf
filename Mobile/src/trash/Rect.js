import { View } from "react-native"

export default function Rect(){
    return(
        <View style={{flex: 0.05, padding: 10, justifyContent:"flex-start", alignItems:"center"}}>
            <View style={{backgroundColor: "black", height:5, width:50, borderRadius:30}}></View>
        </View>
    )
}