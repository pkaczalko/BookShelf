import React from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";

export default function DescriptionPreview(props){
    const [showMore, setShowMore] = React.useState(false);
    const [numLines, setNumLines] = React.useState(0)

    return(
        <View>
            <Text style={[styles.title, {fontSize:15, fontWeight:"normal", color:"#888888"}]} 
                  numberOfLines={showMore ? undefined : 5} 
                  onTextLayout={e => setNumLines(e.nativeEvent.lines.length)}>{props.description}</Text>
            {numLines > 5 && <TouchableOpacity onPress={() => setShowMore(!showMore)}>
                <Text style={styles.showMore}>{showMore ? 'Pokaż mniej' : 'Pokaż więcej'}</Text>
            </TouchableOpacity>}
        </View>
    )
}

const styles = StyleSheet.create({
    showMore:{
        marginLeft:15,
    },
    title:{
        marginLeft: 15,
        marginTop:10,
        fontWeight:"bold",
        fontSize:20,
        maxWidth:"100%",
    },
})