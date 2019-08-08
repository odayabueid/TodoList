import React from 'react';
import { Route, Redirect } from 'react-router'
import Todos from "./Todos"
class SignIn extends React.Component{
    constructor(props){
        super(props);
        this.state = {            
            password:'',
            username:"",
            toggleSignIn: false,
            toggleSignUp:false
        }
  }


  user(event){
    this.setState({
        username : event.target.value
      },()=>{console.log(this.state.username)}) 
  }
  pass(event){
    this.setState({
        password : event.target.value
      },()=>{console.log(this.state.password)}) 
  }


  server(e){
    var that = this;
    fetch("signin/",{
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
            response.json().then((body) => {
                const token = body.token
                localStorage.setItem('token', token);
                that.setState({
                        toggleSignIn: true
                    },()=>console.log(this.state.toggleSignIn,token));
            })
        } else {
            this.setState({
                error : "this email is alredy token"
                },()=>{alert("check your username or pass")});
        }      
    });
}

SignUp=()=>{
    console.log("signup")
    this.setState({
        toggleSignUp:true
    })

}

renderRedirect = () =>{
    if(this.state.toggleSignIn){
        console.log(this.state.username)
      return <Redirect to = {{
        pathname:"/todos",
        user:{username:this.state.username}
          }}/>
    }
    if(this.state.toggleSignUp){
        return <Redirect to={{
            pathname:"/signup"
        }}/>
    }
  }


  render(){
    return(
        <div>
            <input type="text" onChange={this.user.bind(this)} placeholder="username"></input>
            <input type="text" onChange={this.pass.bind(this) }placeholder="password"></input>
            <button onClick={this.server.bind(this)}>Sign In</button>
            <p onClick={this.SignUp}>you don't have an account? please signup</p>
            {this.renderRedirect()}
          
        </div>
    )}
}

export default SignIn;
