import { useState } from 'react';
import style from "../css/TodoInput.module.css";
import { PlusCircleOutlined } from '@ant-design/icons';


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
    <div className={style.container}>
      <input
        type="text"
        value={input}
        //// 5번줄의 input과 순환구조 
        onChange={(e) => setInput(e.target.value)}
        ////인풋이 가지고 있는 상태값(value)
        onKeyDown={handleKeyDown}
        placeholder="오늘 해야할 일 등록하기📋"
        className={style.todoInput}
      
      />  
      <button onClick={handleAdd}> TODO 등록 <PlusCircleOutlined className={style.plusbutton} /> </button>


    </div>
  );


};


export default TodoInput;