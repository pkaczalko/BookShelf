import React from "react";
import { Appbar} from "react-native-paper";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { SafeAreaView, View } from "react-native";
import Tags from "../../Catalogue/Tags/Tags";
import Categories from "../../Catalogue/Categories/Categories";
import Shelves from "../../Catalogue/Shelves/Shelves";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import SetTabBar from "../Components/SetTabBar";
import BottomSheet from "../../Components/BottomSheet";
import AddMenu from "../../Add/AddMenu";

import SettingsRoute from "./SettingsRoute";
import WishListRoute from "./WishListRoute";
import SearchRoute from "./SearchRoute";
import AddRoute from "./AddRoute";
import CatalogueRoute from "./CatalogueRoute";

export default function HomeRoute(){
    const Tab = createBottomTabNavigator();

    const routes = [{key: 'catalogue', title:"Katalog", component: CatalogueRoute, focusedIcon:"book", unfocusedIcon:"book-outline" },
                    {key: "search", title: "Szukaj", component: SearchRoute, focusedIcon:"magnify-plus", unfocusedIcon:"magnify-plus-outline"},
                    {key: "add", title: "Dodaj", component: AddRoute, focusedIcon: "plus-circle", unfocusedIcon: "plus-circle-outline"},
                    {key: "wishlist", title:"WishList", component: WishListRoute, focusedIcon:"book-plus", unfocusedIcon:"book-plus-outline"},
                    {key:'settings', title:"Ustawienia", component: SettingsRoute, focusedIcon:"account-settings",unfocusedIcon:"account-settings-outline"}]


    const refBottomSheet = React.useRef(null)
    const [bottomSheetVisible, setBottomSheetVisible] = React.useState(true)

    React.useEffect(()=>{
        setBottomSheetVisible(true)
    },[bottomSheetVisible])

    function onHandlePress(){
        const isActive = refBottomSheet?.current?.isActive()
        isActive ? refBottomSheet?.current?.scrollTo(0) : refBottomSheet?.current?.scrollTo(-250)
        refBottomSheet?.current?.setIsVisible(true);
    }

    function handleTabPress(e){
        e.preventDefault()
        onHandlePress()
    }

    const handleBottomSheetMenu = (newParam) =>{
        setBottomSheetVisible(newParam)
    }

    const setIcon = ({focused, color, size}, route) => {
        if (focused){
            return <Icon name={route.focusedIcon} size={size} color={color} />
        } else{
            return <Icon name={route.unfocusedIcon} size={size} color={color} />
        }
    }

    const RoutesList = routes.map((route, index) =>{
    if (route.key === "add"){
        return(
            <Tab.Screen name={route.key} component={route.component} options={{tabBarLabel: route.title, 
                        tabBarIcon: ({focused, color, size}) => setIcon({focused, color, size}, route)}} 
                        key={index} listeners={{ tabPress: handleTabPress}} />
        )
    } else{
        return(
            <Tab.Screen name={route.key} component={route.component} options={{tabBarLabel: route.title,
                        tabBarIcon: ({focused, color, size}) => setIcon({focused, color, size}, route)}}
                        key={index}/>
        )}
    })


        return (
            <View style={{flex:1}}>
                <Tab.Navigator id='MainScreen' screenOptions={{headerShown: false}} tabBar={SetTabBar} initialRouteName="catalogue">
                    {RoutesList}
                </Tab.Navigator>
                {bottomSheetVisible && <BottomSheet ref={refBottomSheet} scale={3}>
                    <AddMenu handleBottomSheetMenu={handleBottomSheetMenu}/>
                </BottomSheet>}
            </View>
          );
}