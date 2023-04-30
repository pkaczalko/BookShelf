import React from "react"
import { View, StyleSheet, Text, Image, TouchableOpacity, ScrollView } from "react-native"
import { useRoute, useNavigation, CommonActions } from "@react-navigation/native"
import { Divider, Button } from "react-native-paper"
import DescriptionPreview from "./Components/DescriptionPreview"

export default function BookPreview(){
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
                                            genres: [
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
    const [save, setSave] = React.useState(false)
                                        
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
                let mappedAuthors = [{name: ""}]
                if (authors){
                    mappedAuthors = authors.map((author)=>{
                        return {name: author}
                    })
                }
                const publishedDate = bookData?.items[0]?.volumeInfo?.publishedDate
                const imgURI = bookData?.items[0]?.volumeInfo?.imageLinks?.thumbnail 
                const description = bookData?.items[0]?.volumeInfo?.description
                const publisher = bookData?.items[0]?.volumeInfo?.publisher
                const isbn = route.params.isbn
                const genres = bookData?.items[0]?.volumeInfo?.categories
                let mappedGenres = [{name: ""}]
                if (genres){
                    mappedGenres = genres.map((genre)=>{
                        return {name: genre}
                    })
                }

                setData({...data, title: check(title), authors: mappedAuthors, publisher: check(publisher), publishedDate: check(publishedDate), isbn: check(isbn), 
                        imgURI: check(imgURI), description: check(description), genres: mappedGenres})
            })
            .catch((err) =>{
                setData({...data, isFound: false})
            })
        }
    }, [route.params]);

    React.useEffect(()=>{
        if (save === true){
            const {description, isFound, ...toSendData} = data
            fetch('http://192.168.0.80:8081/books', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(toSendData)
                })
            .then(res => res.json())
            .then(data => console.log(data))
            .catch(err => console.log(err))
            
            navigation.dispatch(
                CommonActions.reset({
                index: 0,
                routes: [{ name: "catalogue" }],
                })
            );
        }
    },[save])

    const authors = data.authors.map((author, idx)=>{
        return <Text style={[styles.title, {fontSize:15, fontWeight:"normal", color:"#888888"}]} key={idx}>{author.name}</Text>
    })

    return(
        <View style={{flex:1, flexDirection:"column"}}>
            {data.isFound && <View style={styles.container}>
                <Image src={data.imgUri} style={styles.img} resizeMethod="resize" resizeMode="contain" />
                <View style={{flex:1}}>
                    <Text style={styles.title} numberOfLines={2}>{data.title}</Text>
                    <Text style={styles.authors}>{authors}</Text>
                </View>
            </View>}
            {data.isFound && <View style={{flex:1, marginTop:20}}>
                <Divider />
                <ScrollView style={{flex:1}}>
                    <Text style={[styles.title, {fontSize:12, textTransform:"uppercase"}]}>Tytuł</Text>
                    <Text style={[styles.title, {fontSize:15, fontWeight:"normal", color:"#888888"}]}>{data.title}</Text>
                    <Text style={[styles.title, {fontSize:12, textTransform:"uppercase", marginTop:20}]}>Autor</Text>
                    {authors}
                    <Text style={[styles.title, {fontSize:12, textTransform:"uppercase", marginTop:20}]}>Opis</Text>
                    <DescriptionPreview description={data.description}/>
                    <Text style={[styles.title, {fontSize:12, textTransform:"uppercase", marginTop:20}]}>Data Publikacji</Text>
                    <Text style={[styles.title, {fontSize:15, fontWeight:"normal", color:"#888888"}]}>{data.publishingDate}</Text>
                    <Text style={[styles.title, {fontSize:12, textTransform:"uppercase", marginTop:20}]}>ISBN</Text>
                    <Text style={[styles.title, {fontSize:15, fontWeight:"normal", color:"#888888"}]}>{data.isbn}</Text>
                </ScrollView>
                <Button mode="contained" onPress={()=> setSave(true)} style={styles.saveButton}>Zapisz</Button>
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
    saveButton:{
        width:"100%",
        justifyContent:"flex-end",
        borderRadius:0
    },
})