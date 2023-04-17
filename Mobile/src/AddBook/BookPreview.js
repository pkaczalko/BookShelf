import React from "react"
import { View, StyleSheet, Text } from "react-native"
import { useRoute, useNavigation } from "@react-navigation/native"

export default function BookPreview(){
    const route = useRoute()
    const [isbn, setIsbn] = React.useState()

    React.useEffect(() => {
        if (route.params?.isbn) {
            setIsbn(route.params.isbn)
        }
      }, [route.params]);

    return(
        <Text>{isbn}</Text>
    )
}