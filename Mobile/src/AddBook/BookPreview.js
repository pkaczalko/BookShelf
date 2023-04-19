import React from "react"
import { View, StyleSheet, Text, Image, TouchableOpacity, ScrollView } from "react-native"
import { useRoute, useNavigation } from "@react-navigation/native"
import { Divider } from "react-native-paper"
import DescriptionPreview from "./DescriptionPreview"

export default function BookPreview(){
    const route = useRoute()
    const [data, setData] = React.useState({title: "",
                                            authors: "",
                                            publishedDate: "",
                                            imgUri: "",
                                            description: "",
                                            isbn: "",
                                            isFound: true})
    function check(param){
        return param ? param : "Brak"
    }
    React.useEffect(() => {
        if (route.params?.isbn) {
            fetch("https://www.googleapis.com/books/v1/volumes?q=isbn:" + route.params.isbn) 
            .then(res => res.json())
            .then((bookData) => {
                const title = bookData?.items[0]?.volumeInfo?.title
                const authors = bookData?.items[0]?.volumeInfo?.authors 
                const publishedDate = bookData?.items[0]?.volumeInfo?.publishedDate
                const imgUri = bookData?.items[0]?.volumeInfo?.imageLinks?.thumbnail 
                const description = bookData?.items[0]?.volumeInfo?.description
                const isbn = route.params.isbn
                // const categories = data?.items[0]?.volumeInfo?.
                
                setData({...data, title: check(title), authors: check(authors), publishedDate: check(publishedDate), isbn: check(isbn), 
                        imgUri: check(imgUri), description: check(description)})
            })
            .catch((err) =>{
                setData({...data, isFound: false})
            })
        }
    }, [route.params]);


    return(
        <View style={{flex:1, flexDirection:"column"}}>
            {data.isFound && <View style={styles.container}>
                <Image src={data.imgUri} style={styles.img} resizeMethod="resize" resizeMode="contain" />
                <View style={{flex:1}}>
                    <Text style={styles.title} numberOfLines={2}>{data.title}</Text>
                    <Text style={styles.authors}>{data.authors}</Text>
                </View>
            </View>}
            {data.isFound && <View style={{flex:1, marginTop:20}}>
                <Divider />
                <ScrollView style={{flex:1}}>
                    <Text style={[styles.title, {fontSize:12, textTransform:"uppercase"}]}>Tytuł</Text>
                    <Text style={[styles.title, {fontSize:15, fontWeight:"normal", color:"#888888"}]}>{data.title}</Text>
                    <Text style={[styles.title, {fontSize:12, textTransform:"uppercase", marginTop:20}]}>Autor</Text>
                    <Text style={[styles.title, {fontSize:15, fontWeight:"normal", color:"#888888"}]}>{data.authors}</Text>
                    <Text style={[styles.title, {fontSize:12, textTransform:"uppercase", marginTop:20}]}>Opis</Text>
                    <DescriptionPreview description={data.description}/>
                    <Text style={[styles.title, {fontSize:12, textTransform:"uppercase", marginTop:20}]}>Data Publikacji</Text>
                    <Text style={[styles.title, {fontSize:15, fontWeight:"normal", color:"#888888"}]}>{data.publishedDate}</Text>
                    <Text style={[styles.title, {fontSize:12, textTransform:"uppercase", marginTop:20}]}>ISBN</Text>
                    <Text style={[styles.title, {fontSize:15, fontWeight:"normal", color:"#888888"}]}>{data.isbn}</Text>
                </ScrollView>
            </View>}
            {data.isFound === false && <Text>Nie rozpoznano książki</Text>}
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:0.4,
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
})