/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React from 'react';
import {
  MdCheckBoxOutlineBlank,
  MdRemoveCircleOutline,
  MdCheckBox,
  MdModeEditOutline,
} from 'react-icons/md';
import './ToDoListItem.scss';
import cn from 'classnames';

const ToDoListItem = ({
    todo, 
    onRemove,
    onToggle,
    onChangeSelectedTodo,
    onInsertToggle,
    style
}) =>  {

    const {id, text, checked } = todo; // 구조 분해 할당 이제 id = todo.id , text = todo.text , checked = todo.checked인 거임

    return(
        <div className="ToDoListItem-virtualized" style={style}>
      <li className="ToDoListItem">
        <div
          className={cn('checkbox', { checked: checked })}
          onClick={() => onToggle(id)}
        >
          {checked ? <MdCheckBox /> : <MdCheckBoxOutlineBlank />}
          <div className="text">{text}</div>
        </div>
        <div
          className="edit"
          onClick={() => {
            onChangeSelectedTodo(todo);
            onInsertToggle();
          }}
        >
          <MdModeEditOutline />
        </div>
        <div className="remove" onClick={() => onRemove(id)}>
          <MdRemoveCircleOutline />
        </div>
      </li>
    </div>
    );
}

// eslint-disable-next-line react-refresh/only-export-components
export default React.memo(ToDoListItem);