import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AddMenu from '../Add/AddMenu';
import {NavigationContainer} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import BottomSheet from '../Components/BottomSheet';
import SetTabBar from './Components/SetTabBar';

import SettingsRoute from './BottomRoutes/SettingsRoute';
import WishListRoute from './BottomRoutes/WishListRoute';
import SearchRoute from './BottomRoutes/SearchRoute';
import AddRoute from './BottomRoutes/AddRoute';
import CatalogueRoute from './BottomRoutes/CatalogueRoute';

export default function BottomNavbar(){
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
                            key={index} listeners={{ tabPress: handleTabPress}}/>
            )
        } else{
            return(
                <Tab.Screen name={route.key} component={route.component} options={{tabBarLabel: route.title,
                            tabBarIcon: ({focused, color, size}) => setIcon({focused, color, size}, route)}}
                            key={index}/>
            )}
    })
    
    return(
        <NavigationContainer>
            <Tab.Navigator id='MainScreen' screenOptions={{headerShown: false}} tabBar={SetTabBar} initialRouteName="catalogue">
                {RoutesList}
            </Tab.Navigator>

            {bottomSheetVisible && <BottomSheet ref={refBottomSheet} scale={3}>
                <AddMenu handleBottomSheetMenu={handleBottomSheetMenu}/>
            </BottomSheet>}
        </NavigationContainer>
)}