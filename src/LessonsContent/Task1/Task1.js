import React, { useState, useContext, useEffect, useRef, useMemo } from "react";
import "./Task1.css";
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
      <p>Контент направленный на помощь в обучении</p>
    </>
  );
};

// Изменение заголовка (поддерживаеи html тэги)
// START
// Верхний заголовок - название урока ( <> текст размещать внутри тэгов </> )
const LessonHeading = () => (
  <>
    <p>English</p>
  </>
);
// Заголовок с заданием к уроку ( <> текст размещать внутри тэгов </> )
const ThemeHeading = () => (
  <>
    <p style={{ textAlign: "center" }}>
      Считай вслух, начиная со слона. Сколько всего игрушек? Укажи правильный
      ответ.
    </p>
  </>
);
// Текс title с переводом (НЕ поддерживает html тэги)
const titleHeading = "First slide";


function Task1() {
  const {
    helpSetIcon,
    alphabetSetIcon,
    helpSetModalContent,
    alphabetSetModalContent,
    lessonSetStartAction,
    lessonSetResetTask,
    resetTask,
    lessonSetCheckTask,
    checkTask,
    lessonSetAndAnswer,
  } = useContext(Context);



  // Иконки правого поля  - (помощь и алфавит)
  useEffect(() => {
    //  helpSetIcon - иконка электронного помощника (включить - true, отключить - false)
    helpSetIcon(true);
    //  alphabetSetIcon - иконка алфавита (включить - true, отключить - false)
    alphabetSetIcon(true);
    helpSetModalContent(<HelpModalContent />);
    alphabetSetModalContent(<AlphabetModalContent />);

  }, []);


  //  Внесение изменений в контент задания
  return (
    <div className="lessonContent">
      <HeadingText
        lessonHeading={<LessonHeading />}
        themeHeading={<ThemeHeading />}
        titleHeading={titleHeading}
        // soundSource={soundSource}
        soundVisible={true}
        titleVisible={true}
      />
      <div className="slideWrapper">
        контент
      </div>
    </div>
  );
}

export default Task1;
