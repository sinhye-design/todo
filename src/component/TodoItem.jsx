import { useState } from "react";
import style from "../css/TodoItem.module.css";
import { EditFilled } from '@ant-design/icons';
import { DeleteFilled } from '@ant-design/icons';
import { CheckOutlined } from '@ant-design/icons';


const TodoItem = ({ todo, updateTodo, toggleComplete, deleteTodo }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editText, setEditText] = useState(todo.text);


    const handleEdit = () => {
      if (isEditing && editText.trim()) {
        updateTodo(todo.id, editText);
      }
      setIsEditing(!isEditing);
    };


    return (
      <li className={style.li}>
        <input 
          type="checkbox"
          checked={todo.completed}
          onChange={() => toggleComplete(todo.id)} 
        />


        {isEditing ? (
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)} 
          />
        ) : (
          <span
            style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
          >
            {todo.text}
          </span>
        )}        
        
        <button onClick={handleEdit}>
          {isEditing ? <CheckOutlined /> :  <EditFilled />}
        </button>


        <button onClick={() => deleteTodo(todo.id)}>
        <DeleteFilled />
        </button>


      </li>
    
    )



};


export default TodoItem;