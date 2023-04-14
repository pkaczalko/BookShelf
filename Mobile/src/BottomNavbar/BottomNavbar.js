import React from 'react';
import {StyleSheet, SafeAreaView, View, Modal, StatusBar, Platform} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TransitionSpecs, HeaderStyleInterpolators, CardStyleInterpolators, TransitionPresets   } from '@react-navigation/stack'
import {BottomNavigation, Text} from 'react-native-paper'
import AddBookManually from '../AddBook/AddBookManually';
import AddBookMenu from '../AddBook/AddBookMenu';
import AddBookViaISBN from '../AddBook/AddBookViaISBN';
import AddShelf from '../AddBook/AddShelf';
import AddCamera from '../AddBook/Camera/AddCamera';
import { CommonActions, NavigationContainer, useIsFocused } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Catalogue from '../MyBooks/Shelves';
import Tags from '../MyBooks/Tags';
import Categories from '../MyBooks/Categories';
import { Appbar } from 'react-native-paper';
import Shelves from '../MyBooks/Shelves';
import AddShelfBottomSheetPicture from '../AddBook/AddShelfBottomSheet';
import BottomSheet from '../AddBook/BottomSheet';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
const TopTab = createMaterialTopTabNavigator();

function AddRoute(){
    const AddBookMenuRoute = () => <AddBookMenu />
    const AddByHandRoute = () => <AddBookManually />
    const AddBookViaISBNRoute = () => <AddBookViaISBN />
    const AddShelfRoute = () => <AddShelf />
    const AddCameraRoute = () => <AddCamera />
    return(
        // ogarnac te screenoptions bo nie dziala
        <Stack.Navigator screenOptions={{gestureEnabled:true, gestureDirection:'horizontal', CardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS}}
                         headerMode="float" animation="fade" initialRouteName='addMenu'> 
            <Stack.Screen
                name="addMenu"
                component={AddBookMenuRoute}
                options={{title: 'Dodaj Nowe',}}
            />
             <Stack.Screen
                name="addBookManually"
                component={AddByHandRoute}
                options={{title: 'Dodaj Książkę Ręcznie',}}
            />
             <Stack.Screen
                name="addBookViaISBN"
                component={AddBookViaISBNRoute}
                options={{title: 'Dodaj Książkę przez ISBN',}}
            />
             <Stack.Screen
                name="addShelf"
                component={AddShelfRoute}
                initialParams={{ uri: null }}
                options={{title: 'Dodaj Nową Półkę',}}
            />
             <Stack.Screen
                name="addCamera"
                component={AddCameraRoute}
                options={{headerShown: false}}
             /> 
        </Stack.Navigator>
    )
}

function MyBooksRoute(){
    const TagsRoute = () => <Tags />
    const CategoriesRoute = () => <Categories />    
    const ShelvesRoute = () => <Shelves />
        return (
            <SafeAreaView style={{flex:1}}>
                <Appbar.Header style={{height:60, backgroundColor:"white"}} >
                    <Appbar.Content title="Moje Książki" titleStyle={{fontSize: 20, fontFamily:"sans-serif-medium"}}/>
                </Appbar.Header>

                <TopTab.Navigator>
                    <TopTab.Screen name="tags" component={TagsRoute} options={{title: "Tagi"}}/>
                    <TopTab.Screen name="categories" component={CategoriesRoute} options={{title:"Kategorie"}}/>
                    <TopTab.Screen name="shelves" component={ShelvesRoute} options={{title:"Półki"}}/>
                </TopTab.Navigator>
            </SafeAreaView>
          );
}

const WishListRoute = () => <Text>Wishlist</Text>
const FavouritesRoute = () => <Text>Favourites</Text>
const SettingsRoute = () => <Text>SettingsRoute</Text>

