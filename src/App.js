import React, { Component } from 'react';
import TodoListTemplate from './components/TodoListTemplate.js'
import Form from './components/Form';
import TodoItemList from './components/TodoItemList';
import Palette from './components/Palette.js';
import './App.css';

const colors=['#343a40', '#f03e3e', '#12b886', '#228ae6'];

class App extends Component { 
  id = 0;
  state= {
    input: '',
    todos: [],
    color: '#343a40',
  }

  changeColor = (color) => {
    this.setState({
      color
    })
  }

  handleToggle = (id) => {
    const {todos} = this.state;

    const index = todos.findIndex(todo=>todo.id===id);
    const selected = todos[index];

    const nextTodos = [...todos];

    nextTodos[index] = {
      ...selected,
      checked: !selected.checked
    };

    this.setState({
      todos: nextTodos
    })
  }

handleChange = (e) => {
  this.setState({
    input: e.target.value
  });
}

handleCreate = () => {
  const {input, todos, color} = this.state;
  if (input !=='') {
    this.setState({
      input: '',
      todos: todos.concat({
        id: this.id++,
        text: input,
        checked: false,
        color
      })
    })
  } else {
    alert("공백으로 만들 수 없습니다.");
  }
}

handleKeyPress = (e) => {
  if (e.key === 'Enter') {
    this.handleCreate();
  }
}

handleRemove= (id) => {
  const {todos} = this.state;
  this.setState({
    todos: todos.filter(todo=> todo.id !== id)
  });
}

  render() {
    const {input, todos, color} = this.state;
    const {
      handleChange,
      handleCreate,
      handleKeyPress,
      handleToggle,
      handleRemove,
      changeColor
    } = this;

    return (
      <TodoListTemplate form={(
        <Form
          value={input}
          onKeyPress={handleKeyPress}
          onChange={handleChange}
          onCreate={handleCreate}
          color={color}
        />
      )}
      palette={(
        <Palette colors={colors} selected={color} onColorChange={changeColor}/>
      )}
      >
        <TodoItemList todos={todos} onToggle={handleToggle} onRemove= {handleRemove}/>
      </TodoListTemplate>
    );
  }
}

export default App;
