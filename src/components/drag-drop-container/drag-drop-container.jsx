import React, {useState, useEffect} from 'react';
import { AnimalElement } from '../animal-element/animal-element';
import { Animal } from '../animal/animal';
import { DropTarget } from '../drop-target/drop-target';
import styles from './drag-drop-container.module.css';
import { listImages } from '../../utils/constants';

export const DragDropContainer = () => {
    const [animals, setAnimals] = useState([]);
    const [elements, setElements] = useState([]);
    const [draggedElements, setDraggetElements] = useState([]);
    const [draggedElement, setDraggetElement] = useState({});
    const [isClicked, setIsClicked] = useState(false);

    const handleDrag = (e, element) => {
        e.preventDefault();
        setDraggetElement(element);
    }

    const handleDragOver = e => e.preventDefault();

    const removeAnimal = (e) => {
        const currentAnimal = elements.find(animal => animal.content === e.target.textContent)
        setAnimals([
            ...animals,
            currentAnimal
        ])

        setElements([
            ...elements.filter(element => element !== currentAnimal)
        ])
    }

    const handleClick = (e) => {
        const currentAnimal = animals.find(animal => animal.content === e.target.textContent)
        setElements([
            ...elements,
            currentAnimal
        ])

        setAnimals([
            ...animals.filter(element => element !== currentAnimal)
        ])
    }

    const handleDrop = () => {
        setDraggetElements([
            ...draggedElements,
            draggedElement
        ]);

        setElements([
            ...elements.filter(element => element.id !== draggedElement.id)
        ])

        setDraggetElement({});
    }

    useEffect(() => {
        setAnimals([
            ...listImages
        ])
    }, []);

    return (
        <>
            {animals.length > 0 && (
                <div className={styles.itemsContainer}>
                { animals.map(animal => (
                    <AnimalElement key={animal.id} item={animal} handleClick={handleClick} />
                ))}
            </div>
            )}
            <article className={animals.length > 0 ? styles.elements : styles.elements + ' ' + styles.elements_empty}>
                <div className={styles.container}>
                    { elements && elements.map(animal => (
                        <Animal key={animal.id} data={animal} onDragHandler={handleDrag} remove={removeAnimal} />
                    ))}
                </div>
                <DropTarget onDragOverHandler={handleDragOver} onDropHandler={handleDrop}>
                    {draggedElements.map(item => (
                        <div key={item.id} className={styles.item}>
                            <span className={styles.animal}>
                                {item.content}
                            </span>
                            <p>{item.text}</p>
                        </div>
                    ))}
                </DropTarget>
            </article>
        </>
        
    );
}