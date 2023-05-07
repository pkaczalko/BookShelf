import React from "react";
import { StyleSheet, View, Dimensions, BackHandler, ScrollView, Text} from "react-native";
import { Divider, Button, Appbar, TextInput, List, IconButton, Dialog, Portal, Provider } from "react-native-paper"
import { useNavigation, CommonActions } from "@react-navigation/native";
import {SafeAreaProvider} from "react-native-safe-area-context"

const {width: SCREEN_WIDTH} = Dimensions.get('window')

export default function AddBookManually(){
    const navigation = useNavigation()

    const [expandIconAuthors, setExpandIconAuthors] = React.useState('chevron-right')
    const [expandedAuthors, setExpandedAuthors] = React.useState(false)

    const [expandedDescription, setExpandedDescription] = React.useState(false)
    const [expandIconDescription, setExpandIconDescription] = React.useState('chevron-right')

    const [descriptionNumOfLines, setDescriptionNumOfLines] = React.useState(1)
    const [isSaved, setIsSaved] = React.useState(false)

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
                                            description: ""})
    
    const [isSavedDisabled, setIsSaveDisabled] = React.useState(true)
    React.useEffect(()=>{
        if (isSaved === true){
            const {description, ...toSendData} = data
            fetch('https://bookshelf-java.azurewebsites.net/books', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(toSendData)
            })
            .then(res => res.json())
            .then(data => console.log(data))
            .catch(err => console.log(err))
            navigation.navigate('home')
        }
    },[isSaved])

    React.useEffect(()=>{
        if(data.title.length > 0){
            setIsSaveDisabled(false)
        }
        if (data.title.length === 0){
            setIsSaveDisabled(true)
        }
    },[data])

    function handleChange(name, value){
        setData(prevData => ({
            ...prevData,
            [name]: value
        }))
    }

    const authors = data.authors.map((author, idx)=>{
        return idx === 0 ?
        <View style={styles.authorContainer} key={idx}>
            <TextInput mode="outlined" value={author.name} onChangeText={(value) => handleAuthorChange(value, idx)}
                       style={[styles.textInput, {marginTop:13}]} label={"Autor " + (idx + 1)}/>
            <IconButton icon="close" iconColor="black" size={25} onPress={() => handleAuthorDelete(idx)} style={styles.authorExit} />
        </View>
        :
        <View style={styles.authorContainer} key={idx}>
            <TextInput mode="outlined" value={author.name} onChangeText={(value) => handleAuthorChange(value, idx)}
                       style={styles.textInput} label={"Autor " + (idx + 1)}  />
            <IconButton icon="close" iconColor="black" size={25} onPress={() => handleAuthorDelete(idx)} style={styles.authorExit}  />
        </View>
    })

    function handleAuthorDelete(idx){
        setData(prevData => ({
            ...prevData,
            authors: prevData.authors.filter((author, index) => index !== idx)
        }))
    }

    function handleAuthorChange(value, idx){
        setData(prevData => ({
            ...prevData,
            authors: prevData.authors.map((author, i) => {
                if (i === idx) {
                    return {...author, name: value};
                }
                return author;
            })
        }))
    }
    function handleChange(name, value){
        setData(prevData => ({
            ...prevData,
            [name]: value
        }))
    }

    function handleOnExpandAuthors(){
        setExpandedAuthors(!expandedAuthors)
        if (expandIconAuthors === "chevron-right") setExpandIconAuthors("chevron-down")
        if (expandIconAuthors === "chevron-down") setExpandIconAuthors("chevron-right")

    }

    function handleOnExpandDescription(){
        setExpandedDescription(!expandedDescription)
        if (expandIconDescription === "chevron-right") setExpandIconDescription("chevron-down")
        if (expandIconDescription === "chevron-down") setExpandIconDescription("chevron-right")

    }

    function handleOnAdd(){
        setData(prevData => ({
            ...prevData,
            authors: [...prevData.authors, {name:""}]
        }))
    }
    
    return(
        <SafeAreaProvider style={{flex:1, flexDirection:"column"}}>
            <View style={{flex:1}}>
                <ScrollView style={{flex:1, marginLeft:10, marginRight:10}}>
                    <List.Section>
                        <TextInput mode="outlined" label = "ISBN(opcjonalny)" value={data.isbn} 
                                onChangeText={(value) => handleChange("isbn", value)} style={styles.textInput}/>
                        <TextInput mode="outlined" label = "Tytuł" value={data.title} 
                                onChangeText={(value) => handleChange("title", value)} style={[styles.textInput, {marginTop:-4}]} />
                        <List.Accordion title="Autorzy" right={() => <List.Icon icon={expandIconAuthors} />} 
                                        style={styles.authorsButton} expanded={expandedAuthors} onPress={handleOnExpandAuthors}>
                            {authors}
                            <Button mode="contained-tonal" icon="plus" iconColor="silver" 
                                    style={[styles.addAuthorsButton, {marginTop: data.authors.length > 0 ? -9 : 2 }]}
                                    onPress={handleOnAdd}>Dodaj autora</Button>
                        </List.Accordion>
                        <Divider style={{marginTop:13}}/>
                        <List.Accordion title="Opis" right={() => <List.Icon icon={expandIconDescription}/>} 
                                        style={styles.descriptionButton} expanded={expandedDescription} 
                                        onPress={handleOnExpandDescription}>
                            <TextInput mode="outlined" label = "Opis" value={data.description} 
                                        onChangeText={(value) => handleChange("description", value)} 
                                        style={[styles.textInput, {marginTop:8}]} 
                                        multiline={true} numberOfLines={descriptionNumOfLines} onContentSizeChange={(e) => {
                                        setDescriptionNumOfLines(e.nativeEvent.contentSize.height / 18)
                                        }}/>
                        </List.Accordion>
                        <TextInput mode="outlined" label = "Data Wydania" value={data.publishedDate} 
                                   onChangeText={(value) => handleChange("publishedDate", value)} style={[styles.textInput, {marginTop:8}]}/>
                    </List.Section>
                </ScrollView>
                <View style={styles.buttons}>
                    <Button mode="contained" icon="check" onPress={() => setIsSaved(true)} 
                            style={styles.saveButton} disabled={isSavedDisabled}>
                        Dodaj
                    </Button>
                </View>
            </View>
        </SafeAreaProvider>
    )
}

const styles = StyleSheet.create({
    formsContainer:{
        flex:1,
        justifyContent:"space-between",
        alignItems: "flex-start",
        padding:10
    },
    modalContent:{
        backgroundColor: "white",
        padding: 20
    },
    textContainer:{
        width:SCREEN_WIDTH*0.9,
        margin:5
    },
    textInput:{
        marginBottom:13
    },
    saveButton:{
        width:"100%",
        justifyContent:"flex-end",
    },
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
    authorContainer:{
        flexDirection:"row"
    },
    authorExit:{
        alignSelf:"center"
    },
    authors:{
        marginLeft: 15,
        marginTop: 10,
        fontSize: 15
    },
    authorsButton:{
        backgroundColor:"white",
        borderWidth:1,
        borderRadius: 4,
        borderColor: '#808080',
    },
    addAuthorsButton:{
        backgroundColor:"transparent",
        alignSelf:"flex-start",
        borderRadius:0,
        marginLeft: -8,
    },
    descriptionButton:{
        backgroundColor:"white",
        borderWidth:1,
        borderRadius: 4,
        borderColor: '#808080',
    },
    textInput:{
        flex: 1,
        backgroundColor: "white",
        marginBottom: 12,
    },
    saveButton:{
        borderRadius:0
    },
    buttons:{
    }
})