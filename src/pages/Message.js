import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import useSound from "use-sound";
import { Link, NavLink } from "react-router-dom";
import * as API from "../api/index";
import { io } from "socket.io-client";
import InputEmoji from "react-input-emoji";
import ScrollToBottom from "react-scroll-to-bottom";
import boopSfx from "../assets/images/messton.mp3";
//import moment from "moment";
import moment from 'moment-timezone'
import Modal from "react-responsive-modal";
import { toast } from "react-toastify";
import { TIMEZONE } from "../api/constant";
const initialData = {
  manufacturerId:"",
  product_des:"",
  unitPrice:"",
  quantities:"",
  sellerId:"",
  productName:""
}
const Message = () => {
  const [play] = useSound(boopSfx);

  const socket = io("http://api.supplywestock.com:3001");
  console.log("socket", socket);
  const loaction = useLocation();
  const [userList, setUserList] = useState([]);
  const [feedMess, setFeedMess] = useState([]);
  const [text, setText] = useState("");
  const [chatCodes, setChatCodes] = useState("");
  const [userName, setUserName] = useState([]);
  const [typeData, setTypeData] = useState("");
  const [typeId, setTypeId] = useState("");
  const [typeChatCode, setTypeChatCode] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [formData, setFormData] = useState(initialData)
  const [enquryId, setEnquryId] = useState("")
  const [buyerId, setBuyerId] = useState("")
  const [chatrCode, setChatrCode] = useState("")
  const [sallerid, setSallerid] = useState("")

  console.log("feedMess", feedMess);

  // socket.emit("chatroom", {
  //   userCode: localStorage.getItem("__userId"),
  // });


  const chatRoomShow = async () => {
    const header = localStorage.getItem("_tokenCode");
    try {
      const response = await API.chatRoomlist(
        localStorage.getItem("__userId"),
        header
      );
      console.log("responsedf", response);
      response.data.data.map((item, index) => setUserName(item.users));
      //setUserList(response.data.data);
    } catch (error) {}
  };

  const chatHistoryShow = async (chatCode, user, enqueryId, chatroomCode) => {
    user.map((item, index)=> (
      item.roleId === "3" ? setBuyerId(item._id) : item.roleId === "2" ? setSallerid(item.userCode) : setBuyerId("1")
    ))
    setChatCodes(chatCode);
    setUserName(user)
    setEnquryId(enqueryId)
    setChatrCode(chatroomCode)
    const header = localStorage.getItem("_tokenCode");
    try {
      const response = await API.chatfeedShow(chatCode, header);
      setFeedMess(response.data.data);
    } catch (error) {}
  };

  const messageHandaler = (data) => {
    socket.emit("typing", {
      user: data === "" ? "" : localStorage.getItem("__userId"),
      chatcode: data === "" ? "" : chatCodes,
      typing: data === "" ? false : true,
    });
    setText(data);
  };

  function handleOnEnter(text) {
      if (text === "") {
        
      }else{
        socket.emit("createChat", {
          senderId: localStorage.getItem("__userId"),
          chatroomId: chatCodes,
          message: text,
        });
      }
  }


  const handalerChnages = (e) =>{
    const { name, value } = e.target;  
    setFormData({ ...formData, [name]: value });
  }


  const editSellerData = async () => {
    const header = localStorage.getItem("_tokenCode");
    try {
        const reqObj = {
            productName: formData.productName,
            sellerId: localStorage.getItem("__userId"),
            enquiryId: enquryId,
            unitPrice: formData.unitPrice,
            quantities: formData.quantities,
            buyerId: buyerId,
            chatroomId: chatCodes
        }
        console.log("reqObj", reqObj);
        const response = await API.order_data(reqObj, header);
        console.log("response", response);
        if (response.data.success === 1) {
          socket.emit("getChatHistory", {
            chatroomId: chatCodes,
          });
            closeModal()
            setFormData(initialData) 
           
        }else{
          toast(response.data.msg, {
            position: "top-right",
            autoClose: 5000,
            type: "error",
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
          closeModal()
        }
    } catch (error) {
        
    }
  }

  const messsendHandaler = () => {
    socket.emit("createChat", {
      senderId: localStorage.getItem("__userId"),
      chatroomId: chatCodes,
      message: text,
    });
    setText("")
  }

  const messageAccept = async() => {
    const header = localStorage.getItem("_tokenCode");
    if (localStorage.getItem("_userType") === "Buyer") {
      try {
        const reqObj = {
          chatroomId: chatCodes,
          buyerId: localStorage.getItem("__userId")
        }
        const response = await API.payment_link(reqObj, header)
        console.log("response", response);
        if (response.data.success === 1) {
          socket.emit("getChatHistory", {
            chatroomId: chatCodes,
          });
        }
      } catch (error) {
        
      }
    }else{
      try {
        const reqObj = {
          chatroomId: chatCodes,
          sellerId: localStorage.getItem("__userId")
        }
        const response = await API.payment_link(reqObj, header)
        console.log("response", response);
        if (response.data.success === 1) {
          socket.emit("getChatHistory", {
            chatroomId: chatCodes,
          });
        }
      } catch (error) {
        
      }
    }
    
  }

  const paymentLinkgenater = async () => {
    const header = localStorage.getItem("_tokenCode");
    try {
      try {
        const reqObj = {
          chatroomId: chatCodes,
          sellerId: localStorage.getItem("__userId")
        }
        const response = await API.payment_link_gent(reqObj, header)
        console.log("response", response);
        if (response.data.success === 1) {
          socket.emit("getChatHistory", {
            chatroomId: chatCodes,
          });
        }
      } catch (error) {
        
      }
    } catch (error) {
      
    }
  }


  const regectMessage = () => {
    try {
      
    } catch (error) {
      
    }
  }


  useEffect(() => {

    
    socket.on("receiveChatRoom", (data) => {
      console.log("receiveChatRoom", data);
      setUserList(data);
    });

    socket.on("display", (data) => {
      setTypeData(data.typing);
      setTypeId(data.user);
      setTypeChatCode(data.chatCode);
      console.log("dataDesplay", data);
    });

    socket.on("receiveChat", (data) => {
      console.log("receiveChat", data);
      setFeedMess(data);
    });



    chatRoomShow();
  }, []);


  const closeModal = () =>{
    setOpenModal(false)
  }


  return (
    <>
      <div className="messageTable">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-9">
              <div className="message">
                <div className="row">
                  <div className="col-md-3">
                    <div className="">
                      
                    </div>
                    <div className="sideBarUser">
                      <ul className="ps-0">
                        {userList.map((item, index) => (
                          <li onClick={() => chatHistoryShow(item._id, item.users, item.enquiryId, item.enquiry)}>
                            {item.users.length === 2 ? (
                              <>
                                {item.users[0].userCode}{" "},
                                {item.users[1].userCode}{" "}
                                 {`${item.unseenCount}`}
                              </>
                            ) : (
                              <>
                                {item.users[0].userCode}{" "},
                                {item.users[1].userCode}{" "},
                                {item.users[2].userCode}{" "}
                                <span className="countMess">{`${item.unseenCount}`}</span>
                              </>
                            )}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className="col-md-9">
                    {chatCodes === "" ? (
                      <img
                        src="https://www.novelvox.com/wp-content/uploads/2022/03/Live-Chat-Banner-Image.png"
                        alt=""
                      />
                    ) : (
                      <>
                        <div className="headerTitle">
                          <div className="row">
                            <div className="col-md-9">
                                <h4>
                                Product name : {chatrCode[0].productName}
                                </h4>
                                <h4>
                                 Product details :  {chatrCode[0].product_des}
                                </h4>
                                <h4>Seller Id : {sallerid}</h4>
                            </div>
                            <div className="col-md-3">
                            {localStorage.getItem("_userType") === "Buyer" ? (""):(
                              <>
                                 {buyerId !== "3" ? (<button className="btn btn-primary" onClick={()=> setOpenModal(true)}>Generate Order</button>):("")}
                              </>
                            )}
                            </div>
                          </div>
                        </div>
                        <div className="messfeed">
                          <div className="row m-0">
                            <ScrollToBottom className="scroll">
                              {feedMess.map((item, index) => {
                                const diffDatHour = moment(new Date()).diff(
                                  moment(item.createdAt),
                                  "hours"
                                ); 
                                return (
                                  <>
                                  {localStorage.getItem("__userId") !=
                                    item.senderId ? (
                                      <div className="flex-column col-md-12 d-flex align-items-baseline">
                                        <div class="isResiver">
                                          <p><div dangerouslySetInnerHTML={{__html: item.message[0].msg}} /></p>
                                          {localStorage.getItem("_userType") === "Buyer"? (
                                            <>
                                              {item.message[0].btn === "accept" ? (
                                                <>
                                                    <div class="comandBtn">
                                                        <span class="buttonS" onClick={()=> messageAccept()}>Accept</span>
                                                        <span class="buttonSr" onClick={()=> regectMessage()}>Reject</span>
                                                    </div>
                                                </>
                                            ): ""}
                                            </>
                                          ):("")}
                                          
                                            {item.message[0].btn === "paymentLink" ? (
                                              <div class="comandBtn">
                                                <span class="buttonS" onClick={paymentLinkgenater}>Generate Payment link</span>
                                              </div>
                                            ): "" } 
                                          

                                          {localStorage.getItem("_userType") === "Buyer" ? (
                                              <>
                                              {item.message[0].btn === "payment" ? (
                                                <div class="comandBtn">
                                                  <a href={item.message[0].link} class="buttonS">Pay Now</a>
                                                </div>
                                              ): "" } 
                                            </>
                                            ):(
                                            ""
                                          )}


                                          <span className="messTime">
                                              {diffDatHour < 24 ? (
                                                <>
                                                  {moment.utc(item.createdAt).tz(TIMEZONE).format('h:m A')}
                                                </>
                                              ):(
                                                <>
                                                  {moment(item.createdAt).format(
                                                    "DD-MMM-YY"
                                                  )}
                                                </>
                                              )}
                                          </span>
                                        </div>
                                        <span className="usermessName">
                                          {item.user.userCode}
                                        </span>
                                      </div>
                                    ) : (
                                      <div className="align-items-end flex-column col-md-12 d-flex justify-content-end text-end">
                                        <div className="isSender">
                                          <p><div dangerouslySetInnerHTML={{__html: item.message[0].msg}} /></p>
                                          {localStorage.getItem("_userType") === "Buyer"? (
                                            <>
                                              {item.message[0].btn === "accept" ? (
                                                <>
                                                    <div class="comandBtn">
                                                        <span class="buttonS" onClick={()=> messageAccept()}>Accept</span>
                                                        <span class="buttonSr" onClick={()=> regectMessage()}>Reject</span>
                                                    </div>
                                                </>
                                            ): ""}
                                            </>
                                          ):("")}
                                          <span className="messTime">
                                              {diffDatHour < 24 ? (
                                                <>
                                                  {moment.utc(item.createdAt).tz(TIMEZONE).format('h:m A')}
                                                </>
                                              ):(
                                                <>
                                                  {moment(item.createdAt).format(
                                                    "DD-MMM-YY"
                                                  )}
                                                </>
                                              )}
                                          </span>
                                        </div>
                                        <span className="usermessName">
                                          {item.user.userCode}{" "}
                                        </span>
                                      </div>
                                    )}
                                  </>
                                )
                              })}
                            </ScrollToBottom>
                          </div>
                        </div>
                        <div className="messinput">
                          <div id="subscription_area">
                            <div class="container">
                              <div className="row">
                                {/* {typeId === localStorage.getItem("__userId") ? (
                                  ""
                                ) : (
                                  <p className="mb-1 ps-4 text-start">
                                    {typeData ? "Typeing..." : ""}
                                  </p>
                                )} */}
                              </div>
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
                                      onChange={messageHandaler}
                                      cleanOnEnter
                                      onEnter={handleOnEnter}
                                      placeholder="Type a message"
                                    />
                                    <button 
                                      disabled={!text}
                                      className="userSend" onClick={messsendHandaler}>
                                      <i class="bi bi-send-fill"></i>
                                    </button>
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
      <Modal open={openModal} onClose={closeModal}>
          <div class="modal-content editSeller">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">Order generate</h5>
            </div>
            <div class="modal-body">
              <div class="form-group">
                  <label for="basicInput">Product name</label>
                  <input type="text" class="form-control" 
                      placeholder="Product name" 
                      onChange={handalerChnages} 
                      value={formData.productName}
                      name="productName" />
              </div>
              <div class="form-group">
                  <label for="basicInput">Amount</label>
                  <input type="text" class="form-control" 
                      placeholder="Amount" 
                      onChange={handalerChnages} 
                      value={formData.unitPrice}
                      name="unitPrice" />
              </div>
              <div class="form-group">
                  <label for="basicInput">Quantities</label>
                  <input type="text" class="form-control" placeholder="Quantities" 
                      onChange={handalerChnages} 
                      value={formData.quantities}
                      name="quantities" 
                  />
              </div>
              {/* <div class="form-group">
                  <label for="basicInput">Product details</label>
                  <textarea placeholder='Enter product details' rows="5" cols="5" 
                    value={formData.product_des}
                    name="product_des"
                    onChange={handalerChnages} 
                  className='form-control'></textarea>
              </div> */}
            </div>
            <div class="modal-footer">
            <button type="button" disabled={!formData.productName || !formData.unitPrice || !formData.quantities}
              class="btn btn-primary" onClick={editSellerData}>Submit</button>
            </div>
          </div>
      </Modal>
    </>
  );
};

export default Message;
