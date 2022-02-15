import React, { useState, useContext, useEffect, useRef, useMemo } from "react";
import s from "./Task2.module.css";
import { Context } from "../../Context";
import { HeadingText } from "../HeadingText/HeadingText";

import singlePazzle from "./img/singlePazzle.png"

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
    <p style={{ textAlign: "center" }}>Собери пазл
    </p>
  </>
);
// Текс title с переводом (НЕ поддерживает html тэги)
const titleHeading = "Перевод";

const WordDrop = ({ itemsToImage }) => (
  <>
    {itemsToImage.map((image, index) => (
      <div key={image.id + index} className={s.wordPazzle_dropWord} drop-data={image.data}></div>
    ))}
  </>
);

const LettersDrag = ({ itemsToImageReady, onMouseDown }) => (
  <>
    {itemsToImageReady.map((item, index) => (
      <div key={item.id + index} className={s.wordPazzle_letter} onMouseDown={onMouseDown} drag-data={item.data}>
        <img className={s.wordPazzle_letter_img} src={item.srcImage} alt="" draggable="false" />
        <p className={s.wordPazzle_letter_p}>{item.data}</p>
      </div>
    ))}
  </>
);

function Task2() {
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
    lessonSetViewFeedback
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

  const dragPlace = useRef(null);
  const dropPlace = useRef(null);
  const [draggingElem, setDraggingElem] = useState();

  useEffect(() => {
    if (resetTask === true) {
      dropPlace.current.childNodes.forEach(item => {
        if (item.childNodes.length > 0) {
          dragPlace.current.appendChild(item.childNodes[0]);
        }
      })
      lessonSetResetTask(false);
    }
  }, [resetTask]);

  useEffect(() => {
    if (checkTask === true) {
      let winCount = 0;

      dropPlace.current.childNodes.forEach(item => {
        if (item.childNodes.length > 0) {
          if (item.attributes.getNamedItem('drop-data').value === item.childNodes[0].attributes.getNamedItem('drag-data').value) {
            winCount++;
          }
        }
      })


      if (winCount === 4) {
        lessonSetAndAnswer(true);
      }
      else {
        lessonSetAndAnswer(false);
      }
    }
    lessonSetCheckTask(false);
  }, [checkTask]);

  const itemsToImage = [
    {
      id: 'itemToImage_1',
      data: 'd',
      letter: "d",
      srcImage: singlePazzle
    },
    {
      id: 'itemToImage_3',
      data: 'o',
      letter: "o",
      srcImage: singlePazzle
    },
    {
      id: 'itemToImage_2',
      data: 'l',
      letter: "l",
      srcImage: singlePazzle
    },
    {
      id: 'itemToImage_2',
      data: 'l',
      letter: "l",
      srcImage: singlePazzle
    }
  ];

  let draggingItem;
  let elemBelow;
  function mouseDown(event) {
    if (event.button === 2) return;
    draggingItem = event.target;
    draggingItem.style.cursor = 'grabbing';
    let shiftX = event.clientX - draggingItem.getBoundingClientRect().left;
    let shiftY = event.clientY - draggingItem.getBoundingClientRect().top;

    draggingItem.style.position = 'absolute';
    draggingItem.style.zIndex = 1000;
    document.body.appendChild(draggingItem);

    moveAt(event.pageX, event.pageY);

    function moveAt(pageX, pageY) {
      draggingItem.style.left = pageX - shiftX + 'px';
      draggingItem.style.top = pageY - shiftY + 'px';
    }

    elemBelow = document.elementFromPoint(event.clientX, event.clientY);

    function onMouseMove(event) {

      moveAt(event.pageX, event.pageY);

      draggingItem.hidden = true;
      elemBelow = document.elementFromPoint(event.clientX, event.clientY);
      draggingItem.hidden = false;

      if (!elemBelow) return;
    }
    document.addEventListener('mousemove', onMouseMove);

    draggingItem.onmouseup = function () {
      document.removeEventListener('mousemove', onMouseMove);
      draggingItem.style.cursor = 'grab';
      if (elemBelow.classList.contains(s.wordPazzle_dropWord)) {

        draggingItem.style.position = 'relative ';
        draggingItem.style.zIndex = null;
        draggingItem.style.top = null;
        draggingItem.style.left = null;
        elemBelow.appendChild(draggingItem);

        lessonSetStartAction(true);

      }
      else {
        draggingItem.style.position = 'relative ';
        draggingItem.style.zIndex = null;
        draggingItem.style.top = null;
        draggingItem.style.left = null;
        dragPlace.current.appendChild(draggingItem);
      }
      setDraggingElem(draggingItem);
    };
  };

  const itemsToImageReady = useMemo(() => {
    return itemsToImage.sort(() => Math.random() > 0.5 ? 1 : -1);
  }, []);

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

      <div className={s.wordPazzleWrappere} >

        <div className={s.wordPazzle_dropWrapper} ref={dropPlace}>
          <WordDrop itemsToImage={itemsToImage} />
        </div>

        <div className={s.wordPazzle_letters} ref={dragPlace}>
          <LettersDrag itemsToImageReady={itemsToImageReady} onMouseDown={mouseDown} />

        </div>
      </div>

    </div>
  );
}

export default Task2;
