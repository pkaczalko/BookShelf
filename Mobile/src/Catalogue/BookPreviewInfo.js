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
                const authors = bookData?.[0]?.authors
                let mappedAuthors = [{name: ""}]
                if (authors){
                    mappedAuthors = authors.map((author)=>{
                        return {name: author}
                    })
                }
                const categories = bookData?.[0]?.categories
                let mappedCategories = [{name: ""}]
                if (categories){
                    mappedCategories = categories.map((category)=>{
                        return {name: category}
                    })
                }
                const toSetData = {...bookData[0], authors: mappedAuthors, categories: mappedCategories}
                setData(toSetData)
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
            fetch('https://bookshelf-java.azurewebsites.net/books?id=' + data.id, {
                method: 'DELETE',
            })
            .catch(err => console.log(err))
            refBottomSheet?.current?.setIsVisible(false);
            setAlertVisible(false)
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

    const onWishListAddHandle = React.useCallback(()=>{
        fetch("https://bookshelf-java.azurewebsites.net/books?id=" + data.id, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({...data, wishList: !data.wishList})
            })
            .then(res => res.json())
            .then(data => console.log("Succeded PUT"))
            .catch(err => console.log(err))
            refBottomSheet?.current?.setIsVisible(false);
            navigation.goBack()
    })

    function handleConfirm(){
        setIsDeleted(true)
    }

    function handleAbort(){
        setAlertVisible(false)
    }

    const SimpleInfoRoute = () => <SimpleInfo data={data}  />
    const DetailedInfoRoute = () => <DetailedInfo data={data} />

    return(
        <SafeAreaProvider style={{flex:1, flexDirection:"column"}}>
            <View style={styles.container}>
                <Image src={data.imgURI} style={styles.img} resizeMethod="resize" resizeMode="contain" />
                <View style={{flex:1}}>
                    <Text style={styles.title} numberOfLines={2}>{data.title}</Text>
                    <Text style={styles.authors}>{authors}</Text>
                </View>
            </View>
            <TopTab.Navigator>
                <TopTab.Screen name="detailedInfo" component={DetailedInfoRoute} options={{title:"Szczegóły",swipeEnabled: false}}/>
                <TopTab.Screen name="simpleInfo" component={SimpleInfoRoute} options={{title:"Informacje",swipeEnabled: false}}/>
            </TopTab.Navigator>
           <BottomSheet ref={refBottomSheet} scale={3}>
                <List.Section style={styles.listContainer}>
                    <List.Item title={data.wishList ? "Usuń z WishListy" : "Dodaj do WishListy"} 
                            left={()=> <List.Icon icon="heart" style={styles.listIcon}/>} onPress={onWishListAddHandle}/>
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