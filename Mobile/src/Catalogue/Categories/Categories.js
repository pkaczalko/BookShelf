import React from 'react'
import { View, Text, StyleSheet} from 'react-native'
import { FlatList, NativeViewGestureHandler, ScrollView } from 'react-native-gesture-handler'
import BottomSheet from '../../Components/BottomSheet'
import { IconButton, Chip, Button, Divider, Card } from 'react-native-paper'
import CategoryCheckBox from './Components/CategoryCheckBox'
import Book from './Components/Book'

export default function Categories() {
  const refBottomSheet = React.useRef()
  
  // const fetchedData =[{title: "Thriller", id: 14},
  //                     {title: "Horror", id: 1},
  //                     {title: "Technika", id: 2},
  //                     {title: "Biografia", id: 3},
  //                     {title: "Poezja", id: 4},
  //                     {title: "Fantasy", id: 5},
  //                     {title: "Sci-Fi", id: 6},
  //                     {title: "Przygodowe", id: 7},
  //                     {title: "Sport", id: 8},
  //                     {title: "Naukowe", id: 9},
  //                     {title: "asdasd", id: 10},
  //                     {title: "asdasd", id: 11},
  //                     {title: "asdasd", id: 12},
  //                     {title: "asdasd", id: 13}]
  // const editedData = fetchedData.map(item => ({...item, isChecked: false}))

  const [data, setData] = React.useState()


  React.useEffect(()=>{
    fetch('http://192.168.0.80:8081/books?q=')
    .then(res => res.json())
    .then((fetched_data) =>{
        const editedData = fetched_data.map(item => ({...item, isChecked: false}))
        setData(editedData)
    })
    .catch(err => console.log(err))
},[])

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
    setData(updatedData)
  }

  const renderCategoryCheckbox = ({item}) => {
    return <CategoryCheckBox title={item.title} isChecked={item.isChecked} onChecked={() => handleCheck(item.id)} />
  }

  const renderFilterChip = ({item}) =>{
    if (item.isChecked === true){
      return <Chip icon="check" mode="flat" elevated={true} elevation={1}
                  style={styles.chipContainer} onClose={() => handleCheck(item.id)} 
                  onPress={()=>{console.log("pressed")}}>{item.title}</Chip>
    }
  }

  const renderBooks = ({item}) =>{
    return (
      <Book title={item.title} authors={item.authors} imgURI={item.imgURI}/>
    )
  }
  return (
    <NativeViewGestureHandler>
      <View style={styles.container}>
        <Button icon="filter" mode='contained-tonal' elevated={true} elevation={4} 
                onPress={onHandlePress} style={styles.filterButton}>Filtruj</Button>
        <FlatList data={data} renderItem={renderFilterChip} keyExtractor={item => item.id} horizontal={true}/>
        <Divider bold={true}/>  
        <FlatList data={data} renderItem={renderBooks} keyExtractor={item => item.id} numColumns={1} /> 
        <BottomSheet ref={refBottomSheet} scale={1.09}>
          <Divider bold={true}/>
          <Text style={styles.categoryTitle}>Kategorie</Text>
          <FlatList data={data} renderItem={renderCategoryCheckbox} keyExtractor={item => item.id}/>
        </BottomSheet>
      </View>
    </NativeViewGestureHandler>
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
    marginBottom:18,
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
