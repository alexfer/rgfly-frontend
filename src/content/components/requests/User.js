import {AES, enc} from "crypto-js";

const getToken = () => {
    let bytes;
    const token = localStorage.getItem('token');

    if (token !== null) {
        bytes = AES.decrypt(token, process.env.REACT_APP_AUTH_SECRET);
        return 'Bearer ' + bytes.toString(enc.Utf8);
    }
}

const requestOptions = {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': getToken()
    },
};

const getProfile = async () => {
    const url = process.env.REACT_APP_API_HOST + '/uk/current-user';

    try {
        const response = await fetch(url, requestOptions);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
        return null;
    }
}

export default await getProfile;
