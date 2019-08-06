import React from 'react';
import logo from './logo.svg';
import './App.css';
// import { BrowserRouter , Router, Route } from "react-router-dom";


class App extends React.Component{

  constructor(props){
    super(props);

}

  render(){
  return (
    <div>
    {/* <BrowserRouter>
      <div>
        <Route exact path="/todos" component={Todos} />
      </div>
      <div>
        <Route exact path ="/user" component ={Users}/>
      </div>
      <div>
        <Route exact path ="/" component ={Home}/>
      </div>
    </BrowserRouter> */}
       
    </div>
  );
  }
}

export default App;