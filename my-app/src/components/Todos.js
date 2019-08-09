
import React from 'react';
import axios from 'axios';
import SignIn from "./SignIn"
import * as JWT from 'jwt-decode';
import { access } from 'fs';
import { Route, Redirect } from 'react-router'
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import styles from './mystyle.module.css'; 
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import Fab from '@material-ui/core/Fab';
import Icon from '@material-ui/core/Icon';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import Popup from "reactjs-popup";


var jwt = require("jsonwebtoken");

class Todos extends React.Component{
    constructor(props){
        super(props);
        this.state = {            
    //   username:this.props.location.user.username,
      books:[],
      todoId:null,
      updateTodo:"",
      newTodo:"",
      username:"",
      redirect:false
        }
  }


//   componentDidMount(){
  
//     // const searchtag = this.props.location.user.username;
//     console.log(searchtag)

//     fetch(`/retriveTodos?username=${searchtag}`)
//     .then((data)=>data.json()).then(res=>{
//         this.setState({books:res},()=>console.log(this.state.books))
//     })
//     }


componentWillMount(){
    var that = this;
 
    const token =localStorage.getItem("token");
    var decoded = jwt.decode(token);
    this.setState({
        username:decoded.username
    })
 

}
componentDidMount(){
    const searchtag =this.state.username;
    // const searchtag="odayabueid"
    //  const searchtag = this.props.location.user.username;
    console.log(this.state.username)
    fetch(`/retriveTodos?username=${this.state.username}`,{
        method: "get",
        headers:{'x-access-token':localStorage.getItem("token")}
    })
    .then((data)=>data.json()).then(res=>{
        this.setState({books:res},()=>console.log(this.state.books))
    })

}

    updatetodo(event){
        this.setState({
            updateTodo : event.target.value
          },()=>{console.log(this.state.updateTodo)}) 
      }


    prof=()=>{
        var that = this;
        fetch("updateTodo/",{
            method:"PUT",
            headers : {
                Accept: "application/json",
                "Content-Type": "application/json"
              },
              body: JSON.stringify({
                "todo":this.state.updateTodo,
                "id" : this.state.todoId
                } 
                )
        }).then((response) => {
            console.log(response )
        }).then(()=>{
            this.componentDidMount()
        })
      }
 
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
                } 
                )
        }).then((response) => {
            console.log(response )
        }).then(()=>{
            this.componentDidMount()
        })
      }

      add=()=>{
        fetch("addTodo/",{
            method:"POST",
            headers : {
                Accept: "application/json",
                "Content-Type": "application/json"
              },
              body: JSON.stringify({
                "username":this.state.username,
                "todo" : this.state.newTodo
                } 
                )
        }).then((response) => {
            console.log(response )
        }).then(()=>{
            this.componentDidMount()
        }
           
        )
      }

      newTodo(event){
        this.setState({
            newTodo:event.target.value
          },()=>{console.log(this.state.newTodo)}) 
      }

   logout=()=>{
       localStorage.clear();
       this.setState({
           redirect:true
       })
     
   }

   renderRedirect = () =>{
    if(this.state.redirect){
      return <Redirect to = {{
        pathname:"/signin"
          }}/>
    }
}
handleChange =()=>{
    alert("sssssssssssssss")
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
              <Button variant="contained" color="primary" style={{margin:"8px",marginTop:"16px"}} onClick={this.add}>
                    Add 
            </Button>
            <Button variant="contained" color="secondary" style={{margin:"8px",marginTop:"16px",marginLeft:"30%"}} onClick={this.logout}>
                Log Out
            </Button>















            </form>
            {this.state.books.map(book=>
            <div>
     
                <Checkbox
                    // checked={state.checkedA}
                    onChange={this.handleChange}
                    value="checkedA"
                    inputProps={{
                    'aria-label': 'primary checkbox',
                }}/>
                <span>{book.todo}</span>
           
            
                <Popup trigger={ <Fab color="secondary" aria-label="edit" style={{margin:"8px"}}>
                <EditIcon />    
                </Fab>} position="right center">
                    <input type="text" onChange={this.updatetodo.bind(this)}></input>
                    <button  onClick={(e)=>{
                    this.setState({
                        todoId:book.id
                    },()=>{
                        this.prof()
                    })
                }}>update</button>
                </Popup>

                <Fab  aria-label="delete"style={{margin:"8px"}}
                onClick={(e)=>{
                    this.setState({
                        todoId:book.id
                    },()=>{
                        this.delete()
                    })
                }}
                >
                    <DeleteIcon />
                </Fab>
            </div>
            
            )}




           
        </div>
        )}
}
export default Todos;