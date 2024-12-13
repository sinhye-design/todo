// import React from "react";
import style from "../css/MemoInput.module.css";

const MemoInput = ({ memo, updateMemo, clearMemo }) => {
  const handleChange = (e) => {
    updateMemo(e.target.value); // 메모가 변경되면 부모 컴포넌트로 값 전달
  };

  const handleClear = () => {
    clearMemo(); // 메모를 지우는 함수 호출
  };

  return (
    <div className={style.memoInput}>
      <textarea
        value={memo}
        onChange={handleChange}
        placeholder="메모를 작성할 수 있어요"
        rows="4"
        cols="50"
      />
      <button onClick={handleClear}>dEL</button>
    </div>
  );
};

export default MemoInput;