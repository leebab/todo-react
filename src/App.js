import React, { Component } from 'react';
import './App.css';
import TodoInput from './TodoInput'
import TodoItem from './TodoItem'
import 'normalize.css'
import UserDialog from './UserDialog'
import {getCurrentUser , signOut} from './leanCloud'



class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      user:getCurrentUser()||{},
      newTodo:'',
      todoList:[]
    }
  }
  
  render() {
    let todu = this.state.todoList.filter((item)=>!item.deleted).map((item,index)=>{
      return ( <li key={index}>
              <TodoItem todo = {item} onToggle={this.toggle.bind(this)}
              onDelete={this.delete.bind(this)}/>
               </li>);
    })
   
    return (
      <div className="App">
        <h1>{this.state.user.username||'我'}的待办
          {this.state.user.id?<button onClick={this.signOut.bind(this)}>注销</button>:null}
        </h1>
        <div className="inputWrapper">
        <TodoInput content={this.state.newTodo} 
          onChange={this.changeTitle.bind(this)}
          onSubmit={this.addTodo.bind(this)}/>
        </div>
         <ul className="todoList">
          {todu}
        </ul> 
         {this.state.user.id ? null : <UserDialog onSignIn={this.onSignUporsignIn.bind(this)} onSignUp={this.onSignUporsignIn.bind(this)}/>}
      </div>
    )
  }
   
    onSignUporsignIn(user){
      let stateCopy = JSON.parse(JSON.stringify(this.state)) 
      stateCopy.user = user
      this.setState(stateCopy)
    }
    signOut(){
      signOut()
      let stateCopy=JSON.parse(JSON.stringify(this.state))
      stateCopy.user={}
      this.setState(stateCopy)
    }
    delete(event,todo){
      todo.deleted=true
      this.setState(this.state)
    }
    toggle(e,todo){
      todo.status = todo.status === 'completed'?'':'completed'
      this.setState(this.state)
     
    }
    changeTitle(event){
      this.setState({
        newTodo:event.target.value,
        todoList:this.state.todoList
      })
    }
    addTodo(event){
      // console.log('我得添加一个TODOle')
      this.state.todoList.push({
        id:idMaker(),
        title:event.target.value,
        status:null,
        deleted:false
      })
      this.setState({
        newTodo:'',
        todoList:this.state.todoList
      })
    }
}

export default App;

let id = 0
function idMaker(){
  id+=1
  return id
}