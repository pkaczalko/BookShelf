import React from "react"
import { View, StyleSheet, Text, Image, TouchableOpacity, SafeAreaView, ScrollView, StatusBar, BackHandler } from "react-native"
import {Picker} from "@react-native-picker/picker"
import { useRoute, useNavigation, CommonActions } from "@react-navigation/native"
import { Keyboard } from 'react-native';
import { Divider, Button, Appbar, TextInput, IconButton, List, Dialog, Portal } from "react-native-paper"
import {SafeAreaProvider} from "react-native-safe-area-context"
import _ from 'lodash'

export default function BookPreviewEdit(props){
    const route = useRoute()
    const navigation = useNavigation()

    const [descriptionNumOfLines, setDescriptionNumOfLines] = React.useState(1)

    const [isSaved, setIsSaved] = React.useState(false)
    const [data, setData] = React.useState({categories: [
                                                {
                                                name: ""
                                                }
                                            ],
                                            authors:[
                                                {
                                                    name: ""
                                                }
                                            ]})
    const [sourceData, setSourceData] = React.useState({...data})     
    const [save, setSave] = React.useState(false)
    const [alertShow, setAlertShow] = React.useState(false)                                    

    const [coverType, setCoverType] = React.useState("")
    const [coverTypes, setCoverTypes] = React.useState(['Miękka', 'Twarda'])
    const [focused, setFocused] = React.useState(false)
    const [ISBNfocused, setISBNFocused] = React.useState(false)
    const descriptionRef = React.useRef(null)
    const isbnRef = React.useRef(null)
    const titleRef = React.useRef(null)
    const publisherRef = React.useRef(null)
    const languageRef = React.useRef(null)
    const pageCountRef = React.useRef(null)
    const authorRef = React.useRef(null)
    const categoryRef = React.useRef(null)
    const publishedDateRef = React.useRef(null)
    const [keyboardVisible, setKeyboardVisible] = React.useState(false);

    React.useEffect(()=>{
        coverType !== "none" ? setData({...data, coverType: coverType}) : setData({...data, coverType: null})
    },[coverType])

    React.useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener(
          'keyboardDidShow',
          () => {
            setKeyboardVisible(true);
          }
        );
        const keyboardDidHideListener = Keyboard.addListener(
          'keyboardDidHide',
          () => {
            setKeyboardVisible(false);
            isbnRef?.current.blur();
            descriptionRef?.current.blur();
            titleRef?.current.blur();
            publisherRef?.current.blur();
            languageRef?.current.blur();
            pageCountRef?.current.blur();
            authorRef?.current.blur();
            categoryRef?.current.blur();
            publishedDateRef?.current.blur();
          }
        );
      
        return () => {
          keyboardDidShowListener.remove();
          keyboardDidHideListener.remove();
        };
      }, []);

    React.useEffect(() => {
        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            handleBackPress
        );

        return () => backHandler.remove();
    }, [sourceData, isSaved]);

    React.useEffect(() => {
        navigation.setOptions({headerShown:true})
        if (route.params?.data) {
            setData(route.params.data)
            setSourceData({...route.params.data})
            setCoverType(route.params.data?.coverType)
        }
    }, [route.params]);


    React.useEffect(()=>{
        if (_.isEqual(sourceData, data)){
            setIsSaved(true)
        }
        else{
            setIsSaved(false)
        }
        navigation.setOptions({headerLeft: () =>{
            return(
                <IconButton
                icon="arrow-left"
                style={{marginLeft:-9}}
                onPress={() => {
                    if(isSaved === false){
                        setAlertShow(true)
                    }
                    else{
                        navigation.navigate('bookPreviewInfo', {data: sourceData})
                    }
                }}
            />)
        }})
    },[data, sourceData, isSaved])

    React.useEffect(()=>{
        if (save === true){
            const {isFound, ...toSendData} = sourceData
            fetch("https://bookshelf-java.azurewebsites.net/books?id=" + data.id, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(toSendData)
            })
            .then(res => res.json())
            .then(data => console.log("Succeded PUT"))
            .catch(err => console.log(err))
        }
    },[save, data, sourceData])

    const authors = data.authors.map((author, idx)=>{
        return idx === 0 ?
        <View style={styles.authorContainer}  key={idx}>
            <TextInput mode="outlined" value={author.name} onChangeText={(value) => handleAuthorChange(value, idx)}
                       style={[styles.textInput, {marginTop:13}]} label={"Autor " + (idx + 1)} ref={authorRef}/>
            <IconButton icon="close" iconColor="black" size={25} onPress={() => handleAuthorDelete(idx)} style={styles.authorExit}/>
        </View>
        :
        <View style={styles.authorContainer}  key={idx}>
            <TextInput mode="outlined" value={author.name} onChangeText={(value) => handleAuthorChange(value, idx)}
                       style={styles.textInput} label={"Autor " + (idx + 1)} ref={authorRef} />
            <IconButton icon="close" iconColor="black" size={25} onPress={() => handleAuthorDelete(idx)} style={styles.authorExit}/>
        </View>
    })

    const categories = data.categories.map((category, idx)=>{
        return idx === 0 ?
        <View style={styles.authorContainer}  key={idx}>
            <TextInput mode="outlined" value={category.name} onChangeText={(value) => handleCategoryChange(value, idx)}
                       style={[styles.textInput, {marginTop:13}]} label={"Kategoria " + (idx + 1)} ref={categoryRef}/>
            <IconButton icon="close" iconColor="black" size={25} onPress={() => handleCategoryDelete(idx)} style={styles.authorExit}/>
        </View>
        :
        <View style={styles.authorContainer}  key={idx}>
            <TextInput mode="outlined" value={category.name} onChangeText={(value) => handleCategoryChange(value, idx)}
                       style={styles.textInput} label={"Kategoria " + (idx + 1)} ref={categoryRef}/>
            <IconButton icon="close" iconColor="black" size={25} onPress={() => handleCategoryDelete(idx)} style={styles.authorExit}/>
        </View>

    })

    const coverTypesItems = coverTypes.map((item, idx)=>{
        return(
            <Picker.Item label={item} value={item} key={idx}/>
        )
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
                    return {["name"]: value};
                }
                return author;
            })
        }))
    }

    function handleCategoryDelete(idx){
        setData(prevData => ({
            ...prevData,
            categories: prevData.categories.filter((category, index) => index !== idx)
        }))
    }

    function handleCategoryChange(value, idx){
        setData(prevData => ({
            ...prevData,
            categories: prevData.categories.map((category, i) => {
                if (i === idx) {
                    return {["name"]: value};
                }
                return category;
            })
        }))
    }
    function handleChange(name, value){
        setData(prevData => ({
            ...prevData,
            [name]: value
        }))
    }

    function handleOnAddAuthors(){
        setData(prevData => ({
            ...prevData,
            authors: [...prevData.authors, {name:""}]
        }))
    }

    function handleOnAddCategories(){
        setData(prevData => ({
            ...prevData,
            categories: [...prevData.categories, {name:""}]
        }))
    }

    function handleOnSave(){
        setSourceData({...data})
        setIsSaved(true)
        setSave(!save)
    }

    const handleBackPress = () => {
        if(isSaved === false){
            setAlertShow(true)
        }
        else{
            navigation.navigate('bookPreviewInfo', {data: sourceData})
        }
        return true
    };

    const handleConfirm = () =>{
        navigation.navigate('bookPreviewInfo', {data: sourceData})
    }
    
    const handleAbort = () =>{
        setAlertShow(false)
    }
    console.log(data.isbn)
    return(
        <SafeAreaProvider style={{flex:1, flexDirection:"column"}}>
            <View style={{flex:1}}>
                <ScrollView style={{flex:1, marginLeft:10, marginRight:10}}>
                    <List.Section>
                        <TextInput mode="outlined" label = "ISBN" value={data.isbn} maxLength={13} keyboardType="numeric"
                                onChangeText={(value) => handleChange("isbn", value)} style={styles.textInput} 
                                error={(data.isbn?.length != 13 && ISBNfocused) ? true : false} ref={isbnRef}
                                onFocus={()=>setISBNFocused(true)}
                                onBlur={()=>setISBNFocused(false)}/>
                        <TextInput mode="outlined" label = "Tytuł" value={data.title} ref={titleRef}
                                onChangeText={(value) => handleChange("title", value)} style={[styles.textInput, {marginTop:-4}]}/>
                        <TextInput mode="outlined" label = "Wydawca" value={data.publisher} ref={publisherRef}
                                onChangeText={(value) => handleChange("publisher", value)} style={[styles.textInput, {marginTop:-4}]}/>
                        <TextInput mode="outlined" label = "Język wydania" value={data.language} ref={languageRef}
                                onChangeText={(value) => handleChange("language", value)} style={[styles.textInput, {marginTop:-4}]}/>
                        <TextInput mode="outlined" label = "Liczba stron" value={data.pageCount?.toString()} maxLength={5} keyboardType="numeric"
                                onChangeText={(value) => handleChange("pageCount", value)} style={[styles.textInput, {marginTop:-4}]} ref={pageCountRef}/>
                        <TextInput mode="outlined" label = "Data Wydania" value={data.publishedDate} maxLength={10} keyboardType="numeric" ref={publishedDateRef}
                                onChangeText={(value) => handleChange("publishedDate", value)} style={[styles.textInput, {marginTop:8}]}/>
                        <Divider bold={true}/>
                        <Text style={{marginTop:5, marginBottom:-5}}>Kategorie</Text>
                        {categories}
                        <Button mode="contained-tonal" icon="plus" iconColor="silver" 
                                style={[styles.addAuthorsButton, {marginTop: data.categories.length > 0 ? -9 : 2 }]}
                                onPress={handleOnAddCategories}>Dodaj kategorie</Button>
                        <Divider bold={true}/>
                        <Text style={{marginTop:5, marginBottom:-5}}>Autorzy</Text>
                        {authors}
                        <Button mode="contained-tonal" icon="plus" iconColor="silver" 
                                style={[styles.addAuthorsButton, {marginTop: data.authors.length > 0 ? -9 : 2 }]}
                                onPress={handleOnAddAuthors}>Dodaj autora</Button>
                        <Divider style={{marginTop:13}}/>
                        <TextInput mode="outlined" label = "Opis" value={data.description} ref={descriptionRef}
                                    onChangeText={(value) => handleChange("description", value)} 
                                    style={[styles.textInput, {marginTop:8}]} 
                                    multiline={descriptionNumOfLines > 1 || focused === true ? true : false} numberOfLines={descriptionNumOfLines} 
                                    onContentSizeChange={(e) => {
                                        setDescriptionNumOfLines(e.nativeEvent.contentSize < 40 || focused === false ? 1 : e.nativeEvent.contentSize.height / 18)
                                    }}  
                                    onFocus={()=>setFocused(true)}
                                    onBlur={()=>{
                                        setFocused(false)
                                        setDescriptionNumOfLines(1)
                                        }
                                    }
                        />
                        <Text style={{}}>Typ Okładki</Text>
                        <View style={styles.picker}>
                            <Picker selectedValue={coverType}
                                    onValueChange={(itemValue, itemIndex) => {setCoverType(itemValue)}}>
                                {coverType === "" && <Picker.Item label="Typ Okładki" value="none" />}
                                {coverTypesItems}
                            </Picker>
                        </View>
                    </List.Section>
                </ScrollView>
                <View style={styles.buttons}>
                    <Button mode="contained" icon="check" onPress={handleOnSave} 
                            style={styles.saveButton} disabled={isSaved}>
                        Zapisz
                    </Button>
                </View>
                <Portal>
                    <Dialog visible={alertShow} style={{justifyContent:"center", backgroundColor:"white"}} dismissable={false}>
                        <Dialog.Content>
                            <Text style={{fontSize:16}}>Twoje zmiany nie zostaną zapisane. Czy chcesz kontynuuować?</Text>
                        </Dialog.Content>
                        <Dialog.Actions>
                            <Button onPress={handleAbort}>Nie</Button>
                            <Button onPress={handleConfirm}>Tak</Button>
                        </Dialog.Actions>
                    </Dialog>
                </Portal>
            </View>
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
    picker:{
        backgroundColor:"white",
        borderWidth:1,
        borderRadius: 4,
        borderColor: '#808080',
        height: 50,
        width: "100%",
        justifyContent:"center",
        marginTop:5
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