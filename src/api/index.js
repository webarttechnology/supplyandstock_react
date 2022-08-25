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
    console.log("data", data);
    try {
        const url = c.BUYER + "/reset-password";
        const res = await axios.post(url, data);
        console.log("res",res);
        return res;
    } catch (e) {
        return e.response;
    }
};


// ? menufactursGet
export const menufactursGet = async (data) => {
    try {
        const url = c.MENUFACTURS;
        const res = await axios.get(url, data);
        return res;
    } catch (e) {
        return e.response;
    }
};


// ? choose_manufacturer_saller
export const choose_manufacturer_saller = async (data) => {
    try {
        const url = c.SELLER + "/choose-manufacturer";
        const res = await axios.patch(url, data);
        return res;
    } catch (e) {
        return e.response;
    }
};

// ? remove_manufacturer_saller
export const remove_manufacturer_saller = async (data) => {
    try {
        const url = c.SELLER + "/remove-manufacturer";
        const res = await axios.patch(url, data);
        return res;
    } catch (e) {
        return e.response;
    }
};
