import React from 'react';
import { Route, Redirect } from 'react-router'
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import styles from './mystyle.module.css'; 


class SignUp extends React.Component{
    constructor(props){
        super(props);
        this.state = {            
            password:'',
            username:"",
            redirect:false,
            login:false
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
server=(e)=>{
    e.preventDefault();
    var that = this;
    fetch("signup/",{
        method:"POST",
        headers : {
            "Accept": "application/json",
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            "username":this.state.username,
            "password" : this.state.password
            } 
            )
    })
    .then((response)=>{
        console.log("hi")
        console.log(response)
        if (response.status == 200) {
                that.setState({
                    redirect: true
                    },()=>console.log(this.state.redirect));
        } 
 
      }).catch(err => {
        // Do something for an error here
        console.log("Error Reading data " + err);
      });
}

login=()=>{
    this.setState({
        login:true
    })
}

renderRedirect = () =>{
    if(this.state.redirect){
      alert("regester Success")
      return <Redirect to = {{
        pathname:"/signin"
        }}/>
    }
    if(this.state.login){
        return <Redirect to = {{
          pathname:"/signin"
          }}/>
      }
  }

  render(){
    return(
        <div>


<Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={styles.paper1}>
        <Avatar className={styles.avatar1}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={styles.form1} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} >
              <TextField
                autoComplete="uname"
                name="userName"
                variant="outlined"
                required
                fullWidth
                id="usename"
                label="User Name"
                autoFocus
                onChange={this.user} 
              />
            </Grid>
    
            {/* <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
              />
            </Grid> */}
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={this.pass}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I want to receive inspiration, marketing promotions and updates via email."
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            style={{ margin:"24px 0px 16px" }}
            onClick={this.server}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="#" variant="body2" onClick={this.login}>
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        
      </Box>
    </Container>



            {this.renderRedirect()}
            {/* <input type="text" onChange={this.user} placeholder="your name"></input>
            <input type="text" onChange={this.pass} placeholder="your pass"></input>
            <button onClick={this.server}>signup</button> */}
        </div>
    )}

}

export default SignUp;
