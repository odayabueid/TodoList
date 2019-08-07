
import React from 'react';
import axios from 'axios';
import SignIn from "./SignIn"
class Todos extends React.Component{
    constructor(props){
        super(props);
        this.state = {            
      username:this.props.location.user.username,
      books:[],
      todoId:null,
      updateTodo:"",
      newTodo:""
        }
  }


  componentDidMount(){
  
    const searchtag = this.props.location.user.username;
    console.log(searchtag)

    fetch(`/retriveTodos?username=${searchtag}`)
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
        })
      }

      newTodo(event){
        this.setState({
            newTodo:event.target.value
          },()=>{console.log(this.state.newTodo)}) 
      }

   


  render(){
    return(
        <div>
            <input type="text" placeholder="Add Todo" onChange={this.newTodo.bind(this)}></input>
            <button onClick={this.add}>Add Todo</button>
           {this.state.books.map(book=>
            <div>
                <h1>{book.todo}</h1>
                <input type="text" placeholder="write new todo" onChange={this.updatetodo.bind(this)}></input>
                <button onClick={(e)=>{
                    this.setState({
                        todoId:book.id
                    },()=>{
                        this.prof()
                    })
                }}>update</button>
                <button onClick={(e)=>{
                    this.setState({
                        todoId:book.id
                    },()=>{
                        this.delete()
                    })
                }}>delete</button>
            </div>
            )}
        </div>
        )}
}
export default Todos;