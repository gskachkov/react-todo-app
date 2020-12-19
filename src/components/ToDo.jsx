import React, { useState } from 'react';
import { Card, Divider, Button } from 'antd';
import { ToDoItem } from './ToDoItem';
import { ToDoForm } from './ToDoForm';

export const ToDo = () => {
  const [todos, setTodos] = useState([
    {id: 1, title: 'Some todo', description: 'first todo', date: new Date().getDay() + '.' + new Date().getMonth() + '.'  + new Date().getFullYear() + ' - ' + new Date().getHours() + ':' + new Date().getMinutes(), checked: false},
    {id: 2, title: 'Another one', description: 'second todo', date: new Date().getDay() + '.' + new Date().getMonth() + '.'  + new Date().getFullYear() + ' - ' + new Date().getHours() + ':' + new Date().getMinutes(), checked: false}
  ]);
  const [idCount, setIdCount] = useState(10);

  const renderTodoItems = (todos) => {
    return (
      <ul className="todo-list">
        { todos.map(todo => <ToDoItem 
            key={todo.id}
            item={todo}
            onRemove={onRemove} 
            onCheck={onCheck} 
          />) }
      </ul>
    )
  }

  const onRemove = (id) => {
    const index = todos.findIndex(todo => todo.id === id);

    if (index !== -1) {
      todos.splice(index, 1);
      setTodos([...todos]);
    }
  }

  const onCheck = (id) => {
    const index = todos.findIndex(todo => todo.id === id);
    
    if (index !== -1) {
      const todo = todos[index];

      todo.checked = !todo.checked;
      todos.splice(index, 1, todo);

      setTodos([...todos]);
    }
  }

  const onSubmit = (title, description) => {
    if (title.length < 3 || description.length < 3)
      alert("Both title and description should be longer than 3 characters");
    else if (title[0] !== title[0].toUpperCase())
      alert("Title should start from capital letter!");
    else {
      const todo = {
        title,
        description,
        date: new Date().getDay() + '.' + new Date().getMonth() + '.'  + new Date().getFullYear() + ' - ' + new Date().getHours() + ':' + new Date().getMinutes(),
        id: idCount,
        checked: false
      };
      setTodos([...todos, todo]);
      setIdCount(idCount + 1);
    }
  } 

  const countUnchecked = () => {
    let count = 0;
    for (let i = 0; i < todos.length; i++) {
      if (!todos[i].checked)
        count++;
    }
    return count;
  }

  const onRemoveChecked = () => { 
    for (let i = 0; i < todos.length; i++){
      if (todos[i].checked) {
          todos.splice(i, 1);
          i--;
      }
    }
    setTodos([...todos]);
  }

  return (
    <Card title={'My todos'} className="todo-card">
      <ToDoForm onSubmit={onSubmit} />
      <Divider />
      { renderTodoItems(todos) }
      <Divider />
      <p>Unchecked todos count: {countUnchecked()}</p>
      <Divider />
      <Button danger = "true" htmlType="submit" type="primary" onClick={onRemoveChecked}>Remove checked cards</Button>
    </Card>
  );
}
