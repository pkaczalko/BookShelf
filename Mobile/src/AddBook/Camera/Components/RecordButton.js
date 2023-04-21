import { Animated, Pressable, StyleSheet } from "react-native";

export default function RecordButton(props){
    const animatedValue = new Animated.Value(0);
    
    const handlePressIn = () => {
        Animated.timing(animatedValue, {
        toValue: 1,
        duration: 150,
        useNativeDriver: false,
        }).start();
    };
    
    const handlePressOut = () => {
        Animated.timing(animatedValue, {
        toValue: 0,
        duration: 150,
        useNativeDriver: false,
        }).start();
    };
    
    const animatedStyle = {
        borderWidth: animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [7, 10],
        }),
    };

    return (
        <Animated.View style={[styles.recordButton, animatedStyle]}>
            <Pressable style={styles.pressableRecordButton} onPressIn={handlePressIn} onPressOut={handlePressOut} onPress={props.handleOnPress}/>
        </Animated.View>
    )
}

const styles = StyleSheet.create({
    recordButton:{
        borderRadius:80, 
        backgroundColor:"white", 
        alignSelf:"flex-end",                                
        width:75, 
        height:75, 
        borderWidth:7, 
        borderColor:"#404040", 
        marginBottom:35
    },
    pressableRecordButton:{
        backgroundColor: 'white',
        borderRadius: 50,
        width: '100%',
        height: '100%',
    }
})