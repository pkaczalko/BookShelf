import React from "react";
import { Text, ScrollView, View, StyleSheet} from "react-native";
import { Divider, Button } from "react-native-paper";
import DescriptionPreview from "../../Add/AddBook/Components/DescriptionPreview";
import { useNavigation } from "@react-navigation/native";

export default function SimpleInfo({data}){
    const navigation = useNavigation()
    const authors = data.authors.map((author, idx)=>{
        return <Text style={[styles.title, {fontSize:15, fontWeight:"normal", color:"#888888"}]} key={idx}>{author.name}</Text>
    })
    const categories = data.categories.map((category, idx)=>{
        return <Text style={[styles.title, {fontSize:15, fontWeight:"normal", color:"#888888"}]} key={idx}>{category.name}</Text>
    })

    function onHandleEdit(){
        console.log(data)
        navigation.navigate('bookPreviewEdit', {data: data})
    }

    return(
        <View style={{flex:1}}>
            <Divider horizontalInset={true} />
            <ScrollView style={{flex:1}}>
                <Text style={[styles.title, {fontSize:12, textTransform:"uppercase"}]}>Tytuł</Text>
                <Text style={[styles.title, {fontSize:15, fontWeight:"normal", color:"#888888"}]}>{data.title}</Text>
                <Text style={[styles.title, {fontSize:12, textTransform:"uppercase", marginTop:20}]}>Autor</Text>
                {authors}
                <Text style={[styles.title, {fontSize:12, textTransform:"uppercase", marginTop:20}]}>Kategorie</Text>
                {categories}
                <Text style={[styles.title, {fontSize:12, textTransform:"uppercase", marginTop:20}]}>Wydawca</Text>
                <Text style={[styles.title, {fontSize:15, fontWeight:"normal", color:"#888888"}]}>{data.publisher}</Text>
                <Text style={[styles.title, {fontSize:12, textTransform:"uppercase", marginTop:20}]}>Typ Okładki</Text>
                <Text style={[styles.title, {fontSize:15, fontWeight:"normal", color:"#888888"}]}>{data.coverType}</Text>
                <Text style={[styles.title, {fontSize:12, textTransform:"uppercase", marginTop:20}]}>Język</Text>
                <Text style={[styles.title, {fontSize:15, fontWeight:"normal", color:"#888888"}]}>{data.language}</Text>
                <Text style={[styles.title, {fontSize:12, textTransform:"uppercase", marginTop:20}]}>Opis</Text>
                <DescriptionPreview description={data.description}/>
                <Text style={[styles.title, {fontSize:12, textTransform:"uppercase", marginTop:20}]}>Data Publikacji</Text>
                <Text style={[styles.title, {fontSize:15, fontWeight:"normal", color:"#888888"}]}>{data.publishedDate}</Text>
                <Text style={[styles.title, {fontSize:12, textTransform:"uppercase", marginTop:20}]}>Liczba Stron</Text>
                <Text style={[styles.title, {fontSize:15, fontWeight:"normal", color:"#888888"}]}>{data.pageCount}</Text>
                <Text style={[styles.title, {fontSize:12, textTransform:"uppercase", marginTop:20}]}>ISBN</Text>
                <Text style={[styles.title, {fontSize:15, fontWeight:"normal", color:"#888888"}]}>{data.isbn}</Text>
            </ScrollView>
            <Divider bold={true}/>
            <View style={styles.buttons}>
                <Button mode="contained" icon="square-edit-outline" onPress={onHandleEdit} style={styles.saveButton}>Edytuj</Button>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:0.32,
        flexDirection:"row",
        height:"50%"
    },
    img:{
        width:"30%",
        height:"100%",
        marginLeft: 10,
        marginTop: 10,
        objectFit: "fill",
        borderRadius: 10,
        borderWidth: 1,
        backgroundColor:"black"
    },
    title:{
        marginLeft: 15,
        marginTop:10,
        fontWeight:"bold",
        fontSize:20,
        maxWidth:"100%",
    },
    authors:{
        marginLeft: 15,
        marginTop:10,
        fontSize:15
    },
    saveButton:{
        width: "100%",
        justifyContent:"flex-end",
        borderRadius:0
    },
    buttons:{
        flexDirection:"row",
        justifyContent:"space-around"
    },
    listContainer: {
        width: "auto",
        marginTop:0
    },
    listIcon:{
        paddingLeft: 15
    },
    listItem:{

    }
})