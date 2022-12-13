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
import moment from "moment-timezone";
import Modal from "react-responsive-modal";
import { toast } from "react-toastify";
import { SOCEKT, TIMEZONE } from "../api/constant";
const initialData = {
  manufacturerId: "",
  product_des: "",
  unitPrice: "",
  quantities: "",
  sellerId: "",
  productName: "",
};
const Message = ({ setTotalNotification, setNotification, setMessCunt }) => {
  const [play] = useSound(boopSfx);

  const socket = io(SOCEKT);
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
  const [formData, setFormData] = useState(initialData);
  const [enquryId, setEnquryId] = useState("");
  const [buyerId, setBuyerId] = useState("");
  const [chatrCode, setChatrCode] = useState("");
  const [sallerid, setSallerid] = useState("");
  const [sellerMssId, setSellerMssId] = useState("");

  const chatRoomShow = async () => {
    const header = localStorage.getItem("_tokenCode");
    try {
      const response = await API.chatRoomlist(
        localStorage.getItem("__userId"),
        header
      );

      response.data.data.map((item, index) =>
        setTotalNotification(item.unseenCount)
      );
      setUserList(response.data.data);
    } catch (error) {}
  };

  const chatHistoryShow = async (chatCode, user, enqueryId, chatroomCode) => {
    commonReedMess(chatCode);
    user.map((item, index) =>
      item.roleId === "3"
        ? setBuyerId(item._id)
        : item.roleId === "2"
        ? (setSellerMssId(item._id), setSallerid(item.userCode))
        : setBuyerId("1")
    );
    setChatCodes(chatCode);
    setUserName(user);
    setEnquryId(enqueryId);
    setChatrCode(chatroomCode);
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
    } else {
      socket.emit("createChat", {
        senderId: localStorage.getItem("__userId"),
        chatroomId: chatCodes,
        message: text,
      });
      commonReedMess();
      chatRoomShowing();
    }
  }
  const handalerChnages = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

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
        chatroomId: chatCodes,
      };

      const response = await API.order_data(reqObj, header);

      if (response.data.success === 1) {
        socket.emit("notification", {
          id: buyerId,
        });
        chatRoomShowing();
        socket.emit("getChatHistory", {
          chatroomId: chatCodes,
        });
        closeModal();
        setFormData(initialData);
      } else {
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
        closeModal();
      }
    } catch (error) {}
  };

  const messsendHandaler = () => {
    socket.emit("createChat", {
      senderId: localStorage.getItem("__userId"),
      chatroomId: chatCodes,
      message: text,
    });
    commonReedMess();
    chatRoomShowing();
    setText("");
  };

  const messageAccept = async () => {
    const header = localStorage.getItem("_tokenCode");
    if (localStorage.getItem("_userType") === "Buyer") {
      try {
        const reqObj = {
          chatroomId: chatCodes,
          buyerId: localStorage.getItem("__userId"),
        };
        const response = await API.payment_link(reqObj, header);
        if (response.data.success === 1) {
          commonReedMess();
          chatRoomShowing();
          socket.emit("getChatHistory", {
            chatroomId: chatCodes,
          });
        }
      } catch (error) {}
    } else {
      try {
        const reqObj = {
          chatroomId: chatCodes,
          sellerId: localStorage.getItem("__userId"),
        };
        const response = await API.payment_link(reqObj, header);

        if (response.data.success === 1) {
          chatRoomShowing();
          socket.emit("getChatHistory", {
            chatroomId: chatCodes,
          });
        }
      } catch (error) {}
    }
  };

  const paymentLinkgenater = async () => {
    const header = localStorage.getItem("_tokenCode");
    try {
      try {
        const reqObj = {
          chatroomId: chatCodes,
          sellerId: localStorage.getItem("__userId"),
        };
        const response = await API.payment_link_gent(reqObj, header);
        if (response.data.success === 1) {
          // chatRoomShowing()
          socket.emit("getChatHistory", {
            chatroomId: chatCodes,
          });
        }
      } catch (error) {}
    } catch (error) {}
  };

  const regectMessage = () => {
    try {
    } catch (error) {}
  };

  const chatRoomShowing = () => {
    socket.emit("chatroom", {
      userCode:
        localStorage.getItem("_userType") === "Buyer" ? sellerMssId : buyerId,
    });
  };

  const commonReedMess = async (chtCod) => {
    const header = localStorage.getItem("_tokenCode");
    try {
      const reqObj = {
        senderId: localStorage.getItem("__userId"),
        chatroomId: chtCod,
      };

      const response = await API.chatreedMess(reqObj, header);
      if (response.data.success === 1) {
        chatRoomShow();
      }
    } catch (error) {}
  };

  const notificationrender = () => {
    socket.emit("notification", {
      id: localStorage.getItem("__userId"),
    });
  };
  useEffect(() => {
    notificationrender();
    socket.emit("notification", {
      id: localStorage.getItem("__userId"),
    });
    socket.on("receiveChatRoom", (data) => {
      if (data.showid === localStorage.getItem("__userId")) {
        setUserList(data.chatroom);
      }
    });

    socket.on("display", (data) => {
      setTypeData(data.typing);
      setTypeId(data.user);
      setTypeChatCode(data.chatCode);
    });

    socket.on("receiveChat", (data) => {
      setFeedMess(data);
    });

    chatRoomShow();
  }, []);

  const closeModal = () => {
    setOpenModal(false);
  };

  useEffect(() => {
    socket.emit("notification", {
      id: localStorage.getItem("__userId"),
    });
  }, []);
  return (
    <>
      <div className="messageTable">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-11">
              <div className="messageC">
                <div className="row">
                  <div className="col-md-4">
                    <div className=""></div>
                    <div className="sideBarUser">
                      <ul className="ps-0">
                        {userList.map((item, index) => {
                          setTotalNotification(item.unseenCount);
                          return (
                            <li
                              onClick={() =>
                                chatHistoryShow(
                                  item._id,
                                  item.users,
                                  item.enquiryId,
                                  item.enquiry
                                )
                              }
                            >
                              {item.users.length === 2 ? (
                                <>
                                  <span>
                                    {/* {item.users[0].userCode}{" "},
                                      {item.users[1].userCode}{" "}
                                      {`${item.unseenCount}`} */}
                                  </span>
                                </>
                              ) : (
                                <>
                                  <span className="userCodenc">
                                    {localStorage.getItem("_userType") ===
                                    "Buyer" ? (
                                      <>
                                        {item.users.map((userItm, index) => (
                                          <span className="userCoden">
                                            {" "}
                                            {userItm.roleId === "1"
                                              ? ""
                                              : userItm.roleId === "3"
                                              ? ` ${userItm.userCode} (Me)`
                                              : `${userItm.userCode} `}
                                          </span>
                                        ))}
                                      </>
                                    ) : (
                                      <>
                                        {item.users.map((userItm, index) => (
                                          <span className="userCoden">
                                            {userItm.roleId === "1"
                                              ? ""
                                              : userItm.roleId === "2"
                                              ? ` ${userItm.userCode} (Me)`
                                              : `${userItm.userCode}`}
                                          </span>
                                        ))}
                                      </>
                                    )}
                                  </span>
                                  {item.unseenCount === 0 ? (
                                    ""
                                  ) : (
                                    <>
                                      <span className="countMess">
                                        {item.unseenCount}
                                      </span>
                                    </>
                                  )}
                                </>
                              )}
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  </div>
                  <div className="col-md-8">
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
                              <h4>Product name : {chatrCode[0].productName}</h4>
                              <h4>
                                Product details : {chatrCode[0].product_des}
                              </h4>
                              <h4>Seller Id : {sallerid}</h4>
                            </div>
                            <div className="col-md-3">
                              {localStorage.getItem("_userType") === "Buyer" ? (
                                ""
                              ) : (
                                <>
                                  {buyerId !== "3" ? (
                                    <button
                                      className="btn btn-primary"
                                      onClick={() => setOpenModal(true)}
                                    >
                                      Generate Order
                                    </button>
                                  ) : (
                                    ""
                                  )}
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
                                const { timeZone } =
                                  Intl.DateTimeFormat().resolvedOptions();

                                return (
                                  <>
                                    {localStorage.getItem("__userId") !=
                                    item.senderId ? (
                                      <div className="flex-column col-md-12 d-flex align-items-baseline">
                                        <div class="isResiver">
                                          <p>
                                            <div
                                              dangerouslySetInnerHTML={{
                                                __html: item.message[0].msg,
                                              }}
                                            />
                                          </p>
                                          {localStorage.getItem("_userType") ===
                                          "Buyer" ? (
                                            <>
                                              {item.message[0].btn ===
                                              "accept" ? (
                                                <>
                                                  <div class="comandBtn">
                                                    <span
                                                      class="buttonS"
                                                      onClick={() =>
                                                        messageAccept()
                                                      }
                                                    >
                                                      Accept
                                                    </span>
                                                    <span
                                                      class="buttonSr"
                                                      onClick={() =>
                                                        regectMessage()
                                                      }
                                                    >
                                                      Reject
                                                    </span>
                                                  </div>
                                                </>
                                              ) : (
                                                ""
                                              )}
                                            </>
                                          ) : (
                                            ""
                                          )}

                                          {item.message[0].btn ===
                                          "paymentLink" ? (
                                            <div class="comandBtn">
                                              <span
                                                class="buttonS"
                                                onClick={paymentLinkgenater}
                                              >
                                                Generate Payment link
                                              </span>
                                            </div>
                                          ) : (
                                            ""
                                          )}

                                          {localStorage.getItem("_userType") ===
                                          "Buyer" ? (
                                            <>
                                              {item.message[0].btn ===
                                              "payment" ? (
                                                <div class="comandBtn">
                                                  <a
                                                    target="_blank"
                                                    href={item.message[0].link}
                                                    class="buttonS"
                                                  >
                                                    Pay Now
                                                  </a>
                                                </div>
                                              ) : (
                                                ""
                                              )}
                                            </>
                                          ) : (
                                            ""
                                          )}

                                          <span className="messTime">
                                            {diffDatHour < 24 ? (
                                              <>
                                                {moment
                                                  .utc(item.createdAt)
                                                  .tz(timeZone)
                                                  .format("h:m A")}
                                              </>
                                            ) : (
                                              <>
                                                {moment(item.createdAt).format(
                                                  "DD-MMM-YY"
                                                )}
                                              </>
                                            )}
                                          </span>
                                        </div>
                                        <span className="usermessName">
                                          {item.user.userCode === "Admin" ? (
                                            ""
                                          ) : (
                                            <># {item.user.userCode}</>
                                          )}
                                        </span>
                                      </div>
                                    ) : (
                                      <div className="align-items-end flex-column col-md-12 d-flex justify-content-end text-end">
                                        <div className="isSender">
                                          <p>
                                            <div
                                              dangerouslySetInnerHTML={{
                                                __html: item.message[0].msg,
                                              }}
                                            />
                                          </p>
                                          {localStorage.getItem("_userType") ===
                                          "Buyer" ? (
                                            <>
                                              {item.message[0].btn ===
                                              "accept" ? (
                                                <>
                                                  <div class="comandBtn">
                                                    <span
                                                      class="buttonS"
                                                      onClick={() =>
                                                        messageAccept()
                                                      }
                                                    >
                                                      Accept
                                                    </span>
                                                    <span
                                                      class="buttonSr"
                                                      onClick={() =>
                                                        regectMessage()
                                                      }
                                                    >
                                                      Reject
                                                    </span>
                                                  </div>
                                                </>
                                              ) : (
                                                ""
                                              )}
                                            </>
                                          ) : (
                                            ""
                                          )}
                                          <span className="messTime">
                                            {diffDatHour < 24 ? (
                                              <>
                                                {moment
                                                  .utc(item.createdAt)
                                                  .tz(timeZone)
                                                  .format("h:m A")}
                                              </>
                                            ) : (
                                              <>
                                                {moment(item.createdAt).format(
                                                  "DD-MMM-YY"
                                                )}
                                              </>
                                            )}
                                          </span>
                                        </div>
                                        <span className="usermessName">
                                          {/* # {item.user.userCode}{" "} */}#{" "}
                                          {item.user.userCode} (Me)
                                        </span>
                                      </div>
                                    )}
                                  </>
                                );
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
                                      className="userSend"
                                      onClick={messsendHandaler}
                                    >
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
            <h5 class="modal-title" id="exampleModalLabel">
              Order generate
            </h5>
          </div>
          <div class="modal-body">
            <div class="form-group">
              <label for="basicInput">Product name</label>
              <input
                type="text"
                class="form-control"
                placeholder="Product name"
                onChange={handalerChnages}
                value={formData.productName}
                name="productName"
              />
            </div>
            <div class="form-group">
              <label for="basicInput">Price</label>
              <input
                type="text"
                class="form-control"
                placeholder="Price"
                onChange={handalerChnages}
                value={formData.unitPrice}
                name="unitPrice"
              />
            </div>
            <div class="form-group">
              <label for="basicInput">Quantities</label>
              <input
                type="text"
                class="form-control"
                placeholder="Quantities"
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
            <button
              type="button"
              disabled={
                !formData.productName ||
                !formData.unitPrice ||
                !formData.quantities
              }
              class="btn btn-primary"
              onClick={editSellerData}
            >
              Submit
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default Message;
