import 'react-native-gesture-handler';
import { useEffect, useState } from 'react'
import {TouchableOpacity, View, Text, Button } from 'react-native'
import Contacts from './Contacts';
import Chat from './Chats';

import { createStackNavigator } from '@react-navigation/stack';

import { io } from 'socket.io-client'
const URL = 'http://192.168.1.240:3002'

const socket = io(URL)
const Stack = createStackNavigator()

export default function Home({ user, contacts }) {
    
    const [messages, setMessages] = useState([])

    useEffect(() => {
    //    socket.join(user)
        socket.emit("identify", user)
        socket.on("msg", (msg) =>  {
            console.log(msg)
            const nw = messages
            nw.push(msg)
            // setRcMessage(nw)
            // console.log(nw)
            setMessages([...nw])
        })
    }, [])

    return(
    <Stack.Navigator>
        <Stack.Screen children={() => (<Contacts contacts={contacts.filter((val) => {return val.name != user})}></Contacts>)} name="ContactsList" options={{title:`ContactsList - ${user}`}}></Stack.Screen>
        {contacts.length > 0 ? contacts.map((contact) => <Stack.Screen name={contact.name} children={() => (<Chat user={user} recepient={contact.name} socket={socket} messages={messages}></Chat>)}></Stack.Screen>) : <Stack.Screen name="loading" component={Chat}></Stack.Screen>}
    </Stack.Navigator>
    );
}