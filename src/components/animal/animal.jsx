import React from 'react';
import styles from './animal.module.css';

export const Animal = (props) => {
    const { data, onDragHandler, remove } = props;
    return (
        <div
            className={styles.animal}
            draggable
            onDoubleClick={remove}
            onDrag={(e) => onDragHandler(e, data)}>
            {data.content}
        </div>
    )
}