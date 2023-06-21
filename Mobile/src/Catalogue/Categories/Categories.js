import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity} from 'react-native'
import { FlatList, NativeViewGestureHandler, ScrollView } from 'react-native-gesture-handler'
import BottomSheet from '../../Components/BottomSheet'
import { Searchbar, IconButton, Chip, Button, Divider, Card, ActivityIndicator, MD2Colors } from 'react-native-paper'
import { useIsFocused } from '@react-navigation/native'
import ShelfCheckBox from './Components/ShelfCheckBox'
import DetailedView from './Components/DetailedView'
import SimpleView from './Components/SimpleView'
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function Categories() {
  const refBottomSheet = React.useRef()
  const isFocused = useIsFocused()

  const [data, setData] = React.useState()
  const [searchQuery, setSearchQuery] = React.useState('')
  const [isLoaded, setIsLoaded] = React.useState(true)
  const [shelves, setShelves] = React.useState([])
  const [viewType, setViewType] = React.useState({type:'detailed', icon:'view-comfy'})
  const [showMore, setShowMore] = React.useState(false)

  React.useEffect(()=>{
    if(isFocused){
      fetch('https://bookshelf-java.azurewebsites.net/shelves')
      .then(res => res.json())
      .then((fetched_data) =>{
          const editedData = fetched_data.map(item => ({...item, isChecked: false}))
          editedData.some(item => item.name === "Wypożyczone") ? editedData : editedData.push({id: fetched_data.length + 1, name:"Wypożyczone", isChecked: false})
          editedData.some(item => item.name === "WishList") ? editedData : editedData.push({id: fetched_data.length + 2, name:"WishList", isChecked: false})
          setShelves(editedData)
      })
      .catch(err => console.log(err))

      setIsLoaded(true)
    }
  },[isFocused])

  React.useEffect(()=>{
    fetch('https://bookshelf-java.azurewebsites.net/books?q=' + searchQuery)
    .then(res => res.json())
    .then((fetched_data) =>{
        let editedData = [...fetched_data]
        const checkedShelves = shelves.filter(item => item.isChecked)
        if (checkedShelves.length > 0){
          if (checkedShelves.filter(shelf => shelf.name === "Wypożyczone").length === 1){
            checkedShelves.pop()
            fetched_data = fetched_data.filter(item => item.borrower !== null)
          }

          if (checkedShelves.filter(shelf => shelf.name === "WishList").length === 1){
            checkedShelves.pop()
            fetched_data = fetched_data.filter(item => item.wishList === true)
          }

          if(checkedShelves.length > 0){
            editedData = fetched_data.map(item => {
              if (checkedShelves.filter(shelf => shelf.name === item.shelf.name).length === 1){
                  return {...item}
              }
            })
          } else {
            editedData = [...fetched_data]
          }

          const filteredEditedData = editedData.filter(item => item !== undefined);
          setData(filteredEditedData)
        }else{
          setData(fetched_data)
        }
        setIsLoaded(false)
    })
    .catch(err => console.log(err))
  },[shelves, isFocused, searchQuery])

  function onHandlePress(){
    const isActive = refBottomSheet?.current?.isActive()
    isActive ? refBottomSheet?.current?.scrollTo(0) : refBottomSheet?.current?.scrollTo(-660)
    refBottomSheet?.current?.setIsVisible(true);
  }

  const handleCheck = (id) => {
    const updatedData = shelves.map(item => {
      if (item.id === id) {
        return {...item, isChecked: !item.isChecked};
      }
      return item;
    });
    setShelves(updatedData)
  }

  const renderShelvesCheckbox= ({item}) => {
   return <ShelfCheckBox title={item.name} isChecked={item.isChecked} onChecked={() => handleCheck(item.id)} />
  }

  const renderFilterChip = ({item}) =>{
    if (item.isChecked === true){
      return <Chip icon="check" mode="flat" elevated={true} elevation={1}
                  style={styles.chipContainer} onClose={() => handleCheck(item.id)} 
                  onPress={()=>{console.log("pressed")}}>{item.name}</Chip>
    }
  }

  const handelOnViewChange = () =>{
    if (viewType.type === 'detailed'){
      setViewType({type:'simple', icon:'view-column'})
    }
    else if (viewType.type === 'simple'){
      setViewType({type:'detailed', icon:'view-comfy'})
    }
  }

  return (
    <NativeViewGestureHandler>
      <View style={[styles.container, {flex: (data?.length > 1 && viewType.type === "detailed") ? 1 : 0}]}>
        <View style={{flexDirection:"row", justifyContent:"space-between", alignItems:"center"}}>
         <Searchbar elevation={1} placeholder='Szukaj' onChangeText={(query) => setSearchQuery(query)} value={searchQuery}
                     style={{ flex:0.9, backgroundColor:"white", height:40, alignItems:"center", margin: 10, borderWidth:0.5}}
                     inputStyle={{marginTop:-7}} right={()=>{ 
                     return <IconButton icon="tune" size={20} mode='contained-tonal' onPress={onHandlePress} 
                                        style={{backgroundColor:'white'}}/>}}/>
          <IconButton icon={viewType.icon} size={20} onPress={handelOnViewChange} style={{flex:0.1}}/>
        </View>
        <FlatList data={shelves} renderItem={renderFilterChip} keyExtractor={item => item.id} horizontal={true}/>
        <Divider bold={true}/>  

        {viewType.type === "detailed" ? <DetailedView data={data}/>
        : <SimpleView data={data}/>}

        <BottomSheet ref={refBottomSheet} scale={1.09}>
          <Divider bold={true}/>
          <Text style={styles.categoryTitle}>Półki</Text>

          {shelves.length < 4 ? <FlatList data={shelves} renderItem={renderShelvesCheckbox} keyExtractor={item => item.id}/>
          : <View> 
              <FlatList data={showMore ? shelves.slice(0, -2) : shelves.slice(0,5)} renderItem={renderShelvesCheckbox} keyExtractor={item => item.id}/>
              <TouchableOpacity style={{flexDirection:"row"}} onPress={() => setShowMore(!showMore)}>
                  <Text style={styles.showMore}>{showMore ? 'Pokaż mniej' : 'Pokaż więcej'}</Text>
                  <Icon name={showMore ? "expand-less" : "expand-more"} size={20} style={{alignSelf:"center"}} color="black"></Icon>
              </TouchableOpacity>
            </View>}
          <Divider style={{marginTop:20, marginBottom:20}} bold={true}/>

          <ShelfCheckBox title="Wypożyczone" isChecked={shelves.find(item => item.name === "Wypożyczone")?.isChecked} onChecked={() => handleCheck(shelves.length - 1)}/>
          <ShelfCheckBox title="Na liście życzeń" isChecked={shelves.find(item => item.name === "WishList")?.isChecked} onChecked={() => handleCheck(shelves.length)}/>
        </BottomSheet>
      </View>
    </NativeViewGestureHandler>
  )
}

const styles = StyleSheet.create({
  container:{
    flexDirection:"column"
  },
  filterButton:{
    alignSelf:"flex-start",
    margin:10,
    backgroundColor:"white",
    marginTop:0,
    borderWidth:0.5,
  },
  showMore:{
    justifyContent:"space-between",
    alignItems:"flex-start",
    flexDirection:"row",
    marginLeft:10,
    marginBottom:5,
    fontSize:17,
    fontWeight:500,
    textDecorationLine: "underline"
  },
  chipContainer:{
    marginLeft:10,
    marginBottom:18,
    alignSelf:"flex-start", 
    height:35, 
    width:"auto",
    backgroundColor:"white",
  },  
  categoryTitle:{
    fontSize:18,
    fontWeight:"bold",
    margin:10,
    fontWeight:600,
  }
})
