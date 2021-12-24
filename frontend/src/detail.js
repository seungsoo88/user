import React, { useState, useEffect } from "react";
import axios from 'axios';

export default function Detail (props) {
    const userId = props.location.state.id;
    const dataType = props.location.state.type;
    const [user, setUser] = useState([]);
    

    useEffect(() => {
        axios
        .get(`http://127.0.0.1:8000/user/${userId}`,{params : {id : userId, dataType : dataType}})
        .then((response) => {
            console.log(response.data);
            setUser(response.data);
        }).catch(function (error) {
            console.log(error);
        });

    },[userId, dataType]);

    const style = {
        margin : '50px',
      };
    return (
        <div style = {style}>
            <div>이름 : {user.name}</div>
            <div>나이 : {user.age}</div>
            <div>사진 : <img width={'200px;'} src ={user.poto} alt="profile" /></div>
        </div>
    )
}