import React from "react";
import axios from "axios";


export default function Form( {history} ) {
  console.log(history)

  const goBack = () => {
    history.goBack();
  }

  const createUser = (e)=> {
    e.preventDefault();
    const fromDate = new FormData();
    fromDate.append("name", e.target[0].value);
    fromDate.append("age", e.target[1].value);
    fromDate.append("poto", e.target[2].files[0]);
    console.log(fromDate);

  
    const URL = "http://127.0.0.1:8000/user/"

    axios({
      method : "post",
      url : URL,
      data : fromDate,
      headers : {
        "Content-type" : "multipart/form-data",
      }
      }).then(function(response){
        console.log(response.data)
        history.push('/');
      }).catch(function(error){
        console.log(error);
      });
    };

  const style = {
    margin : '50px',
  };

  return(
    <div style={style}>
      <form onSubmit={createUser}>
        <div>이름 : <input type="text" name='name'/></div>
        <div>나이 : <input type='text' name='age'/></div>
        <div>사진 : <input type='file' name='poto'/></div>
        <button type="submit">전송</button><button onClick={goBack}>뒤로가기</button>
      </form>
      
    </div>
  )
}