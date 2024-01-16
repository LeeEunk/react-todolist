import "./ToDoInsert.scss";
import { MdAdd } from 'react-icons/md'
import { useCallback, useState } from "react";

// eslint-disable-next-line react/prop-types
const ToDoInsert = ({onInsert}) => {
    const [value, setValue] = useState('');
    // 입력창에 친 값들 추적해서 setValue로 value에 저장
    // useCallback(생성하고 싶은 함수,[배열 안의 값이 바뀌었을 때 함수가 새로 생성됩니다.])
    const onChange = useCallback(e => {
        // 인풋 값 입력
        setValue(e.target.value);
    }, [])
    const onSubmit = useCallback(
        e => {
            onInsert(value);
            setValue('') //value 초기화
            //기본 이벤트(새로고침) 방지
            e.preventDefault();
        },
        [onInsert, value],
        );
    return (
        <form className="ToDoInsert" onSubmit={onSubmit}>
            <input 
            onChange={onChange}
            value={value} placeholder="할 일을 입력하세요" />
            <button type="submit"> <MdAdd /></button>
        </form>
    )
}

export default ToDoInsert;