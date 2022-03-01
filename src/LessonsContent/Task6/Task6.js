import React, { useState, useContext, useEffect, useRef, useMemo, useCallback } from "react";
import "./Task6.css";
import { Context } from "../../Context";
import { HeadingText } from "../HeadingText/HeadingText";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';




// Контент модального окна - Алфавит
const AlphabetModalContent = () => {
  return (
    <>
      <h3> Словать</h3>
      <br />
      <p>Много разных слов</p>
    </>
  );
};

// Контент модального окна - Помощь
const HelpModalContent = () => {
  return (
    <>
      <h3>Электронный помощник</h3>
      <br />
      <p></p>
    </>
  );
};

// Изменение заголовка (поддерживаеи html тэги)
// START
// Верхний заголовок - название урока ( <> текст размещать внутри тэгов </> )
const LessonHeading = () => (
  <>
    <p>Правильный порядок слов</p>
  </>
);
// Заголовок с заданием к уроку ( <> текст размещать внутри тэгов </> )
const ThemeHeading = () => (
  <>
    <p style={{ textAlign: "center" }}></p>
  </>
);
// Текс title с переводом (НЕ поддерживает html тэги)
// const titleHeading = "Установите буквы в правильном порядке.";

const words = [
  {
    id: 'id_1',
    order: '1',
    word: 'There',
  },
  {
    id: 'id_2',
    order: '2',
    word: 'was',
  },
  {
    id: 'id_3',
    order: '3',
    word: 'not',
  },
  {
    id: 'id_4',
    order: '4',
    word: 'a',
  },
  {
    id: 'id_5',
    order: '5',
    word: 'cooker',
  },
  {
    id: 'id_6',
    order: '6',
    word: 'in',
  },
  {
    id: 'id_7',
    order: '7',
    word: 'the',
  },
  {
    id: 'id_8',
    order: '8',
    word: 'kitchen',
  },
];

const words2 = [
  {
    id: 'id_1',
    order: '1',
    word: 'There',
  },
  {
    id: 'id_2',
    order: '2',
    word: 'were',
  },
  {
    id: 'id_3',
    order: '3',
    word: 'not',
  },
  {
    id: 'id_4',
    order: '4',
    word: 'any',
  },
  {
    id: 'id_5',
    order: '5',
    word: 'plates',
  },
  {
    id: 'id_6',
    order: '6',
    word: 'in',
  },
  {
    id: 'id_7',
    order: '7',
    word: 'the',
  },
  {
    id: 'id_8',
    order: '8',
    word: 'fridge',
  },
];

const words3 = [
  {
    id: 'id_1',
    order: '1',
    word: 'There',
  },
  {
    id: 'id_2',
    order: '2',
    word: 'was',
  },
  {
    id: 'id_3',
    order: '3',
    word: 'not',
  },
  {
    id: 'id_4',
    order: '4',
    word: 'any',
  },
  {
    id: 'id_5',
    order: '5',
    word: 'salad',
  },
  {
    id: 'id_6',
    order: '6',
    word: 'on',
  },
  {
    id: 'id_7',
    order: '7',
    word: 'my',
  },
  {
    id: 'id_8',
    order: '8',
    word: 'plate',
  },
];

const words4 = [
  {
    id: 'id_1',
    order: '1',
    word: 'There',
  },
  {
    id: 'id_2',
    order: '2',
    word: 'were',
  },
  {
    id: 'id_3',
    order: '3',
    word: 'not',
  },
  {
    id: 'id_4',
    order: '4',
    word: 'any',
  },
  {
    id: 'id_5',
    order: '5',
    word: 'children',
  },
  {
    id: 'id_6',
    order: '6',
    word: 'in',
  },
  {
    id: 'id_7',
    order: '7',
    word: 'the',
  },
  {
    id: 'id_8',
    order: '8',
    word: 'living',
  },
  {
    id: 'id_9',
    order: '9',
    word: 'room',
  },
];

const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: "none",
  // change background colour if dragging
  color: isDragging ? "#1D66FF" : "#000000",
  // styles we need to apply on draggables
  ...draggableStyle
});




