import 'react-native-gesture-handler';

import { useEffect, useState } from "react";
import { FlatList, View, Text, ScrollView, TouchableOpacity, Button } from "react-native";
import Home from './Home';
import axios from 'axios'

const URL = 'http://192.168.1.240:3001'

const ContactView = ({ name, setUser }) => {
    return (
        <TouchableOpacity onPress={() =>  {
            setUser(name)
        }} style={{display: "flex", flexDirection: "row", height: 50, justifyContent: "center", alignItems: "center", borderColor: "black", borderWidth: 1}}>
            <Text>{name}</Text>
        </TouchableOpacity>
    );
}

const requestUsers = async (setContacts) => {
    const users = await axios(`${URL}/users`)
    setContacts(users.data)
}   

export default function Login() {

    const [username, setUsername] = useState('Select User')
    const [user, setUser] = useState("")
    const [contacts, setContacts] = useState([])
    useEffect(() => {
        requestUsers(setContacts)
    }, [])
    return (
    
        user ? contacts != [] ? <Home user={user} contacts={contacts}></Home> : <View></View> : <View style={{display: "flex", flexDirection: "column", height: 900, alignItems: "center", justifyContent: "center"}}>
        <Text style={{fontSize: 30}}>{username}</Text>
        <ScrollView style={{maxHeight: 210, width: 250}}>
            <FlatList data={contacts} renderItem={(contact) => <ContactView setUser={setUsername} name={contact.item.name}></ContactView>}></FlatList>
        </ScrollView>
        <Button title='Log In' onPress={() => { if(username != "Select User") setUser(username)}}></Button>
    </View> 
    );    
}