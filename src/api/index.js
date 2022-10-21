import axios from "axios";
import * as c from "./constant";

// ? REGISTRATION API
export const user_registration_buyer = async (data) => {
    try {
        const url = c.BUYER;
        const res = await axios.post(url, data);
        return res;
    } catch (e) {
        return e.response;
    }
};

// ? UPDATE BUYER
export const user_update_buyer = async (data, header) => {
    try {
        const url = c.BUYER;
        const res = await axios.patch(url, data , {
            headers: JSON.parse(header),
          });
        return res;
    } catch (e) {
        return e.response;
    }
};


// ? UPDATE BUYER
export const user_update_seller = async (data, header) => {
    try {
        const url = c.SELLER;
        const res = await axios.patch(url, data , {
            headers: JSON.parse(header),
          });
        return res;
    } catch (e) {
        return e.response;
    }
};


// ? REGISTRATION API
export const user_buyer_mailVerifi = async (data) => {
    try {
        const url = c.BUYER + "/otp-verification/" + data.id + "/" +  data.otp;
        const res = await axios.get(url, data);
        return res;
    } catch (e) {
        return e.response;
    }
};

// ? REGISTRATION API
export const user_buyer_resendOtp = async (data) => {
    try {
        const url = c.BUYER + "/send-otp/" + data;

        console.log("url", url);
        const res = await axios.get(url, data);
        return res;
    } catch (e) {
        return e.response;
    }
};


// ? REGISTRATION API
export const user_registration_seller = async (data) => {
    try {
        const url = c.SELLER;
        const res = await axios.post(url, data);
        return res;
    } catch (e) {
        return e.response;
    }
};

// ? REGISTRATION API
export const user_seller_mailVerifi = async (data) => {
    try {
        const url = c.SELLER + "/otp-verification/" + data.id + "/" +  data.otp;
        const res = await axios.get(url, data);
        return res;
    } catch (e) {
        return e.response;
    }
};

// ? REGISTRATION API
export const changesPassword_seller = async (data, header) => {
    try {
        const url = c.SELLER + "/change-password";
        const res = await axios.patch(url, data, {
            headers: JSON.parse(header),
          });
        return res;
    } catch (e) {
        return e.response;
    }
};

// ? REGISTRATION API
export const changesPassword_buyer = async (data, header) => {
    try {
        const url = c.BUYER + "/change-password";
        const res = await axios.patch(url, data, {
            headers: JSON.parse(header),
          });
        return res;
    } catch (e) {
        return e.response;
    }
};

// ? REGISTRATION API
export const user_seller_resendOtp = async (data) => {
    try {
        const url = c.SELLER + "/send-otp/" + data;
        const res = await axios.get(url, data);
        return res;
    } catch (e) {
        return e.response;
    }
};

// ? LOGIN API
export const user_login_seller = async (data) => {
    try {
        const url = c.SELLER + "/login";
        const res = await axios.post(url, data);
        return res;
    } catch (e) {
        return e.response;
    }
};


// ? LOGIN API
export const user_login_buyer = async (data) => {
    try {
        const url = c.BUYER + "/login";
        const res = await axios.post(url, data);
        return res;
    } catch (e) {
        return e.response;
    }
};

// ? FORGOT API
export const forgot_password_buyer = async (data) => {
    try {
        const url = c.BUYER + "/forgot-password";
        const res = await axios.post(url, data);
        return res;
    } catch (e) {
        return e.response;
    }
};

// ? FORGOT API
export const forgot_password_saller = async (data) => {
    try {
        const url = c.SELLER + "/forgot-password";
        const res = await axios.post(url, data);
        return res;
    } catch (e) {
        return e.response;
    }
};


// ? FORGOT API
export const reset_password_saller = async (data) => {
    try {
        const url = c.SELLER + "/reset-password";
        const res = await axios.post(url, data);
        return res;
    } catch (e) {
        return e.response;
    }
};

export const reset_password_buyer = async (data) => {
    try {
        const url = c.BUYER + "/reset-password";
        const res = await axios.post(url, data);
        return res;
    } catch (e) {
        return e.response;
    }
};


// ? menufactursGet
export const menufactursGet = async (data) => {
    try {
        const url = c.MENUFACTURS;
        const res = await axios.get(url);
        return res;
    } catch (e) {
        return e.response;
    }
};

