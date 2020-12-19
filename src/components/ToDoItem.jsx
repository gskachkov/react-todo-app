import React from 'react';
import { Button, Checkbox } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';

export const ToDoItem = (props) => {
  const { item, onCheck, onRemove } = props;
  const onRemoveItem = (e) => {
    e.preventDefault();

    if (onRemove) {
      onRemove(item.id);
    }
  }

  const onCheckItem = () => {
    if (onCheck) {
      onCheck(item.id);
    }
  }

  return (
    <li className="todo-item" key={item.id}>
      <div className="todo-item-body">
            <Checkbox checked={item.checked} onChange={onCheckItem}></Checkbox>
            <p style={ item.checked ? {'color': 'grey', 'text-decoration': 'line-through'} : {'fontWeight': 'bold'}}>{item.title}, created on: {item.date}</p>
            <p style={ item.checked ? {'color': 'grey', 'text-decoration': 'line-through'} : {'color': 'green'}}>{"Description: " + item.description}</p>
       </div>
      <Button danger = "true" type = "primary" onClick={onRemoveItem} icon={<DeleteOutlined />}></Button>
    </li>
  )
}