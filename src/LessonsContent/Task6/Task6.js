import React, { useState, useContext, useEffect, useRef, useMemo } from "react";
import "./Task5.css";
import { Context } from "../../Context";
import { HeadingText } from "../HeadingText/HeadingText";

import {
  bug,
  calculator,
  cherry,
  dragonFly,

  bugWord,
  calculatorWord,
  cherryWord,
  dragonFlyWord
} from "./img";


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
    <p>Найди одинаковые объекты</p>
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

const itemsToImage = [
  {
    id: 1,
    name: "bug",
    src: bug,
    tag: "bug",
  },
  {
    id: 2,
    name: "bugWord",
    src: bugWord,
    tag: "bug",
  },
  {
    id: 3,
    name: "calculator",
    src: calculator,
    tag: "calculator",
  },
  {
    id: 4,
    name: "calculatorWord",
    src: calculatorWord,
    tag: "calculator",
  },
  {
    id: 5,
    name: "cherry",
    src: cherry,
    tag: "cherry",
  },
  {
    id: 6,
    name: "cherryWord",
    src: cherryWord,
    tag: "cherry",
  },
  {
    id: 7,
    name: "dragonFly",
    src: dragonFly,
    tag: "dragonFly",
  },
  {
    id: 8,
    name: "dragonFlyWord",
    src: dragonFlyWord,
    tag: "dragonFly",
  },
];

const Card = ({ onClick, item, index, isInactive, isFlipped, isDisabled }) => {
  const handleClick = () => {
    !isFlipped && !isDisabled && onClick(index);
  };

  const styles = [
    'flip-card',
    isFlipped ? "is-flipped" : "",
    isInactive ? "is-inactive" : "",
  ].join(" ");

  return (
    <div className={styles}>
      <div
        className="memoryCard"
        key={index}
        onClick={handleClick}
      >
        <div className="memoryCardCover"></div>
        <div className="memoryCardFace">
          <img src={item.src} alt={item.name} className="memoryCardFaceImg" />
        </div>
      </div>
    </div>
  );
};

function shuffleCards(array) {
  const length = array.length;
  for (let i = length; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * i);
    const currentIndex = i - 1;
    const temp = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temp;
  }
  return array;
}

function Task5() {
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

  const [cards, setCards] = useState(() =>
    shuffleCards(itemsToImage)
  );
  //   console.log(cards);
  const [openCards, setOpenCards] = useState([]);
  const [clearedCards, setClearedCards] = useState({});
  const [shouldDisableAllCards, setShouldDisableAllCards] = useState(false);

  useEffect(() => {
    if (resetTask === true) {
      setClearedCards({});
      setOpenCards([]);
      setShouldDisableAllCards(false);
      // set a shuffled deck of cards
      setCards(shuffleCards(itemsToImage));
    }
    lessonSetResetTask(false);
  }, [resetTask]);

  useEffect(() => {
    lessonSetCheckTask(false);
  }, [checkTask]);

  useEffect(() => {
    if (Object.keys(clearedCards).length === itemsToImage.length / 2) {
      lessonSetViewFeedback(true);
      lessonSetAndAnswer(true);
      // lessonSetFinishAction(true)
    }
  }, [clearedCards]);

  const timeout = useRef(null);

  useEffect(() => {
    let timeout = null;
    if (openCards.length === 2) {
      timeout = setTimeout(evaluate, 300);
    }
    return () => {
      clearTimeout(timeout);
    };
  }, [openCards]);

  const disable = () => {
    setShouldDisableAllCards(true);
  };
  const enable = () => {
    setShouldDisableAllCards(false);
  };

  const evaluate = () => {
    const [first, second] = openCards;
    enable();
    if (cards[first].tag === cards[second].tag) {
      setClearedCards((prev) => ({ ...prev, [cards[first].tag]: true }));
      setOpenCards([]);
      return;
    }
    // This is to flip the cards back after 500ms duration
    timeout.current = setTimeout(() => {
      setOpenCards([]);
    }, 500);
  };

  const handleCardClick = (index) => {
    lessonSetFinishAction(true)
    if (openCards.length === 1) {
      setOpenCards((prev) => [...prev, index]);
      disable();
      // lessonSetResetTask(true)
    } else {
      clearTimeout(timeout.current);
      setOpenCards([index]);
    }
  };

  const checkIsFlipped = (index) => {
    return openCards.includes(index);
  };

  const checkIsInactive = (card) => {
    return Boolean(clearedCards[card.tag]);
  };

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
        {cards.map((item, index) => {
          return (
            <Card
              key={index}
              item={item}
              index={index}
              isDisabled={shouldDisableAllCards}
              isInactive={checkIsInactive(item)}
              isFlipped={checkIsFlipped(index)}
              onClick={handleCardClick}
            />
          );
        })}
      </div>
    </div>
  );
}

export default Task5;