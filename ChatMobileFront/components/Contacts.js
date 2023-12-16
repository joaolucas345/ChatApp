import {} from 'react'
import { FlatList, View, TouchableOpacity, Text, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
const ContactComp = ({ navigation, name }) => {
    return (
        <TouchableOpacity onPress={() => {
            navigation.push(name)
        }} style={{display: "flex", flexDirection: "column", borderColor: "black", borderWidth: 1, height: 50, justifyContent: "center", alignItems: "center"}}>
            <Text>{name}</Text>
        </TouchableOpacity>
    );   
}

export default function Contacts({ contacts }) {
    const navigation = useNavigation()
    return (<View>
        <ScrollView>
        <FlatList data={contacts} renderItem={(contact) => (<ContactComp navigation={navigation} name={contact.item.name}></ContactComp>)}></FlatList>
        </ScrollView>
    </View>);
}