export default function App(){
    const routes = [{key: 'catalogue', title:"Katalog", component: MyBooksRoute, focusedIcon:"book", unfocusedIcon:"book-outline" },
                    {key: "favourites", title: "Ulubione", component: FavouritesRoute, focusedIcon:"heart", unfocusedIcon:"heart-outline"},
                    {key: "add", title: "Dodaj", component: AddRoute, focusedIcon: "plus-circle", unfocusedIcon: "plus-circle-outline"},
                    {key: "wishlist", title:"WishList", component: WishListRoute, focusedIcon:"book-plus", unfocusedIcon:"book-plus-outline"},
                    {key:'settings', title:"Ustawienia", component: SettingsRoute, focusedIcon:"account-settings",unfocusedIcon:"account-settings-outline"}]

    const refBottomSheet = React.useRef(null)
    const [bottomSheetVisible, setBottomSheetVisible] = React.useState(true)

    function onHandlePress(){
        const isActive = refBottomSheet?.current?.isActive()
        isActive ? refBottomSheet?.current?.scrollTo(0) : refBottomSheet?.current?.scrollTo(-250)
        refBottomSheet?.current?.setIsVisible(true);
    }

    function handelAddTabPress(e){
        e.preventDefault()
        onHandlePress()
    }    
    
    const handleBottomSheetMenu = (newParam) =>{
        setBottomSheetVisible(newParam)
    }
    
    const RoutesList = routes.map((route, index) =>{
        if (route.key === "add"){
            return(
                <Tab.Screen name={route.key} component={route.component} options={{tabBarLabel: route.title,
                    tabBarIcon: ({focused, color, size})  => {
                        if (focused){
                            return <Icon name={route.focusedIcon} size={size} color={color} />
                        }else{
                            return <Icon name={route.unfocusedIcon} size={size} color={color} />
                        }
                    }
                }} key={index} listeners={{
                    tabPress: e => {
                      handelAddTabPress(e)
                    },
                  }}/>
            )
        } else{
            return(
                <Tab.Screen name={route.key} component={route.component} options={{tabBarLabel: route.title,
                            tabBarIcon: ({focused, color, size})  => {
                                if (focused){
                                    return <Icon name={route.focusedIcon} size={size} color={color} />
                                }else{
                                    return <Icon name={route.unfocusedIcon} size={size} color={color} />
                                }
                            }
                }} key={index}/>
            )}
    })

    return(
        <NavigationContainer>

            <Tab.Navigator
                screenOptions={{
                    headerShown: false,

                }}
                tabBar={({ navigation, state, descriptors, insets }) => (
                    <BottomNavigation.Bar
                    navigationState={state}
                    safeAreaInsets={insets}
                    onTabPress={({ route, preventDefault }) => {
                        const event = navigation.emit({
                        type: 'tabPress',
                        target: route.key,
                        canPreventDefault: true,
                        });

                        if (event.defaultPrevented) {
                        preventDefault();
                        } else {
                        navigation.dispatch({
                            ...CommonActions.navigate({name: route.name, params: route.params }),
                            target: state.key,
                        });
                        }
                    }}
                    renderIcon={({ route, focused, color }) => {
                        const { options } = descriptors[route.key];
                        if (options.tabBarIcon) {
                        return options.tabBarIcon({ focused, color, size: 24 });
                        }

                        return null;
                    }}
                    getLabelText={({ route }) => {
                        const { options } = descriptors[route.key];
                        const label =
                        options.tabBarLabel !== undefined
                            ? options.tabBarLabel
                            : options.title !== undefined
                            ? options.title
                            : route.title;

                        return label;
                    }}
                    />
                )}
                initialRouteName="catalogue"
            >
            {RoutesList}
        </Tab.Navigator>
        {bottomSheetVisible && <BottomSheet ref={refBottomSheet} scale={3}>
            <AddBookMenu handleBottomSheetMenu={handleBottomSheetMenu}/>
        </BottomSheet>}
    </NavigationContainer>
)}

//config do przejsc miedzy pageami
// const transConfig = {
    //     animation: 'spring',
    //     config: {
    //       stiffness: 1000,
    //       damping: 500,
    //       mass: 3,
    //       overshootClamping: true,
    //       restDisplacementThreshold: 0.01,
    //       restSpeedThreshold: 0.01,
    //     },
    //   };
