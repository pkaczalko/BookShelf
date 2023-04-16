import React from 'react'
import { View, Text, StyleSheet} from 'react-native'
import { FlatList, NativeViewGestureHandler, ScrollView } from 'react-native-gesture-handler'
import BottomSheet from '../AddBook/BottomSheet'
import { IconButton, Chip, Button, Divider } from 'react-native-paper'
import CategoryCheckBox from './CategoryCheckBox'

export default function Categories() {
  const refBottomSheet = React.useRef()
  
  const fetchedData =[{title: "asdasd", id: 14},
                      {title: "asdasd", id: 1},
                      {title: "asdasd", id: 2},
                      {title: "asdasd", id: 3},
                      {title: "asdasd", id: 4},
                      {title: "asdasd", id: 5},
                      {title: "asdasd", id: 6},
                      {title: "asdasd", id: 7},
                      {title: "asdasd", id: 8},
                      {title: "asdasd", id: 9},
                      {title: "asdasd", id: 10},
                      {title: "asdasd", id: 11},
                      {title: "asdasd", id: 12},
                      {title: "asdasd", id: 13}]
  const editedData = fetchedData.map(item => ({...item, isChecked: false}))

  const [data, setData] = React.useState(editedData)


  function onHandlePress(){
    const isActive = refBottomSheet?.current?.isActive()
    isActive ? refBottomSheet?.current?.scrollTo(0) : refBottomSheet?.current?.scrollTo(-660)
    refBottomSheet?.current?.setIsVisible(true);
  }

  const handleCheck = (id) => {
    const updatedData = data.map(item => {
      if (item.id === id) {
        return {...item, isChecked: !item.isChecked};
      }
      return item;
    });
    setData(updatedData);
  }

  const renderCategoryCheckbox = ({item}) => {
    return <CategoryCheckBox title={item.title} isChecked={item.isChecked} onChecked={() => handleCheck(item.id)} />
  }

  return (
    <View style={styles.container}>
      <Button icon="filter" mode='contained-tonal' elevated={true} elevation={4} onPress={onHandlePress} style={styles.filterButton}>Filtruj</Button>
      <Chip icon="check" mode='flat' elevated={true} elevation={1} 
            style={styles.chipContainer} onClose={()=>console.log("close")} onPress={()=>console.log("pressed")}>Chip</Chip>
        <BottomSheet ref={refBottomSheet} scale={1.09}>
          <Divider bold={true}/>
          <Text style={styles.categoryTitle}>Kategorie</Text>
          <FlatList data={data} renderItem={renderCategoryCheckbox} keyExtractor={item => item.id}/>
        </BottomSheet>
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    flexDirection:"column"
  },
  filterButton:{
    alignSelf:"flex-start",
    margin:10,
    borderWidth:0.5,
    borderColor:"black",
    backgroundColor:"white"
  },
  chipContainer:{
    marginLeft:10,
    alignSelf:"flex-start", 
    height:35, 
    width:"auto",
    backgroundColor:"white"
  },  
  categoryTitle:{
    fontSize:20,
    fontWeight:"bold",
    margin:10
  }
})
