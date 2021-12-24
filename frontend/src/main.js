import React, { useState } from "react";
import {Link} from 'react-router-dom';
import axios from 'axios';


export default function Main({history}) {
  const [type, setType] = useState([]);
  const [users, setUsers] = useState([]);
  
  
  const SelectdataType = (e)=> {
    const dataType = e.target.value;
    console.log(dataType);
    setType(dataType);

    axios
    .get('http://127.0.0.1:8000/user/list',{params : {datatype : dataType}})
    .then(function(response) {
      console.log(response.data);
      setUsers(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
  }
  const style = {
    margin : '50px',
  };

  return (
    <div  style={style}>
      <div><button onClick={() => {history.push('/form')}}>추가하기</button></div>
      <div><h1>목록조회</h1></div>
      <span><button onClick={SelectdataType} value={"db"}>db</button></span>
      <span><button onClick={SelectdataType} value={"txt"}>txt</button></span>
      <div><h1>{type}</h1></div>
      {users.map((user) => (
                <div key={user.id}>
                  <li><Link to={{pathname :`/detail/${user.id}`, state:{id : user.id, type : type}}}>{user.name}</Link></li>
                </div>
            ))}
    </div>
  )
}