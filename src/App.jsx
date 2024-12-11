import { useEffect, useState } from 'react';
import TodoInput from './component/TodoInput';
import TodoList from './component/TodoList';
import MemoInput from './component/MemoInput';
import style from "./css/App.module.css";
import { SearchOutlined } from '@ant-design/icons';

function App() {

  // R 읽기
  const [todos, setTodos] = useState(() => {
    const storedTodos = localStorage.getItem("todos");
    return storedTodos ? JSON.parse(storedTodos) : [];    
  });

  // const [todos, setTodos] = useState(() => {
  //   const storedTodos = localStorage.getItem("todos");
  //   try {
  //     return storedTodos ? JSON.parse(storedTodos) : [];
  //   } catch (error) {
  //     console.error("Failed to parse todos from localStorage:", error);
  //     return []; // JSON.parse가 실패하면 빈 배열 반환
  //   }
  // });



useEffect(() => {
  localStorage.setItem("todos", JSON.stringify(todos));

}, [todos]);



  // C 생성하기 - todo 등록
const addTodo = (text) => {
  setTodos([...todos, {
    id: Date.now(),
    text,
    completed: false
  }]);

};


//U 업데이트 - 텍스트 수정하기

const updateTodo = (id, updatedText) => {
  setTodos(todos.map((todo) => (todo.id === id ? {...todo, text: updatedText} : todo)));
};


//U 업데이트 - 완료 토글

const toggleComplete = (id) => {
  setTodos(todos.map((todo) => (todo.id === id ? {...todo, completed : !todo.completed} : todo )));

};

// D 삭제

const deleteTodo = (id) => {
  setTodos(todos.filter((todo) => todo.id !== id));
};



// 검색기능 구현하기
const [searchQuery, setSearchQuery] = useState("");

const filteredTodos = searchQuery 
  ? todos.filter((todo) => todo.text.toLowerCase().includes(searchQuery.toLowerCase())) 
  : todos;



  // 메모 기능 만들기
  // 으아아앙 시도중

   // R: 로컬 스토리지에서 메모 불러오기
   const [memo, setMemo] = useState(() => {
    const storedMemo = localStorage.getItem("memo");
    return storedMemo ? storedMemo : ""; // 로컬스토리지에서 memo가 있으면 불러오고 없으면 빈 문자열
  });

  // 메모를 로컬스토리지에 저장
  useEffect(() => {
    if (memo) {
      localStorage.setItem("memo", memo);
    }
  }, [memo]);

  // 메모 업데이트 함수
  const updateMemo = (text) => {
    setMemo(text);
  };

  // 메모 지우기 함수
  const clearMemo = () => {
    setMemo(""); // 메모 지우기
    localStorage.removeItem("memo"); // 로컬스토리지에서 삭제
  };





  return (
     <div className = {style.App}>
        <h1>가벼운가? 라고 생각하고 싶은 리액트 투두 리스트</h1>
        <TodoInput addTodo = {addTodo} />
        <TodoList
          // todos={todos}
          todos = {filteredTodos}
          updateTodo={updateTodo}
          toggleComplete={toggleComplete}
          deleteTodo={deleteTodo}
        />
        <div className={style.searchInput}>
          <SearchOutlined className={style.ico}/>
          <input 
          type="search" 
          placeholder='할 일을 검색할 수 있어요'
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div>
        <h1>메모 작성하기 📝</h1>
        <MemoInput 
        memo={memo} 
        updateMemo={updateMemo} 
        clearMemo={clearMemo} />
         </div>

     </div>
  );
};

export default App;
