import React, { useState, useContext, useEffect, useRef, useMemo } from "react";
import "./Task6.css";
import { Context } from "../../Context";
import { HeadingText } from "../HeadingText/HeadingText";




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


const Sentences = ({ words, listWrapper, onMouseDown }) => (
  <div className="sentensesWrapper">
    <div className="sentenceWrapper"
      ref={listWrapper}
    >
      {words.map((word, index) => (
        <React.Fragment key={word.id} >
          <div className="draggableWord" onMouseDown={onMouseDown} data-order={word.order}>
            <p className="singleWord">{word.word}</p>
          </div>
        </React.Fragment>))}
    </div>
    <div className="sentenceWrapper">
      2{ }
    </div>
    <div className="sentenceWrapper">
      3{ }
    </div>
  </div>
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

  const [draggingElem, setDraggingElem] = useState(null);
  const [reset, setReset] = useState(false);
  const listWrapper = useRef(null);

  // Иконки правого поля  - (помощь и алфавит)
  useEffect(() => {
    //  helpSetIcon - иконка электронного помощника (включить - true, отключить - false)
    helpSetIcon(true);
    //  alphabetSetIcon - иконка алфавита (включить - true, отключить - false)
    alphabetSetIcon(true);
    helpSetModalContent(<HelpModalContent />);
    alphabetSetModalContent(<AlphabetModalContent />);
    listWrapper.current.style.width = `${listWrapper.current.clientWidth}px`;
  }, []);






  const wordsReady = useMemo(() => {
    return words.sort(() => Math.random() > 0.5 ? 1 : -1);
  }, []);

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

      <div className="memoryCardsWrapper">
        <Sentences
          key={reset}
          words={wordsReady}
          listWrapper={listWrapper}

        />
      </div>
    </div>
  );
}

export default Task6;