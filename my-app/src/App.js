import React from 'react';
import Todos from "./components/Todos.js"
import SignIn from "./components/SignIn.js"
import Home from "./components/Home.js"
import SignUp from "./components/SignUp.js"
import { BrowserRouter , Router } from "react-router-dom";
import { Route } from 'react-router-dom';



class App extends React.Component{

  constructor(props){
    super(props);

}

  render(){
  return (
    <div>
    <BrowserRouter>
      <div>
        <Route exact path="/todos" component={Todos} />
      </div>
      <div>
        <Route exact path ="/signin" component ={SignIn}/>
      </div>
      <div>
        <Route exact path ="/signup" component ={SignUp}/>
      </div>
      <div>
        <Route exact path ="/" component ={Home}/>
      </div>
    </BrowserRouter>
       
    </div>
  );
  }
}

export default App;