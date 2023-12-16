import { useEffect, useState } from 'react'
import { KeyboardAvoidingView, Text, TextInput, ScrollView, View, Button, TouchableOpacity, Keyboard } from 'react-native';

const marginLeftRight = "5%"
const marginTopBottom =  "5%"

const Message = ({ userEmit, content, user }) => {
    return(<View style={{display: "flex", width: "auto", maxWidth: "60%", justifyContent: user == userEmit ? "flex-end" : "flex-start", marginTop: marginTopBottom, marginLeft: user == userEmit ? "35%" : marginLeftRight, marginRight: marginLeftRight, flexDirection: "row"}}>
        <Text style={{ backgroundColor: user == userEmit ? "rgb(0,124,124)" : "grey", padding: "3%"}}>{content}</Text>
    </View>);
}

export default function Chat({ user, socket, recepient, messages }) {

    const [isKeyVisible, setIsKeyVisible] = useState(false)
    const [message, setMessage] = useState("")
    // const [rcMessage, setRcMessage] = useState([{ user: 'User0', msg: 'hhhhhn' }, { user: 'User0', msg: 'hhhhhn' }, { user: 'User0', msg: 'hhhhhn' }])

    const sendMessage = (msg) => {
        socket.emit("message", { recepient, msg, user})
    }

    useEffect(() => {
        Keyboard.addListener("keyboardDidShow", () => {setIsKeyVisible(true)})
        Keyboard.addListener("keyboardDidHide", () => {setIsKeyVisible(false)})

    }, [])

    // useEffect(() => {
    //     console.log(rcMessage, "Rc")
    // }, [rcMessage])

    return(
    <KeyboardAvoidingView style={{position: "relative", flex: 1, display: "flex", alignItems: "center"}}>
        <ScrollView style={{flex: 2, width: "100%", position: "relative", maxHeight: "90%"}}>
        {
            messages.filter((val) => { return (val.recepient == recepient && val.user == user) || (val.user == recepient && val.recepient == user) }).map(msg => (<Message userEmit={msg.user} content={(msg.msg)} user={user}></Message>))
        }
        </ScrollView>
        <TextInput onChangeText={(e) => setMessage(e)}  style={{position: "absolute", bottom: 0, height: "8%", width: "100%", backgroundColor: "white", textAlign: "center"}} placeholder='Type Input'></TextInput>    
        <TouchableOpacity onPress={() => {sendMessage(message)}} style={{position: "absolute", right: isKeyVisible ? "-100%" : "5%", bottom: "2%", backgroundColor: "rgb(0,255,255)", padding: "2%", display: "flex", justifyContent: "center", alignItems: "center", borderRadius: 50}}><Text>SEND</Text></TouchableOpacity>
    </KeyboardAvoidingView>);
}