import {BottomNavigation, Text} from 'react-native-paper'
import { CommonActions, NavigationContainer} from '@react-navigation/native';

export default function SetTabBar({ navigation, state, descriptors, insets }){
    return (
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
    )
}