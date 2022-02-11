import React, { useState, useContext, useEffect, useRef, useMemo } from "react";
import "./Task1.css";
import { Context } from "../../Context";
import { HeadingText } from "../HeadingText/HeadingText";
import parrotOpponent from "./img/kiwi.svg";


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
const ParrotOpponent = ({ parrotStyle }) => (
  <div className="parrotOpponent">
    <img className="parrotOpponent" style={parrotStyle} src={parrotOpponent} alt="" />
  </div>
);

function Task1() {
  const {
    helpSetIcon,
    alphabetSetIcon,
    helpSetModalContent,
    alphabetSetModalContent,
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

  const [startDialog, setStartDialogue] = useState(false);


  const dilogueParrotPhrase = useRef(null);


  // useEffect(() => {
  //     dilogueParrotPhrase.current.classList.remove("dialogueParrotPhraseActive");

  // }, []);





  const parrotOpponent = ({
    zIndex: 100,
    width: '300px',
    position: 'absolute',
    top: '45vh',
    left: '4vw',

  });
  //  Внесение изменений в контент задания
  return (
    <div className="lessonContent">
      <HeadingText
        lessonHeading={<LessonHeading />}
        themeHeading={<ThemeHeading />}
        titleHeading={titleHeading}
        // soundSource={soundSource}
        soundVisible={false} titleVisible={true}
      />
      <ParrotOpponent parrotStyle={parrotOpponent} />
      <div className="dialogueWrapper">
        { }
        <div className="dialogueParrotField" >
          <div className="dialogueParrotPhrase dialogueParrotPhraseActive" ref={dilogueParrotPhrase}>
            <p>Hello!</p>
          </div>
        </div>



        <div className="dialogueUserField">
          <div className="dialogueUserPhrase dialogueUserPhraseActive" ref={dilogueParrotPhrase}>
            <p>Hello!</p>
          </div>
        </div>



      </div>
    </div>
  );
}

export default Task1;
