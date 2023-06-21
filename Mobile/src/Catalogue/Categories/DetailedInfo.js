import React from "react";
import { Text, View, StyleSheet, ScrollView } from "react-native";
import { Keyboard } from 'react-native';
import { Modal, Portal, PaperProvider, Divider, Button, List, TextInput, IconButton } from "react-native-paper";
import { Rating} from 'react-native-elements';
import { Slider } from 'react-native-elements';
import {Picker} from "@react-native-picker/picker"
import ScrollPicker from 'react-native-wheel-scrollview-picker';
import { useNavigation } from "@react-navigation/native";
import _, { upperCase } from 'lodash'


export default function DetailedInfo({isbn, data}){
    const navigation = useNavigation()
    const [pickerVisible, setPickerVisible] = React.useState(false)
    const [slidedPageNumber, setSlidedPageNumber] = React.useState(data?.currentPage)
    const [renderedItems, setRenderedItems] = React.useState([]);
    const [isSaved, setIsSaved] = React.useState(true)
    const [editableData, setEditableData] = React.useState(data)
    const [save, setSave] = React.useState(false)
    const [shelves, setShelves] = React.useState([])
    const [focused, setFocused] = React.useState(false)
    const [keyboardVisible, setKeyboardVisible] = React.useState(false);
    const [borrower, setBorrower] = React.useState("")
    const [disableBorrower, setDisableBorrower] = React.useState(data.borrower ? true : false)
    const [showBorrowerInput, setBorrowerInput] = React.useState(data.borrower ? true : false)
    const borrowerRef = React.useRef(null)

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
            if(borrowerRef?.current !== null)
                borrowerRef?.current.blur();
          }
        );
      
        return () => {
          keyboardDidShowListener.remove();
          keyboardDidHideListener.remove();
        };
    }, []);

    const pageList = Array.from({ length: data.pageCount }, (_, index) => index + 1)

    function ratingOnFinishHandle(rating){
        setEditableData((prevData)=> ({...prevData, rating: rating}))
    }

    function onSliderChangeHandle(page){
        setEditableData((prevData)=> ({...prevData, currentPage: page}))
    }

    function onPageButtonPress(){
        setEditableData({...editableData, currentPage: slidedPageNumber})
        setPickerVisible(false)
    }

    const renderItemsOnce = () => {
        const items = pageList.map((data, index) => (
          <Text key={index} style={{ alignSelf: "center" }}>
            {data}
          </Text>
        ));
        setRenderedItems(items);
    };


    function onHandleSave(){
        setSave(true)
        setIsSaved(true)
    }

    React.useEffect(()=>{
        if (save === true){
            fetch("https://bookshelf-java.azurewebsites.net/books?id=" + data.id, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(editableData)
            })
            .then(res => res.json())
            .then(data => console.log("Succeded PUT"))
            .catch(err => console.log(err))
            setSave(false)
        }
    },[save])

    React.useEffect(()=>{
        fetch("https://bookshelf-java.azurewebsites.net/shelves") 
            .then(res => res.json())
            .then((shelves) => {
                setShelves(shelves)
            })
            .catch((err) =>{
                console.log(err)
            })
    }, [])

    React.useEffect(()=>{
        renderItemsOnce()
    },[])

    React.useEffect(()=>{
        if (_.isEqual(editableData, data)){
            setIsSaved(true)
        }
        else{
            setIsSaved(false)
        }
    },[editableData])

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
            navigation.navigate('home')
    })

    const shelvesItems = shelves.map((shelf, idx)=>{
        return(
            <Picker.Item label={shelf?.name} value={shelf?.name} key={shelf?.id}/>
        )
    })

    const handleBorrowerBtnClick = () =>{
        setDisableBorrower(false)
        setBorrowerInput(true)
    }

    const handleBorrowerDelete = () =>{
        setEditableData((prevData) => ({...prevData, borrower:null}))
        setBorrowerInput(false)
    }

    return(
        <View style={{flex:1}}>
            {data.wishList ? 
            <View style={{flexDirection:"column", alignContent:"space-between"}}>
                <Text style={{fontSize: 28, alignSelf:"center", marginTop:20}}>Obecnie na liście życzeń</Text>
                <Button mode="contained" onPress={onWishListAddHandle} style={[styles.saveButton,{marginTop:20}]}>Już posiadam tą książkę - Dodaj</Button>
            </View>
            :
            <View style={{flex:1}}>
                <ScrollView style={{flex:1}}>
                    <Text style={styles.ratingTitle}>Ocena</Text>
                    <Rating imageSize={40} startingValue={editableData.rating} style={styles.rating} tintColor="rgb(240,242,240)" onFinishRating={ratingOnFinishHandle}/>
                    <Text style={[styles.ratingTitle, {marginBottom:-5}]}>Przeczytane Strony</Text>
                    <View style={styles.pageContainer}>
                        <Slider value={editableData.currentPage} thumbStyle={{ height: 20, width: 7, backgroundColor: '#606060', borderRadius: 0}}
                                trackStyle={{ height: 7, backgroundColor: 'transparent' }} style={styles.currentPageProgress} 
                                minimumValue={0} maximumValue={editableData.pageCount} step={1} onValueChange={onSliderChangeHandle}/>
                        <Text style={styles.pageText} onPress={() => setPickerVisible(true)}>{editableData.currentPage}/{editableData.pageCount}</Text>
                    </View>
                    <Text style={[styles.ratingTitle, {marginBottom:2, marginTop:8}]}>Przypisanie Półki</Text>
                    {editableData.shelf ? 
                    <View style={styles.picker}>
                        <Picker selectedValue={editableData.shelf.name}
                                onValueChange={(itemValue, itemIndex) => {setEditableData({...editableData, shelf: {id: itemIndex + 1, name: itemValue}})}}>
                            {shelvesItems}
                        </Picker>
                    </View>
                        :
                    <View style={styles.picker}>
                        <Picker selectedValue={"Nie przypisano"}
                                onValueChange={(itemValue, itemIndex) => {setEditableData({...editableData, shelf: {id: itemIndex, name: itemValue}})}}>
                            <Picker.Item label="Nie przypisano" value="none" />
                            {shelvesItems}
                        </Picker>
                    </View>}
                    <Text style={[styles.ratingTitle, {marginBottom:-8}]}>Wypożyczenia</Text>
                    <List.Item
                        left={() => <Button mode="outlined" textColor="black" onPress={handleBorrowerBtnClick} style={styles.borrowBtn}>
                                    {editableData.borrower ? "Edytuj" : "Wypożycz"}
                                    </Button>}
                        right={()=>{
                            if (showBorrowerInput)
                                return (
                                    <View style={{flexDirection:"row"}}>
                                        <TextInput mode="outlined" label={editableData.borrower && focused === false ? "" : "Kto wypożycza?"} 
                                                placeholder={data.borrower} onFocus={() => setFocused(true)} onBlur={() => setFocused(false)} 
                                                style={{width:"65%", marginRight:0}} ref={borrowerRef} value={borrower} 
                                                onChangeText={(value) => {
                                                    setBorrower(value)
                                                    setEditableData((prevData)=>({...prevData, borrower: value}))
                                                }} disabled={disableBorrower}/>
                                        <IconButton icon="close" iconColor="black" size={25} onPress={handleBorrowerDelete} 
                                                    style={[styles.authorExit]} disabled={disableBorrower}/>
                                    </View>
                                )}
                            }
                    />
                </ScrollView>
                <Divider bold={true}/>
                <View style={[styles.buttons]}>
                    <Button disabled={isSaved} mode="contained" icon="square-edit-outline" onPress={onHandleSave} style={styles.saveButton}>Zapisz</Button>
                </View>
                <Portal>
                    <Modal contentContainerStyle={styles.pageModal} visible={pickerVisible} onDismiss={() => setPickerVisible(false)}>
                        <View style={{flex:1}}>
                            <Text style={{marginTop:10, alignSelf:"center", flex:0.2, fontSize:20, fontWeight:"bold"}}>Przeczytane Strony</Text>
                            <Divider bold={true}/>
                            <ScrollPicker style={{alignSelf:"center", flex:0.6}} 
                                                dataSource={pageList}
                                                selectedIndex={editableData.currentPage}
                                                renderItem={(data, index) => {
                                                    return renderedItems[index]
                                                }}
                                                onValueChange={(data, selectedIndex) => {
                                                    setSlidedPageNumber(data)
                                                }}
                                                wrapperHeight={220}
                                                wrapperWidth={100}
                                                wrapperColor='#FFFFFF'
                                                itemHeight={60}
                                                highlightColor='black'
                                                highlightBorderWidth={2}/>
                            <Divider bold={true}/>
                            <Button style={{flex:0.2, marginTop: 10, marginBottom:10}} mode="contained" onPress={onPageButtonPress}>Gotowe</Button>
                        </View>
                    </Modal>
                </Portal>
            </View>}
        </View>
    )
}