const Sentences = ({ words }) => (
  <Droppable droppableId="droppable" direction="horizontal">
    {(provided, snapshot) => (
      <div className="sentenceWrapper"
        ref={provided.innerRef}
        {...provided.droppableProps}
      >
        {words.map((word, index) => {
          return (
            <Draggable key={word.id} draggableId={word.id} index={index}>
              {(provided, snapshot) => (

                <div className="draggableWord" data-order={word.order}
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                  style={getItemStyle(
                    snapshot.isDragging,
                    provided.draggableProps.style
                  )}
                >
                  <p className="singleWord">{word.word}</p>
                </div>

              )}
            </Draggable>
          )
        })}

        {provided.placeholder}

      </div>
    )}
  </Droppable >
);

function Task6() {
  const {
    helpSetIcon,
    alphabetSetIcon,
    helpSetModalContent,
    alphabetSetModalContent,
    lessonSetStartAction,
    lessonSetFinishAction,
    lessonSetResetTask,
    resetTask,
    lessonSetCheckTask,
    checkTask,
    lessonSetAndAnswer,
    lessonSetViewFeedback,
  } = useContext(Context);

  // const wordsReady = useCallback((words) => {
  //   return words.sort(() => Math.random() > 0.5 ? 1 : -1);
  // }, []);

  // const wordsReady2 = useCallback((words) => {
  //   return words.sort(() => Math.random() > 0.5 ? 1 : -1);
  // }, []);

  const [items, setItems] = useState([]);
  const [items2, setItems2] = useState([]);
  const [items3, setItems3] = useState([]);
  const [items4, setItems4] = useState([]);
  const [reset, setReset] = useState(false);

  // Иконки правого поля  - (помощь и алфавит)
  useEffect(() => {
    //  helpSetIcon - иконка электронного помощника (включить - true, отключить - false)
    helpSetIcon(true);
    //  alphabetSetIcon - иконка алфавита (включить - true, отключить - false)
    alphabetSetIcon(true);
    helpSetModalContent(<HelpModalContent />);
    alphabetSetModalContent(<AlphabetModalContent />);
    setItems(words.sort(() => Math.random() - 0.5));
    setItems2(words2.sort(() => Math.random() - 0.5));
    setItems3(words3.sort(() => Math.random() - 0.5));
    setItems4(words4.sort(() => Math.random() - 0.5));
    // listWrapper.current.style.width = `${listWrapper.current.clientWidth}px`;
  }, []);

  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  function onDragEnd(result) {
    if (!result.destination) {
      return;
    }
    const itemsTemp = reorder(
      items,
      result.source.index,
      result.destination.index
    );
    setItems(itemsTemp);
  }

  function onDragEnd2(result) {
    if (!result.destination) {
      return;
    }
    const itemsTemp = reorder(
      items2,
      result.source.index,
      result.destination.index
    );
    setItems2(itemsTemp);
  }

  function onDragEnd3(result) {
    if (!result.destination) {
      return;
    }
    const itemsTemp = reorder(
      items3,
      result.source.index,
      result.destination.index
    );
    setItems3(itemsTemp);
  }

  function onDragEnd4(result) {
    if (!result.destination) {
      return;
    }
    const itemsTemp = reorder(
      items4,
      result.source.index,
      result.destination.index
    );
    setItems4(itemsTemp);
  }

  //  Внесение изменений в контент задания
  return (
    <div className="lessonContent">
      <HeadingText
        lessonHeading={<LessonHeading />}
        themeHeading={<ThemeHeading />}
        // titleHeading={titleHeading}
        // soundSource={soundSource}
        soundVisible={false}
        titleVisible={false}
      />
      <div className="sentencesWrapper">
        <div className="sentencesBox">
          1)<DragDropContext onDragEnd={onDragEnd}>
            <Sentences
              key={reset}
              words={items}
            />
          </DragDropContext>
          <p style={{ margin: '0 -10px', padding: '0' }}>.</p>
        </div>
        <div className="sentencesBox">
          2)<DragDropContext onDragEnd={onDragEnd2}>
            <Sentences
              key={reset}
              words={items2}
            />
          </DragDropContext>
          <p style={{ margin: '0 -10px', padding: '0' }}>.</p>
        </div>
        <div className="sentencesBox">
          3)<DragDropContext onDragEnd={onDragEnd3}>
            <Sentences
              key={reset}
              words={items3}
            />
          </DragDropContext>
          <p style={{ margin: '0 -10px', padding: '0' }}>.</p>
        </div>

        <div className="sentencesBox">
          4)<DragDropContext onDragEnd={onDragEnd4}>
            <Sentences
              key={reset}
              words={items4}
            />
          </DragDropContext>
          <p style={{ margin: '0 -10px', padding: '0' }}>.</p>
        </div>
      </div>
    </div >
  );
}

export default Task6;