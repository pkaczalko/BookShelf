import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { Modal, Portal, PaperProvider, Divider, Button } from "react-native-paper";
import { Rating} from 'react-native-elements';
import { Slider } from 'react-native-elements';
import ScrollPicker from 'react-native-wheel-scrollview-picker';


export default function DetailedInfo({isbn, data}){
    const [currentPage, setCurrentPage] = React.useState(data.currentPage)
    const [pickerVisible, setPickerVisible] = React.useState(false)
    const [slidedPageNumber, setSlidedPageNumber] = React.useState(currentPage)
    const [renderedItems, setRenderedItems] = React.useState([]);
    const pageList = Array.from({ length: data.pageCount }, (_, index) => index + 1)

    function ratingCompleted(rating){
        console.log(rating)
    }

    function pageSlide(value){
        setCurrentPage(value)
    }

    function onPageChange(page){
        console.log(pickerVisible)
        setCurrentPage(page)
    }

    function onPageButtonPress(){
        setCurrentPage(slidedPageNumber)
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

    React.useEffect(()=>{
        renderItemsOnce()
    },[])

    return(
        <View>
            <Text style={styles.ratingTitle}>Ocena</Text>
            <Rating imageSize={40} startingValue={data.rating} style={styles.rating} tintColor="rgb(240,242,240)" onFinishRating={ratingCompleted}/>
            <Text style={[styles.ratingTitle, {marginBottom:-5}]}>Przeczytane Strony</Text>
            <View style={styles.pageContainer}>
                <Slider value={currentPage} onValueChange={pageSlide} thumbStyle={{ height: 20, width: 7, backgroundColor: '#606060', borderRadius: 0}}
                        trackStyle={{ height: 7, backgroundColor: 'transparent' }} style={styles.currentPageProgress} 
                        minimumValue={0} maximumValue={data.pageCount} step={1}/>
                <Text style={styles.pageText} onPress={() => setPickerVisible(true)}>{currentPage}/{data.pageCount}</Text>
            </View>
            <Portal>
                <Modal contentContainerStyle={styles.pageModal} visible={pickerVisible} onDismiss={() => setPickerVisible(false)}>
                    <View style={{flex:1}}>
                        <Text style={{marginTop:10, alignSelf:"center", flex:0.2, fontSize:20, fontWeight:"bold"}}>Przeczytane Strony</Text>
                        <Divider bold={true}/>
                        <ScrollPicker style={{alignSelf:"center", flex:0.6}} 
                                            dataSource={pageList}
                                            selectedIndex={slidedPageNumber}
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
    }
})