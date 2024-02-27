import {useState} from "react";
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

export default function UserProfile (props) {

    const id = props.id;
    const url = 'https://dev.moniheal.com/api/user/' + id;
    const [data, setData] = useState([]);

    fetch(url, requestOptions)
        .then(async (response) => {
            const isJson = response.headers.get('content-type')?.includes('application/json');
            const data = isJson && await response.json();
            setData(data.data)
        })
        .catch(err => {
            console.log(err);
        });
    return (data);
}