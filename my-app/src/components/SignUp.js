import React from 'react';
import { Route, Redirect } from 'react-router'

class SignUp extends React.Component{
    constructor(props){
        super(props);
        this.state = {            
            password:'',
            username:"",
            redirect:false
        }
  }

user =(event)=>{
    this.setState({
        username:event.target.value
    },()=>console.log(this.state.username))
}

pass =(event)=>{
    this.setState({
        password:event.target.value
    },()=>console.log(this.state.password))
}
server=()=>{
    var that = this;
    fetch("signup/",{
        method:"POST",
        headers : {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            "username":this.state.username,
            "password" : this.state.password
            } 
            )
    }).then((response) => {
        if (response.status == 200) {
                // const token = body.token
                // localStorage.setItem('token', token);
                that.setState({
                        redirect: true
                    },()=>console.log(this.state.redirect));
        } else {
            this.setState({
                },()=>{alert("check your username or pass")});
        }      
    });
}

renderRedirect = () =>{
    if(this.state.redirect){
      alert("regester Success")
      return <Redirect to = {{
        pathname:"/signin"
        }}/>
    }
  }

  render(){
    return(
        <div>
            {this.renderRedirect()}
            <input type="text" onChange={this.user} placeholder="your name"></input>
            <input type="text" onChange={this.pass} placeholder="your pass"></input>
            <button onClick={this.server}>signup</button>
        </div>
    )}

}

export default SignUp;
