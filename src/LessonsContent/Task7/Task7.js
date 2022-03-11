import React, { useState, useContext, useEffect, useRef, useMemo, useCallback } from "react";
import s from "./Task7.module.css";
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


function Task7() {
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

  // Иконки правого поля  - (помощь и алфавит)
  useEffect(() => {
    //  helpSetIcon - иконка электронного помощника (включить - true, отключить - false)
    helpSetIcon(true);
    //  alphabetSetIcon - иконка алфавита (включить - true, отключить - false)
    alphabetSetIcon(true);
    helpSetModalContent(<HelpModalContent />);
    alphabetSetModalContent(<AlphabetModalContent />);
    // listWrapper.current.style.width = `${listWrapper.current.clientWidth}px`;
  }, []);


  useEffect(() => {
    if (resetTask === true) {

    }
    lessonSetResetTask(false);
  }, [resetTask]);

  useEffect(() => {
    if (checkTask === true) {

    }
    lessonSetCheckTask(false);
  }, [checkTask]);



  //  Внесение изменений в контент задания
  return (
    <div className="lessonContent">
      <HeadingText
        lessonHeading={<LessonHeading />}
        themeHeading={<ThemeHeading />}
        // titleHeading={titleHeading}
        // soundSource={soundSource}
        soundVisible={true}
        titleVisible={true}
      />
      <div className={s.wrapper}>

      </div>
    </div >
  );
}

export default Task7;