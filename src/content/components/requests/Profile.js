import {useState} from "react";
import {AES, enc} from "crypto-js";

const getToken = () => {
    let bytes;
    const token = localStorage.getItem('token');
    if (token !== null) {
        bytes = AES.decrypt(token, process.env.REACT_APP_AUTH_SECRET);
        return bytes.toString(enc.Utf8);
    }
}

const Profile = (props) => {
    const id = props.id;
    const url = 'https://dev.moniheal.com/api/profile/' + id;
    const [data, setData] = useState([]);
    fetch(url)
        .then(async (response) => {
            const isJson = response.headers.get('content-type')?.includes('application/json');
            const data = isJson && await response.json();
            setData(data.data)
        })
        .catch(err => {
            console.log(err);
        });
    return data;
}

export default Profile;
