import {AES, enc} from "crypto-js";

const getToken = () => {
    let bytes;
    const token = localStorage.getItem('token');

    if (token !== null) {
        bytes = AES.decrypt(token, process.env.REACT_APP_AUTH_SECRET);
        return 'Bearer ' + bytes.toString(enc.Utf8);
    }
}
export default getToken();