// ? manufacturer_saller)by id
export const manufacturer_saller = async (data, header) => {
    try {
        const url = c.SELLER + "/" + data;
        const res = await axios.get(url, {
            headers: JSON.parse(header),
          });
        return res;
    } catch (e) {
        return e.response;
    }
};

// ? BUYER)by id
export const manufacturer_buyer = async (data, header) => {
    try {
        const url = c.BUYER + "/" + data;
        const res = await axios.get(url, {
            headers: JSON.parse(header),
          });
        return res;
    } catch (e) {
        return e.response;
    }
};


// ? choose_manufacturer_saller
export const choose_manufacturer_saller = async (data, header) => {
    try {
        const url = c.SELLER + "/choose-manufacturer";
        const res = await axios.patch(url, data, {
            headers: JSON.parse(header),
          });
        return res;
    } catch (e) {
        return e.response;
    }
};

// ? remove_manufacturer_saller
export const remove_manufacturer_saller = async (data, header) => {
    try {
        const url = c.SELLER + "/remove-manufacturer";
        const res = await axios.patch(url, data, {
            headers: JSON.parse(header),
          });
        return res;
    } catch (e) {
        return e.response;
    }
};

// ? buyer_enqueris
export const buyer_enqueris = async (data, header) => {
    try {
        const url = c.ENQUIRIES;
        const res = await axios.post(url, data, {
            headers: JSON.parse(header),
          });
        return res;
    } catch (e) {
        return e.response;
    }
};


// ? UPDATE BUYER
export const order_data = async (data, header) => {
    try {
        const url = c.ORDER;
        const res = await axios.post(url, data , {
            headers: JSON.parse(header),
          });
        return res;
    } catch (e) {
        return e.response;
    }
};


// ? UPDATE BUYER
export const payment_link = async (data, header) => {
    try {
        const url = c.PAYMENT + "/request";
        const res = await axios.post(url, data , {
            headers: JSON.parse(header),
          });
        return res;
    } catch (e) {
        return e.response;
    }
};

export const payment_link_gent = async (data, header) => {
    try {
        const url = c.PAYMENT;
        const res = await axios.post(url, data , {
            headers: JSON.parse(header),
          });
        return res;
    } catch (e) {
        return e.response;
    }
};


export const buyer_enqueris_id = async (data, header) => {
    try {
        const url = c.ENQUIRIES + "/buyer/" + data;
        console.log("url", url);
        const res = await axios.get(url, {
            headers: JSON.parse(header),
          });
        return res;
    } catch (e) {
        return e.response;
    }
};

export const seller_enqueris_id = async (data, header) => {
    try {
        const url = c.NOTIFICATIONS + "/" + data;
        const res = await axios.get(url, {
            headers: JSON.parse(header),
          });
        return res;
    } catch (e) {
        return e.response;
    }
};

export const enquriys_accepts = async (data,  header) => {
    try {
        const url = c.NOTIFICATIONS + "/accept/" + data.userId + "/" + data.id;
        const res = await axios.get(url,{
            headers: JSON.parse(header),
          });
        return res;
    } catch (e) {
        return e.response;
    }
}


export const chatRoomlist = async (data, header) => {
    try {
        const url = c.CHATROOM + "/" + data;
        const res = await axios.get(url,{
            headers: JSON.parse(header),
          });
        return res;
    } catch (e) {
        return e.response;
    }
}

export const chatfeedShow = async (data, header) => {
    try {
        const url = c.CHAT + "/" + data;
        const res = await axios.get(url,{
            headers: JSON.parse(header),
          });
        return res;
    } catch (e) {
        return e.response;
    }
}


export const chatreedMess = async (data, header) => {
    try {
        const url = c.CHAT;
        const res = await axios.patch(url, data,{
            headers: JSON.parse(header),
          });
        return res;
    } catch (e) {
        return e.response;
    }
}


export const user_order = async (data, header) => {
    try {
        const url = c.ORDER + "/buyer/" + data;
        const res = await axios.get(url,{
            headers: JSON.parse(header),
          });
        return res;
    } catch (e) {
        return e.response;
    }
}
export const user_order_seller = async (data, header) => {
    try {
        const url = c.ORDER + "/seller/" + data;
        const res = await axios.get(url,{
            headers: JSON.parse(header),
          });
        return res;
    } catch (e) {
        return e.response;
    }
}
