import React from "react"
import { View, StyleSheet, Text, Image, TouchableOpacity, SafeAreaView, ScrollView, StatusBar, Modal as RNModal } from "react-native"
import { useRoute, useNavigation, CommonActions } from "@react-navigation/native"
import { Divider, Button, Appbar, IconButton, List, Portal, Dialog } from "react-native-paper"
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import DescriptionPreview from "../Add/AddBook/Components/DescriptionPreview"
import {SafeAreaProvider} from "react-native-safe-area-context"
import BottomSheet from "../Components/BottomSheet"
import SimpleInfo from "./Categories/SimpleInfo";
import DetailedInfo from "./Categories/DetailedInfo";

export default function BookPreviewInfo(props){
    const TopTab = createMaterialTopTabNavigator();

    const navigation = useNavigation()
    const route = useRoute()
    const [data, setData] = React.useState({id: 0,
                                            title: "",
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
                                        
    const [bottomSheetVisible, setBottomSheetVisible] = React.useState(false)
    const [isDeleted, setIsDeleted] = React.useState(false)
    const [alertVisible, setAlertVisible] = React.useState(false)
    const refBottomSheet = React.useRef()

    function check(param){
        return param ? param : "Brak"
    }

    React.useEffect(() => {
        navigation.setOptions({headerShown:true})
        if (route.params?.isbn) {
            fetch("https://bookshelf-java.azurewebsites.net/books?q=" + route.params.isbn) 
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
                const id = bookData?.[0]?.id
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
                setData({...data, id: check(id), title: check(title), authors: mappedAuthors, publisher: check(publisher), publishedDate: check(publishedDate), isbn: check(isbn), 
                    imgURI: check(imgURI), description: check(description), categories: mappedCategories})

            })
            .catch((err) =>{
                setData({...data, isFound: false})
            })
        }
        else if(route?.params?.data){
            setData({...route.params.data})
        }
    }, [route?.params?.data, route?.params?.isbn]);

    React.useEffect(()=>{
        navigation.setOptions({headerRight: () =>{
            return(
                <IconButton
                icon="dots-vertical"
                style={{marginRight:-9}}
                onPress={() => {
                    console.log("options")
                    onHandlePress()
                }}
            />)
        }})
    },[])

    React.useEffect(()=>{
        if(isDeleted === true){
            console.log(data.id)
            fetch('https://bookshelf-java.azurewebsites.net/books?isbn=' + data.isbn, {
                method: 'DELETE',
            })
            .catch(err => console.log(err))
            navigation.goBack()
        }
    },[isDeleted])

    const authors = data.authors.map((author, idx)=>{
        return <Text style={[styles.title, {fontSize:15, fontWeight:"normal", color:"#888888"}]} key={idx}>{author.name}</Text>
    })

    function onHandlePress(){
        const isActive = refBottomSheet?.current?.isActive()
        isActive ? refBottomSheet?.current?.scrollTo(0) : refBottomSheet?.current?.scrollTo(-250)
        refBottomSheet?.current?.setIsVisible(true);
    }

    function onDeleteHandle(){
        setAlertVisible(true)
    }

    function handleConfirm(){
        setIsDeleted(true)
    }

    function handleAbort(){
        setAlertVisible(false)
    }

    const SimpleInfoRoute = () => <SimpleInfo data={data} />
    const DetailedInfoRoute = () => <DetailedInfo />

    return(
        <SafeAreaProvider style={{flex:1, flexDirection:"column"}}>
            {data.isFound && <View style={styles.container}>
                <Image src={data.imgURI} style={styles.img} resizeMethod="resize" resizeMode="contain" />
                <View style={{flex:1}}>
                    <Text style={styles.title} numberOfLines={2}>{data.title}</Text>
                    <Text style={styles.authors}>{authors}</Text>
                </View>
            </View>}
            <TopTab.Navigator>
                <TopTab.Screen name="simpleInfo" component={SimpleInfoRoute} options={{title:"Informacje"}}/>
                <TopTab.Screen name="detailedInfo" component={DetailedInfoRoute} options={{title:"Szczegóły"}}/>
            </TopTab.Navigator>
            {data.isFound === false && <Text>Nie rozpoznano książki</Text>}
           <BottomSheet ref={refBottomSheet} scale={3}>
                <List.Section style={styles.listContainer}>
                    <List.Item title="Dodaj do WishListy" left={()=> <List.Icon icon="heart" style={styles.listIcon}/>}
                            onPress={()=>console.log("wishlisted")}/>
                    <List.Item title="Usuń" left={()=> <List.Icon icon="delete" style={styles.listIcon}/>}
                            onPress={onDeleteHandle}/>
                </List.Section>
            </BottomSheet>
            <Portal>
            <RNModal visible={alertVisible} transparent={true}>
                <Dialog visible={alertVisible} style={{justifyContent:"center", backgroundColor:"white"}} dismissable={false}>
                    <Dialog.Content>
                        <Text style={{fontSize:16}}>Czy napewno chcesz usunąć książkę?</Text>
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button onPress={handleAbort}>Nie</Button>
                        <Button onPress={handleConfirm}>Tak</Button>
                    </Dialog.Actions>
                </Dialog>
            </RNModal>
            </Portal>
        </SafeAreaProvider>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:0.32,
        flexDirection:"row",
        height:"50%",
        backgroundColor:'white'
    },
    img:{
        width:"30%",
        height:"95%",
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