import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router'
import { Link } from 'react-router-dom';
import * as API from "../api/index";
const Message = () => {
   const loaction =  useLocation()
    const [userList, setUserList] = useState([])
    const [feedMess, setFeedMess] = useState([])

   const chatRoomShow = async() =>{
        const header = localStorage.getItem("_tokenCode");
        try {
            const response = await API.chatRoomlist(localStorage.getItem("__userId"), header) 
            console.log("responsedf", response);
            setUserList(response.data.data)
        } catch (error) {
            
        }
   }


   const chatHistoryShow = async (chatCode) =>{
        const header = localStorage.getItem("_tokenCode");
        try {
            const response = await API.chatfeedShow(chatCode, header)
            console.log("response", response);
            setFeedMess(response.data.data)
        } catch (error) {
            
        }
   }

    useEffect(() => {
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
                                                item.users.map((userItm, index)=>(
                                                    <li onClick={()=>chatHistoryShow(item._id)}>{userItm.firstName} {userItm.lastName}</li>
                                                ))
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
                                            <h4>Biswajit mondal</h4>
                                        </div>
                                        <div className='messfeed'>
                                            <div className='isResiver'>
                                                <p> Hello dost</p>
                                            </div>
                                            <div className='isSender'>
                                                <p> Hey bro</p>
                                            </div>
                                        </div>
                                        <div className='messinput'>
                                            <div id="subscription_area">
                                                <div class="container">
                                                    <div class="row">
                                                    <div class="col-sm-12">
                                                        <div class="subscribe_now">
                                                            <form class="subscribe_form">
                                                                <div class="input-group">
                                                                <input type="text" class="form-control" name="email" placeholder="Type messages here..." />
                                                                <span class="input-group-btn">
                                                                        <button class="btn btn-default" type="button">Send</button>
                                                                </span>
                                                                </div>
                                                            </form>
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