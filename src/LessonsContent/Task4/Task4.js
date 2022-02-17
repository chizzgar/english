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

const wordsFirst = [
  {
    id: 'id_1',
    word: 'There',
    status: true,
    rightWord: '',
  },
  {
    id: 'id_2',
    word: 'were',
    status: true,
    rightWord: '',
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
    status: true,
    rightWord: '',
  }

];

const wordsSecond = [
  {
    id: 'id_1',
    word: 'There',
    status: true,
    rightWord: '',
  },
  {
    id: 'id_2',
    word: 'was',
    status: true,
    rightWord: '',
  },
  {
    id: 'id_3',
    word: 'chicken',
    status: true,
    rightWord: '',
  },
  {
    id: 'id_4',
    word: 'in',
    status: true,
    rightWord: '',
  },
  {
    id: 'id_5',
    word: 'the',
    status: true,
    rightWord: '',
  },
  {
    id: 'id_6',
    word: 'cupboard',
    status: false,
    rightWord: 'fridge',
  }

];


const wordsThird = [
  {
    id: 'id_1',
    word: 'There',
    status: true,
    rightWord: '',
  },
  {
    id: 'id_2',
    word: 'was',
    status: false,
    rightWord: 'were',
  },
  {
    id: 'id_3',
    word: 'dirty ',
    status: true,
    rightWord: '',
  },
  {
    id: 'id_4',
    word: 'forks',
    status: true,
    rightWord: '',
  },
  {
    id: 'id_5',
    word: 'knives',
    status: true,
    rightWord: '',
  },
  {
    id: 'id_6',
    word: 'plates ',
    status: true,
    rightWord: '',
  },
  {
    id: 'id_7',
    word: 'and',
    status: true,
    rightWord: '',
  },
  {
    id: 'id_8',
    word: 'glasses',
    status: true,
    rightWord: '',
  }

];

const SentenceFirst = ({ words, handleKey, handleBlur, link }) => {
  const wordsReady = words.map(word => word.word);
  return (
    <p className={s.checkingWords} ref={link}>
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

const SentenceSecond = ({ words, handleKey, handleBlur, link }) => {
  const wordsReady = words.map(word => word.word);
  return (
    <p className={s.checkingWords} ref={link}>
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

const SentenceThird = ({ words, handleKey, handleBlur, link }) => {
  const wordsReady = words.map(word => word.word);
  return (
    <p className={s.checkingWords} ref={link}>
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
  const firstSent = useRef(null);
  const secondSent = useRef(null);
  const thirdSent = useRef(null);

  const [firstSentenceUser, setFirstSentenseUser] = useState();
  const [firstSentenceFeedBack, setFirstSentenscFeedBack] = useState(false);
  const [firstSentenceAnswer, setFirstSentenceAnswer] = useState();

  const [secondSentenceUser, setSecondSentenseUser] = useState();
  const [secondSentenceFeedBack, setSecondSentenscFeedBack] = useState(false);
  const [secondSentenceAnswer, setSecondSentenceAnswer] = useState();

  const [thirdSentenceUser, setThirdSentenseUser] = useState();
  const [thirdSentenceFeedBack, setThirdSentenscFeedBack] = useState(false);
  const [thirdSentenceAnswer, setThirdSentenceAnswer] = useState();

  useEffect(() => {
    if (checkTask) {
      const firstSentenceRightVar = wordsFirst.map(word => word.status ? word.word : word.rightWord);
      setFirstSentenceAnswer(checkSentence(wordsFirst, firstSentenceUser, firstSentenceRightVar));
      setFirstSentenscFeedBack(true);

      const secondSentenceRightVar = wordsSecond.map(word => word.status ? word.word : word.rightWord);
      setSecondSentenceAnswer(checkSentence(wordsSecond, secondSentenceUser, secondSentenceRightVar));
      setSecondSentenscFeedBack(true);

      const thirdSentenceRightVar = wordsThird.map(word => word.status ? word.word : word.rightWord);
      setThirdSentenceAnswer(checkSentence(wordsThird, thirdSentenceUser, thirdSentenceRightVar));
      setThirdSentenscFeedBack(true);
    }
    lessonSetCheckTask(false);
  }, [checkTask])



  const checkSentence = (words, SentenceUser, SentenceRightVar) => {
    let count = 0;
    const winCount = words.length;
    SentenceRightVar.forEach((word, i) => {
      if (word === SentenceUser[i]) {
        count++;
      }
    });
    if (count === winCount) {
      return true;
    }
    else {
      return false;
    }
  };



  const handleBlur = (e) => {
    // setFirstSentenseUser(e.target.textContent);
    lessonSetStartAction(true);
    setFirstSentenseUser(getUserSentence(firstSent));
    setSecondSentenseUser(getUserSentence(secondSent));
    setThirdSentenseUser(getUserSentence(thirdSent));
  }

  const handleKey = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      // setFirstSentenseUser(e.target.textContent);
      e.target.blur();
      lessonSetStartAction(true);
      setFirstSentenseUser(getUserSentence(firstSent));
      setSecondSentenseUser(getUserSentence(secondSent));
      setThirdSentenseUser(getUserSentence(thirdSent));

    }
  }

  const getUserSentence = (sentence) => {
    return Array.from(sentence.current.childNodes).map(word => word.textContent).filter(word => word != ' ' && word != '.');

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
        <div className={s.sentenseWrapper}>
          <SentenceFirst words={wordsFirst} handleKey={handleKey} handleBlur={handleBlur} link={firstSent} />{firstSentenceFeedBack ? firstSentenceAnswer ? < img className={s.imgFeedBack} src={right} /> : <img className={s.imgFeedBack} src={wrong} /> : ''}
        </div>
        <div className={s.sentenseWrapper}>
          <SentenceSecond words={wordsSecond} handleKey={handleKey} handleBlur={handleBlur} link={secondSent} />{secondSentenceFeedBack ? secondSentenceAnswer ? < img className={s.imgFeedBack} src={right} /> : <img className={s.imgFeedBack} src={wrong} /> : ''}
        </div>
        <div className={s.sentenseWrapper}>
          <SentenceThird words={wordsThird} handleKey={handleKey} handleBlur={handleBlur} link={thirdSent} />{thirdSentenceFeedBack ? thirdSentenceAnswer ? < img className={s.imgFeedBack} src={right} /> : <img className={s.imgFeedBack} src={wrong} /> : ''}
        </div>

      </div>

    </div>
  );
}

export default Task4;
