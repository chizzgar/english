import React, { useState, useContext, useEffect, useRef, useMemo } from "react";
import s from "./Task4.module.css";
import { Context } from "../../Context";
import { HeadingText } from "../HeadingText/HeadingText";

import wrong from "./img/wrong.svg";
import right from "./img/right.svg";
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
    <p>English words</p>
  </>
);
// Заголовок с заданием к уроку ( <> текст размещать внутри тэгов </> )
const ThemeHeading = () => (
  <>
    <p style={{ textAlign: "center" }}>Найди неправильное слово и замени его</p>
  </>
);
// Текс title с переводом (НЕ поддерживает html тэги)
const titleHeading = "Перевод";

const words = [
  {
    id: 'id_1',
    word: 'There',
    status: true
  },
  {
    id: 'id_2',
    word: 'were',
    status: true
  },
  {
    id: 'id_3',
    word: 'dirty',
    status: false,
    rightWord: 'clean',
  },
  {
    id: 'id_4',
    word: 'spoons',
    status: true
  }

];

const Words = ({ words, handleKey, handleBlur }) => {
  const wordsReady = words.map(word => word.word);
  return (
    <p className={s.checkingWords}>
      {wordsReady.map((word, index) => (

        <>
          <span onKeyDown={handleKey} onBlur={handleBlur} className={s.checkingWord} contentEditable="true" suppressContentEditableWarning={true}>
            {word}
          </span>
          <span >
            {index === wordsReady.length - 1 ? '.' : ' '}
          </span>
        </>
      )
      )}
    </p>
  )
}


function Task4() {
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
  }, []);

  const [stateWords, setStateWords] = useState();
  const [sentenceAnswer, setSentenceAnswer] = useState(false);

  const handleBlur = (e) => {
    setStateWords(e.target.textContent);
    console.log(stateWords)
  }


  const handleKey = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      setStateWords(e.target.textContent);
      e.target.blur();
      console.log(stateWords)

    }
  }
  //  Внесение изменений в контент задания
  return (
    <div className="lessonContent">
      <HeadingText
        lessonHeading={<LessonHeading />}
        themeHeading={<ThemeHeading />}
        titleHeading={titleHeading}
        // soundSource={soundSource}
        soundVisible={false}
        titleVisible={true}
      />
      <div className={s.replaceWordsWrapper} >
        <div className={s.sentenseWrapper}><Words words={words} handleKey={handleKey} handleBlur={handleBlur} />{sentenceAnswer ? < img className={s.imgFeedBack} src={right} /> : <img className={s.imgFeedBack} src={wrong} />}</div>

      </div>

    </div>
  );
}

export default Task4;
