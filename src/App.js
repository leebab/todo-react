import React, { Component } from 'react';
import './App.css';
import TodoInput from './TodoInput'
import TodoItem from './TodoItem'
import 'normalize.css'

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      newTodo:'',
      todoList:[
      ]
    }
  }
  render() {
    let todu = this.state.todoList.map((item,index)=>{
      return ( <li key={index}><TodoItem todo = {item} onToggle={this.toggle.bind(this)}/></li>);
    })
   
    return (
      <div className="App">
        <h1>我的待办</h1>
        <div className="inputWrapper">
        <TodoInput content={this.state.newTodo} 
          onChange={this.changeTitle.bind(this)}
          onSubmit={this.addTodo.bind(this)}/>
        </div>
         <ol>
          {todu}
        </ol> 
      </div>
    )
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