import React from "react"
import { View, StyleSheet, Text, Image, TouchableOpacity, SafeAreaView, ScrollView, StatusBar } from "react-native"
import { useRoute, useNavigation, CommonActions } from "@react-navigation/native"
import { Divider, Button, Appbar } from "react-native-paper"
import DescriptionPreview from "../Add/AddBook/Components/DescriptionPreview"
import {SafeAreaProvider} from "react-native-safe-area-context"

export default function BookPreviewInfo(props){
    const navigation = useNavigation()
    const route = useRoute()
    const [data, setData] = React.useState({title: "",
                                            isbn: "",
                                            isRead: true,
                                            favorite: true,
                                            borrower: "John Smith",
                                            wishList: false,
                                            publisher:"",
                                            coverType:"nie ma",
                                            volume:1,
                                            publishedDate: "",
                                            categories: [
                                                {
                                                  name: ""
                                                }
                                            ],
                                            authors:[
                                                {
                                                    name: ""
                                                }
                                            ],

                                            imgURI: "",
                                            description: "",
                                            isFound: true})
                                        
    function check(param){
        return param ? param : "Brak"
    }

    React.useEffect(() => {
        navigation.setOptions({headerShown:true})
        if (route.params?.isbn) {
            fetch("http://192.168.0.80:8081/books?q=" + route.params.isbn) 
            .then(res => res.json())
            .then((bookData) => {
                const title = bookData?.[0]?.title
                const authors = bookData?.[0]?.authors
                let mappedAuthors = [{name: ""}]
                if (authors){
                    mappedAuthors = authors.map((author)=>{
                        return {name: author}
                    })
                }

                const publishedDate = bookData?.[0]?.publishedDate
                const imgURI = bookData?.[0]?.imgURI
                const description = bookData?.[0]?.description
                const publisher = bookData?.[0]?.publisher
                const isbn = route.params?.isbn
                const categories = bookData?.[0]?.categories
                let mappedCategories = [{name: ""}]
                if (categories){
                    mappedCategories = categories.map((category)=>{
                        return {name: category}
                    })
                }
                setData({...data, title: check(title), authors: mappedAuthors, publisher: check(publisher), publishedDate: check(publishedDate), isbn: check(isbn), 
                    imgURI: check(imgURI), description: check(description), categories: mappedCategories})

            })
            .catch((err) =>{
                setData({...data, isFound: false})
            })
        }
        else if(route?.params?.data){
            setData({...route.params.data})
        }
    }, [route.params]);

    const authors = data.authors.map((author, idx)=>{
        return <Text style={[styles.title, {fontSize:15, fontWeight:"normal", color:"#888888"}]} key={idx}>{author.name}</Text>
    })

    function onHandleEdit(){
        navigation.navigate('bookPreviewEdit', {data: data})
    }

    function onHandleSave(){
    }
    return(
        <SafeAreaProvider style={{flex:1, flexDirection:"column"}}>
            {data.isFound && <View style={styles.container}>
                <Image src={data.imgURI} style={styles.img} resizeMethod="resize" resizeMode="contain" />
                <View style={{flex:1}}>
                    <Text style={styles.title} numberOfLines={2}>{data.title}</Text>
                    <Text style={styles.authors}>{authors}</Text>
                </View>
            </View>}
            {data.isFound && <View style={{flex:1, marginTop:20}}>
                <Divider horizontalInset={true} />
                <ScrollView style={{flex:1}}>
                    <Text style={[styles.title, {fontSize:12, textTransform:"uppercase"}]}>Tytuł</Text>
                    <Text style={[styles.title, {fontSize:15, fontWeight:"normal", color:"#888888"}]}>{data.title}</Text>
                    <Text style={[styles.title, {fontSize:12, textTransform:"uppercase", marginTop:20}]}>Autor</Text>
                    {authors}
                    <Text style={[styles.title, {fontSize:12, textTransform:"uppercase", marginTop:20}]}>Opis</Text>
                    <DescriptionPreview description={data.description}/>
                    <Text style={[styles.title, {fontSize:12, textTransform:"uppercase", marginTop:20}]}>Data Publikacji</Text>
                    <Text style={[styles.title, {fontSize:15, fontWeight:"normal", color:"#888888"}]}>{data.publishedDate}</Text>
                    <Text style={[styles.title, {fontSize:12, textTransform:"uppercase", marginTop:20}]}>ISBN</Text>
                    <Text style={[styles.title, {fontSize:15, fontWeight:"normal", color:"#888888"}]}>{data.isbn}</Text>
                </ScrollView>
                <Divider bold={true}/>
                <View style={styles.buttons}>
                    <Button mode="contained" icon="square-edit-outline" onPress={onHandleSave} style={styles.saveButton}>Dodaj na półkę</Button>
                    <Button mode="contained" icon="square-edit-outline" onPress={onHandleEdit} style={styles.saveButton}>Edytuj</Button>
                </View>
            </View>}
            {data.isFound === false && <Text>Nie rozpoznano książki</Text>}
        </SafeAreaProvider>
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
        width: 150,
        justifyContent:"flex-end",
        borderRadius:0
    },
    buttons:{
        marginTop:10,
        flexDirection:"row",
        justifyContent:"space-around"
    }
})