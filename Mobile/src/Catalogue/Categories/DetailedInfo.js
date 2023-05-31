import React from "react";
import { Text, View, StyleSheet, ScrollView } from "react-native";
import { Modal, Portal, PaperProvider, Divider, Button } from "react-native-paper";
import { Rating} from 'react-native-elements';
import { Slider } from 'react-native-elements';
import ScrollPicker from 'react-native-wheel-scrollview-picker';
import _ from 'lodash'


export default function DetailedInfo({isbn, data}){
    const [pickerVisible, setPickerVisible] = React.useState(false)
    const [slidedPageNumber, setSlidedPageNumber] = React.useState(data.currentPage)
    const [renderedItems, setRenderedItems] = React.useState([]);
    const [isSaved, setIsSaved] = React.useState(true)
    const [editableData, setEditableData] = React.useState(data)
    const [save, setSave] = React.useState(false)
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
            .then(data => console.log(data))
            .catch(err => console.log(err))
            setSave(false)
        }
    },[save])

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

    return(
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
        </View>
    )
}

const styles = StyleSheet.create({
    rating:{
        color:"transparent",
        alignSelf:"flex-start",
        marginLeft: 15
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