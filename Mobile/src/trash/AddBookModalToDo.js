import React from "react";
import {StyleSheet, Dimensions, View, Modal, TouchableOpacity, PanResponder, Animated} from 'react-native';
import {Overlay} from 'react-native-elements'
import Rect from './Rect';

const { width, height } = Dimensions.get('window');

export default function AddBookModal(props){
    const modalBaseHeight = 300
    const maxSwipeHeight = 50
    const maxModalHeight = 600
    const [modalHeight, setModalHeight] = React.useState(modalBaseHeight)
    const [show, setShow] = React.useState(props.show)
    const [closeModal, setCloseModal] = React.useState(false)
    const shadowOpacity = show ? 0.5 : 0;
    const modalHeightRef = React.useRef(new Animated.Value(modalBaseHeight)).current;

    React.useEffect(() => { 
        setShow(props.show);
    }, [props]);

    const panResponder = 
        PanResponder.create({
          onMoveShouldSetPanResponder: () => true,
          onPanResponderMove: (evt, gestureState) => {
            if (gestureState.moveY > 600 || gestureState.vy > 15e-7){
                setModalHeight(modalHeight - gestureState.dy);
                modalHeightRef.setValue(modalHeight - gestureState.dy)
                setCloseModal(true)
            }
            else{
                setCloseModal(false)
                if(gestureState.dy < 0 && modalHeight < maxModalHeight){
                    setModalHeight(modalHeight - gestureState.dy );
                    if (modalHeight - gestureState.dy < modalBaseHeight - maxSwipeHeight) { // Check if the maximum height is reached
                        modalHeightRef.setValue(modalBaseHeight - maxSwipeHeight)
                      } else {
                        modalHeightRef.setValue(modalHeight - gestureState.dy )
                      }
                }
                else if(gestureState.dy > 0 && modalHeight > maxModalHeight){
                    setModalHeight(modalHeight - gestureState.dy);
                    modalHeightRef.setValue(modalHeight - gestureState.dy)
                }
            }
        },
          onPanResponderRelease: (evt, gestureState) => {
            if(closeModal){
                Animated.timing(modalHeightRef, {
                    toValue: 0,
                    duration: 200,
                    useNativeDriver: false,
                }).start(()=>{
                    setModalHeight(modalBaseHeight)
                    setShow(false)
                    modalHeightRef.setValue(modalBaseHeight)
                });
            }
            else{
                Animated.timing(modalHeightRef, {
                    toValue: modalBaseHeight,
                    duration: 150,
                    useNativeDriver: false,
                }).start(({finished})=>{
                    if (finished){
                        setModalHeight(modalBaseHeight)
                    }
                });
            }
          },
        })

        return(
        <View style={styles.container}>
            <View style={[styles.modalOverlay, {opacity: shadowOpacity}]} />
            <Animated.View style={{height: modalHeightRef}} {...panResponder.panHandlers}>  

                <View style={{backgroundColor:"#E8E8E8", height: modalHeight < modalBaseHeight ? modalBaseHeight : modalHeight,
                      width:"100%", display: show ? "flex" : "none", borderTopLeftRadius:15, borderTopRightRadius:15,
                      zIndex:2}}>
                    <Rect/>
                </View>

            </Animated.View>
  
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        justifyContent:"flex-end",
        position:"relative"
    },
    modalOverlay: {
        position:"absolute",
        backgroundColor:"blue",
        top: 0,
        left: 0,
        height: height,
        width: width,
    },
    modalContainer: {
        
      },
})

                {/* <Modal transparent={true} animationType='slide' visible={addBookIsClicked} 
                    onRequestClose={ () => setAddBookIsClicked(!addBookIsClicked)}>
                    
                    <TouchableOpacity style={styles.modalOverlay} onPress={() => setAddBookIsClicked(false)} />

                        <View style={{backgroundColor:"lightblue", flexDirection:"column", justifyContent:"flex-start", height: "50%", marginTop:"auto"}}>
                            <Rect />
                            
                                {console.log(pan.y)}
                                <View style={{width:50, height:50, backgroundColor:"black"}}></View>

                            <View style={{flex: 0.95, backgroundColor:"red"}}>
                                //TODO
                            </View>
                    
                        </View>
                </Modal> */}