import React from 'react';
import { Route, Redirect } from 'react-router'
import styles from './mystyle.module.css'; 

// Home Class render in Home Page
class Home extends React.Component{
    constructor(props){
        super(props);
        this.state = {            
            signin:false,
            signup:false
        }
    }
    //signIn to change the state to true to redirect to signIn Page
    signIn=()=>{
        this.setState({
            signin:true
        })
    }
    //signUp to change the state to true to redirect to signUp Page
    signUp=()=>{
        this.setState({
            signup:true
        })
    }
    // redirect to signin page or signup page
    renderRedirect=()=>{
        if(this.state.signin){
            return <Redirect to = {{
                pathname:"/signin"
            }}/>
        }
        if(this.state.signup){
            return <Redirect to = {{
                pathname:"/signup"
                }}/>
            }
    }
        
    render(){
        return(
            <div className={styles.home}>
                <div className={styles.btnDiv}>
                    <p className={styles.para}>Create Your Todo List</p>
                    <button className={styles.SignInBtn} onClick={this.signIn}>SignIn</button>
                    <button className={styles.SignUpBtn} onClick={this.signUp}>SignUp</button>
                </div>
                {this.renderRedirect()}
            </div>
        )}
}

export default Home;
