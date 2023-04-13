import { Dimensions, StatusBar, StyleSheet, Text, TouchableOpacity, View, Modal } from 'react-native'
import React, { useCallback } from 'react'
import { Gesture, GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler'
import Animated, {Extrapolate, event, interpolate, runOnJS, useAnimatedStyle, useSharedValue, withSpring, withTiming} from 'react-native-reanimated'

const {height: SCREEN_HEIGHT} = Dimensions.get('window')
const MAX_TRANSLATE_Y = -SCREEN_HEIGHT + 40

const BottomSheet = React.forwardRef(({children, scale}, ref) =>{
    const [isVisible, setIsVisible] = React.useState(false)

    const translateY = useSharedValue(0)
    const context = useSharedValue({y: 0})
    const active = useSharedValue(false)

    function scrollTo(destination){
        'worklet'
        active.value = destination !== 0
        translateY.value = withSpring(destination, {damping: 50})
    }


    function isActive(){
        return active.value
    }

    React.useImperativeHandle(ref, ()=>({scrollTo, isActive, setIsVisible}), [scrollTo, isActive, setIsVisible])

    const gesture = Gesture.Pan().onStart((event)=>{
        context.value = {y: translateY.value}
    }).onUpdate((event)=>{
        translateY.value = event.translationY + context.value.y
        translateY.value = Math.max(translateY.value, MAX_TRANSLATE_Y)
    }).onEnd((event)=>{
        if(translateY.value > -SCREEN_HEIGHT/scale){
            scrollTo(0)
        } else if(translateY.value < -SCREEN_HEIGHT/scale){
            scrollTo(-SCREEN_HEIGHT/scale)
        }
        else{
            scrollTo(-SCREEN_HEIGHT/scale)
        }
    })

    const rBottomSheetStyle = useAnimatedStyle(()=>{
        const borderRadius = interpolate(translateY.value, [MAX_TRANSLATE_Y + 50, MAX_TRANSLATE_Y], [25, 5], Extrapolate.CLAMP)
        if (active.value === false && translateY.value > -10) runOnJS(setIsVisible)(false)
        return{
            borderRadius,
            transform: [{translateY: translateY.value}]
        }
    })
    
    return (
        <Modal visible={isVisible} transparent={true}>
            <View style={styles.background} />
            <GestureHandlerRootView style={{flex:1}}>
                <GestureDetector gesture={gesture}>
                    <Animated.View style={[styles.bottomSheetContainer, rBottomSheetStyle]}>
                        <View style={styles.line}/>
                        {children}
                    </Animated.View>
                </GestureDetector>
            </GestureHandlerRootView>
        </Modal>
    )
})

export default BottomSheet

const styles = StyleSheet.create({
    bottomSheetContainer:{
        flex:1,
        position:'absolute',
        height:SCREEN_HEIGHT,
        width:"100%",
        backgroundColor: "white",
        top:SCREEN_HEIGHT,
        borderRadius:25,
    },
    line:{
        width:75,
        height:4,
        backgroundColor:"gray",
        alignSelf:"center",
        marginVertical:15,
        borderRadius:2
    },
    background:{
        position: 'absolute', 
        top: 0, 
        left: 0, 
        right: 0, 
        bottom: 0, 
        backgroundColor:"black", 
        opacity: 0.3
    }
})