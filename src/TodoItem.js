import React , {Component} from 'react';
export default class TodoItem extends Component{
    render(){
        return (
            <div>
                <input type="checkbox" checked={this.props.todo.status === 'completed'}
                onChange={this.toggle.bind(this)}  />
                <button onClick={this.delete.bind(this)}>删除</button>
                {this.props.todo.title}
            </div>
        )
    }
    delete(e){
        this.props.onDelete(e,this.props.todo)
    }
    toggle(e){
        this.props.onToggle(e,this.props.todo)
    }
}