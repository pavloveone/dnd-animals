import React from 'react';
import styles from './animal-element.module.css';

export const AnimalElement = (props) => {
    const { item, handleClick } = props;

    return (
        <>
            <div 
                className={styles.element} 
                onDoubleClick={handleClick}>
                    {item.content}
            </div>
        </>

    )
}