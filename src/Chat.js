import React, { useEffect, useState } from 'react'
import { Avatar, IconButton } from "@material-ui/core"
import './Chat.css'
import { AttachFile } from "@material-ui/icons"
import MoreVertIcon from "@material-ui/icons/MoreVert"
import SearchIcon from '@material-ui/icons/Search';
import MicIcon from "@material-ui/icons/Mic";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import { useParams } from 'react-router-dom';
import db from './firebase';
import firebase from "firebase";
import {useStateValue} from "./StateProvider";


function Chat(){
    const [input, setInput] = useState('');
    const [seed, setSeed] = useState('');
    const {roomId} = useParams();
    const [roomName, setRoomName] = useState("");
    const [messages, setMessages] = useState([]);
    const [{user},dispatch] = useStateValue();

    useEffect(() => {
        if(roomId){
            db.collection('rooms').doc(roomId).onSnapshot(snapshot => (
                setRoomName(snapshot.data().name)
            ));
            db.collection('rooms').doc(roomId).collection('messages').orderBy('timestamp','asc').onSnapshot(snapshot=>(
                setMessages(snapshot.docs.map(doc=>doc.data()))
            ))
        }
    }, [roomId]);

    useEffect(() => {
        setSeed(Math.floor(Math.random() * 5000))
    }, []);

    const sendMessage = (e) => {
        e.preventDefault();
        /* console.log("you typed >>", input); */

        db.collection('rooms').doc(roomId).collection('messages').add({
            message: input,
            name: user.displayName,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),

        });
        
        setInput('');
    }

    return(
        <div className="chat">
            <div className="chat__header">
                <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`}/>
                <div className="chat__headerInfo">
                    <h3>{roomName}</h3>
                    <p>Last Seen {" "}
                    {new Date(messages[messages.length - 1]?.timestamp?.toDate()).toUTCString()}


                    </p>
                </div>
                <div className="chat__headerRight">
                    <IconButton>
                        <SearchIcon />
                    </IconButton>
                    <IconButton>
                        <AttachFile />
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon />
                    </IconButton>
                </div>
            </div>
            <div className="chat__body">
                {messages.map(message=>(
                    <p className={`chat__message ${message.name === user.displayName && "chat__reciever"} `}>
                        <span className="chat__name">
                            {message.name}
                    </span>
                        {message.message}
                    <span className="chat__timestamp">
                        {new Date(message.timestamp?.toDate()).toUTCString()}
                    </span>
                    </p>
                ))}
                
                
            </div>
        <div className="chat__footer">
            <InsertEmoticonIcon />
            <form>
                <input value={input} onChange={e => setInput(e.target.value)} placeholder="Type a Message" type="text"></input>
                <button onClick={sendMessage} type="submit">Send a Message</button>
            </form>
            <MicIcon />
        </div>

            
        </div>
    )
}

export default Chat