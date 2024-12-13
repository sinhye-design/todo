import { useState } from 'react';
import style from "../css/TodoInput.module.css";
// import { PlusCircleOutlined } from '@ant-design/icons';
import { PlusOutlined } from '@ant-design/icons';


const TodoInput = ({ addTodo }) => {
  const [input, setInput] = useState('');


  const handleAdd = () => {
    if (input.trim()) {
      addTodo(input);
      setInput('');
    }
  };


  const handleKeyDown = (e) => {
    if (e.keyCode === 229) return;
    ////if문이 맞다면 돌아가라, 아니면 다음 문지기 만나러 가
    if (e.key === 'Enter') handleAdd();
    ////문지기가 두개
    ////
  };


  return (
    <div className={style.todocontainer}>
      <h2>ToDO aDD</h2>
      <div className={style.inputframe}>
        <input
        type="text"
        value={input}
        //// 5번줄의 input과 순환구조 
        onChange={(e) => setInput(e.target.value)}
        ////인풋이 가지고 있는 상태값(value)
        onKeyDown={handleKeyDown}
        placeholder="해야 할 일 작성하기📋"
        className={style.todoInput}
      
       />  
        <button onClick={handleAdd} className={style.inputbtn}> aDD </button>
      </div>

    </div>
  );


};


export default TodoInput;