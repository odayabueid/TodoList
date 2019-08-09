import React from 'react';
import { Route, Redirect } from 'react-router'
import Todos from "./Todos"
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { AccessAlarm, ThreeDRotation } from '@material-ui/icons';
import styles from './mystyle.module.css'; 
import { spacing } from '@material-ui/system';






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
    e.preventDefault();
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
            <Grid container component="main" className={styles.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={styles.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={styles.paper}>
          <Avatar className={styles.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={styles.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="user"
              label="User Name"
              name="user"
              autoComplete="user"
              autoFocus
              onChange={this.user.bind(this)}
              
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={this.pass.bind(this) }
              
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              style={{margin:'24px 0px 16px'}}
              onClick={this.server.bind(this)}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2" onClick={this.SignUp}>
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
            <Box mt={5}>
            </Box>
          </form>
        </div>
      </Grid>
    </Grid>
    {this.renderRedirect()}
            {/* <input type="text" onChange={this.user.bind(this)} placeholder="username"></input>
            <input type="text" onChange={this.pass.bind(this) }placeholder="password"></input>
            <button onClick={this.server.bind(this)}>Sign In</button>
            <p onClick={this.SignUp}>you don't have an account? please signup</p>
            {this.renderRedirect()} */}
          
        </div>
    )}
}

export default SignIn;
