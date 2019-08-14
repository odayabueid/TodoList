// import what you want from material-ui

import React from 'react';
import { Route, Redirect } from 'react-router'
import styles from './mystyle.module.css'; 
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import Fab from '@material-ui/core/Fab';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import Popup from "reactjs-popup";
import Calendar from 'react-calendar';
import IconButton from '@material-ui/core/IconButton';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';

var jwt = require("jsonwebtoken");
// Todos Class render in Todos page
class Todos extends React.Component{
    constructor(props){
        super(props);
        this.state = {            
            books:[],
            todoId:null,
            updateTodo:"",
            newTodo:"",
            username:"",
            redirect:false,
            createdate:""
        }
    }

    // get the token from local storage and decode it and save the username from token in username state
    componentWillMount(){
        var that = this;
        const token =localStorage.getItem("token");
        var decoded = jwt.decode(token);
        this.setState({
            username:decoded.username
        })
    }

    //get todos which belong to specific username and set it in books array
    componentDidMount(){
        const searchtag =this.state.username;
        console.log(this.state.username)
        fetch(`/retriveTodos?username=${this.state.username}`,{
            method: "get",
            headers:{'x-access-token':localStorage.getItem("token")}
        })
        .then((data)=>data.json()).then(res=>{
            this.setState({books:res},()=>console.log(this.state.books))
        })
    }

    // set the value in updateTodo to update todo
    updatetodo(event){
        this.setState({
            updateTodo : event.target.value
          }) 
    }

    // use fetch to update specific todo
    prof=()=>{
        fetch("updateTodo/",{
            method:"PUT",
            headers : {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "todo":this.state.updateTodo,
                "id" : this.state.todoId
            })
        }).then((response) => {
            console.log(response)
        }).then(()=>{
            this.componentDidMount()
           })
    }

    // use fetch to delete specific todo for specific username
    delete=()=>{
        fetch("deleteTodo/",{
            method:"DELETE",
            headers : {
                Accept: "application/json",
                "Content-Type": "application/json"
              },
              body: JSON.stringify({
                "username":this.state.username,
                "id" : this.state.todoId
              })
        }).then((response) => {
            console.log(response )
        }).then(()=>{
            this.componentDidMount()
            })
    }

    // use fetch to add todo and date for specific username
    add=()=>{
        fetch("addTodo/",{
            method:"POST",
            headers : {
                Accept: "application/json",
                "Content-Type": "application/json"
              },
              body: JSON.stringify({
                "username":this.state.username,
                "todo" : this.state.newTodo,
                "createdate":this.state.createdate
                })
        }).then((response) => {
            console.log(response )
        }).then(()=>{
            this.componentDidMount()
        })
    }

    //set the value in newtodo to add a todo
    newTodo(event){
        this.setState({
            newTodo:event.target.value
        }) 
    }

    //remove the token from local storage and set the redirect state true to redirect to logIn page
   logout=()=>{
       localStorage.clear();
       this.setState({
           redirect:true
       })
   }
    //check redirect state if true redirect to signIn
   renderRedirect=()=>{
        if(this.state.redirect){
            return <Redirect to = {{
                pathname:"/signin"
            }}/>
        }
   }
    //set date in createdate state
   handleChange =(date)=>{
        this.setState({
            createdate: date.toString().split("00")[0]
        })
   }


  render(){
    return(
        <div>
            {this.renderRedirect()}
            <form className={styles.container} noValidate autoComplete="off">
                <TextField
                id="outlined-dense"
                label="Add Todo"
                style={{ marginLeft:"8px",marginRight:"8px",marginTop:"16px"}}
                margin="dense"
                variant="outlined"
                onChange={this.newTodo.bind(this)}
                /> 
                <Popup trigger={ 
                    <IconButton aria-label="delete" style={{margin:"8px",backgroundColor:"#FB0860"}} size="medium">
                        <ArrowDownwardIcon fontSize="inherit" />
                    </IconButton>} position="right center"
                >
                    <Calendar onChange={this.handleChange}/>
                </Popup>
                <div  style={{margin:"8px",marginTop:"16px",marginLeft:"22%"}}>
                    <Button variant="contained" color="primary"  onClick={this.add} style={{marginRight:"20px"}}>
                        Add 
                    </Button>
                    <Button variant="contained" color="secondary" onClick={this.logout}>
                        Log Out
                    </Button>
                </div>
            </form>
            {this.state.books.map(book=>
                <div className={styles.todo}>
                    <p>{book.createdate}</p>
                    <Checkbox
                        onChange={this.handleChange}
                        value="checkedA"
                        inputProps={{
                            'aria-label': 'primary checkbox',
                        }}/>
                    <span>{book.todo}</span>
                    <Popup trigger={ 
                        <Fab color="secondary" aria-label="edit" style={{margin:"8px",marginLeft:"90px"}}>
                            <EditIcon />    
                        </Fab>} position="right center">
                        <TextField
                            id="standard-name"
                            label="Update Todo"
                            style={{marginLeft:"8px",marginRight:"8px",width:"200"}}
                            onChange={this.updatetodo.bind(this)}
                            margin="normal"
                        />
                        <Button variant="contained" color="primary" style={{"margin":"8px"}}
                            onClick={(e)=>{
                                this.setState({
                                    todoId:book.id
                                },()=>{
                                    this.prof()
                                })
                        }}>
                            Update
                        </Button>
                    </Popup>
                    <Fab  aria-label="delete"style={{margin:"8px"}}
                        onClick={(e)=>{
                            this.setState({
                                todoId:book.id
                            },this.delete)
                        }}>
                        <DeleteIcon/>
                    </Fab>
                </div>
            )}
        </div>
   )}
}
export default Todos;