const styles = StyleSheet.create({
    rating:{
        color:"transparent",
        alignSelf:"flex-start",
        marginLeft: 15
    },
    borrowBtn:{
        margin:8,
        alignContent:"center",
        alignItems:"center",
        justifyContent:"center"
    },
    ratingTitle:{
        marginLeft: 20,
        marginTop:20,
        marginBottom:10,
        fontWeight:"bold",
        fontSize:12,
        maxWidth:"100%",
        textTransform:"uppercase"
    },
    currentPageProgress:{
        margin:10,
        flex: 0.8
    },
    picker:{
        borderWidth:1,
        borderRadius: 4,
        borderColor: '#808080',
        height: 50,
        width: "95%",
        justifyContent:"center",
        margin:10, 
        marginRight:20
    },
    pageContainer:{
        flexDirection:"row",
        marginLeft:10
    },
    pageText:{
        flex:0.2,
        alignSelf:"center",
        marginLeft:5
    },
    pageModal:{
        height:330,
        width:250,
        alignItems:"center",
        alignSelf:"center",
        backgroundColor:"white"
    },
    authorExit:{
        alignSelf:"center",
        marginTop: 10,
        marginLeft:0
    },
    buttons:{
        flexDirection:"row",
        justifyContent:"space-around"
    },
    saveButton:{
        width: "100%",
        justifyContent:"flex-end",
        borderRadius:0
    },
})