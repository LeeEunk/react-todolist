/* eslint-disable react/prop-types */
import { useCallback, useEffect, useState } from 'react';
import './ToDoEdit.scss';

// insert와 매우 흡사

// eslint-disable-next-line no-unused-vars
const ToDoEdit = ({ insertToggle, selectedTodo, onUpdate }) => {

    const [value, setValue] = useState('');

    const onChange = useCallback((e) => {
        setValue(e.target.value);
    },[]);

    const onSubmit = useCallback(
        (e) => {
            onUpdate(selectedTodo.id, value);
            setValue('') // value 초기화
            //기본 이벤트(새로고침)방지
            e.preventDefault();
        },
        [onUpdate, value],
    );

    useEffect(() => {
        if(selectedTodo) {
            setValue(selectedTodo.text);
        }
    },[selectedTodo]);


    return (
        <div className="background">
            <form onSubmit={onSubmit} className="todoedit__insert">
                <h2>수정하기</h2>
                    <input
                    onChange={onChange}
                    value={value}
                    placeholder="할 일을 입력하세요"
                    />
                    <button type="submit">수정</button>
            </form>
        </div>
    );
}

export default ToDoEdit;