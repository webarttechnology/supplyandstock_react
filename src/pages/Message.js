import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router'
import useSound from 'use-sound';
import { Link } from 'react-router-dom';
import * as API from "../api/index";
import { io } from "socket.io-client";
import InputEmoji from "react-input-emoji";
import ScrollToBottom from "react-scroll-to-bottom";
import boopSfx from '../assets/images/messton.mp3';
const Message = () => {

    const [play] = useSound(boopSfx);

    const socket = io("http://api.supplywestock.com:3001");
    console.log("socket", socket);
   const loaction =  useLocation()
    const [userList, setUserList] = useState([])
    const [feedMess, setFeedMess] = useState([])
    const [text, setText] = useState("");
    const [chatCodes, setChatCodes] = useState("")
    const [userName, setUserName] = useState([])

   const chatRoomShow = async() =>{
        const header = localStorage.getItem("_tokenCode");
        try {
            const response = await API.chatRoomlist(localStorage.getItem("__userId"), header) 
            console.log("responsedf", response);
            response.data.data.map((item, index)=>(
                setUserName(item.users)
            ))
            setUserList(response.data.data)
        } catch (error) {
            
        }
   }


   const chatHistoryShow = async (chatCode) =>{
        setChatCodes(chatCode)
        const header = localStorage.getItem("_tokenCode");
        try {
            const response = await API.chatfeedShow(chatCode, header)
            console.log("response", response);
            setFeedMess(response.data.data)
        } catch (error) {
            
        }
   }

   function handleOnEnter(text) {
    console.log("chatCode", chatCodes);
    socket.emit("createChat", {
        senderId: localStorage.getItem("__userId"),
        chatroomId: chatCodes,
        message: text,
    });
    play()
  }

    useEffect(() => {
        socket.on("receiveChat", (data) => {
            console.log("receiveChat", data);
            setFeedMess(data);
        });
        chatRoomShow()
    }, [])
    

  return (
    <>
        <div className='messageTable'>
            <div className='container'>
                <div className='row justify-content-center'>
                    <div className='col-md-9'>
                        <div className='message'>
                            <div className='row'>
                                <div className='col-md-3'>
                                    <div className='sideBarUser'>
                                        <ul className='ps-0'>
                                            {userList.map((item, index)=>(
                                                <li onClick={()=>chatHistoryShow(item._id)}>
                                                    {item.users.length === 2 ? (
                                                        <>
                                                            {item.users[0].firstName} {item.users[0].lastName}, {item.users[1].firstName} {item.users[1].lastName}
                                                        </>
                                                        ):(
                                                            <>
                                                                {item.users[0].firstName} {item.users[0].lastName}, {item.users[1].firstName} {item.users[1].lastName}, {item.users[2].firstName} {item.users[2].lastName}
                                                            </>
                                                        )}  
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                                <div className='col-md-9'>
                                                    
                                    {feedMess.length === 0 ? 
                                    (
                                        <img src='https://www.novelvox.com/wp-content/uploads/2022/03/Live-Chat-Banner-Image.png' alt='' />
                                    )
                                    : (
                                        <>
                                        <div className='headerTitle'>
                                            <h4>{userName[0].firstName} {userName[0].lastName}, {userName[1].firstName} {userName[1].lastName}, {userName[2].firstName} {userName[2].lastName}</h4>
                                        </div>
                                        <div className='messfeed'>
                                            <div className='row m-0'>
                                                <ScrollToBottom className="scroll">
                                                    {feedMess.map((item, index)=>(
                                                        <>
                                                            {localStorage.getItem("__userId") != item.senderId ? (
                                                                <div className='align-items-end col-md-12 d-flex'>
                                                                    <div className='isResiver'>
                                                                        <p>{item.message[0].msg}</p>
                                                                    </div>
                                                                </div>
                                                            ):(
                                                                <div className='align-items-end col-md-12 d-flex justify-content-end text-end'>
                                                                    <div className='isSender'>
                                                                        <p> {item.message[0].msg} </p>
                                                                    </div>
                                                                </div>
                                                            )}
                                                        </>
                                                    ))}
                                                </ScrollToBottom>
                                            </div>
                                        </div>
                                        <div className='messinput'>
                                            <div id="subscription_area">
                                                <div class="container">
                                                    <div class="row">
                                                    <div class="col-sm-12">
                                                        <div className="mess_type_input">
                                                            {/* <label for="file-upload" className="custom-file-upload">
                                                                <i class="bi bi-paperclip"></i>
                                                            </label>
                                                            <input hidden id="file-upload" type="file" /> */}
                                                            <InputEmoji
                                                                className="messBox"
                                                                value={text}
                                                                onChange={setText}
                                                                cleanOnEnter
                                                                onEnter={handleOnEnter}
                                                                placeholder="Type a message"
                                                            />
                                                        </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        </>
                                    )}
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default Message