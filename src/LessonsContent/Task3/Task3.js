import React, { useState, useContext, useEffect, useRef, useMemo } from "react";
import "./Task3.css";
import { Context } from "../../Context";
import { HeadingText } from "../HeadingText/HeadingText";

import coco from "./img/Eng-2021_2_1_1_3.png";
import kiwi from "./img/Eng-2021_2_1_1_2.png";
import notKiwi from "./img/Eng-2021_2_1_1_14.png";
import notCoco from "./img/Eng-2021_2_1_1_15.png";

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
    <p style={{ textAlign: "center" }}>Найди Киви и Коко</p>
  </>
);
// Текс title с переводом (НЕ поддерживает html тэги)
const titleHeading = "Перевод";

const parrots = [
  {
    id: "parrot_1",
    data: "coco",
    srcImage: coco,
  },
  {
    id: "parrot_3",
    data: "kiwi",
    srcImage: kiwi,
  },
  {
    id: "parrot_2",
    data: "notCoco",
    srcImage: notCoco,
  },
  {
    id: "parrot_2",
    data: "notKiwi",
    srcImage: notKiwi,
  },
];

const Parrots = ({ parrotsRandom }) => (
  <>
    {parrotsRandom.map((image, index) => (
      <div
        key={image.id + index}
        className="matchParrot_parrots"
        drop-data={image.data}
      >
        <img className="matchParrot_parrots_img" src={image.srcImage} alt="" />
      </div>
    ))}
  </>
);
const parrotNames = parrots.filter(
  (parrot) => parrot.data === "coco" || parrot.data === "kiwi"
);
const Names = ({ onMouseDown }) => (
  <>
    {parrotNames.map((item, index) => (
      <div
        key={item.id + index}
        className="matchParrot_name"
        onMouseDown={onMouseDown}
        drag-data={item.data}
      >
        <p className="matchParrot_name_p">
          {item.data.charAt(0).toUpperCase() + item.data.slice(1)}
        </p>
      </div>
    ))}
  </>
);

function Task3() {
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

  const dragPlace = useRef(null);
  const dropPlace = useRef(null);
  const [draggingElem, setDraggingElem] = useState();

  useEffect(() => {
    if (resetTask === true) {
      dropPlace.current.childNodes.forEach((item) => {
        if (item.childNodes.length > 1) {
          item.childNodes[1].classList.remove("matchParrot_name_active");
          item.childNodes[1].childNodes[0].classList.remove(
            "matchParrot_name_p_active"
          );
          dragPlace.current.appendChild(item.childNodes[1]);
        }
      });
      lessonSetResetTask(false);
    }
  }, [resetTask]);

  useEffect(() => {
    if (checkTask === true) {
      let winCount = 0;
      dropPlace.current.childNodes.forEach((item) => {
        if (Boolean(item.childNodes[1])) {
          if (
            item.attributes.getNamedItem("drop-data").value ===
            item.childNodes[1].attributes.getNamedItem("drag-data").value
          ) {
            winCount++;
          }
        }
      });
      if (winCount === 2) {
        lessonSetAndAnswer(true);
      } else {
        lessonSetAndAnswer(false);
      }
    }
    lessonSetCheckTask(false);
  }, [checkTask]);

  let draggingItem;
  let elemBelow;
  function mouseDown(event) {
    if (event.button === 2) return;
    draggingItem = event.target;
    draggingItem.style.cursor = "grabbing";
    let shiftX = event.clientX - draggingItem.getBoundingClientRect().left;
    let shiftY = event.clientY - draggingItem.getBoundingClientRect().top;

    draggingItem.style.position = "absolute";
    draggingItem.style.zIndex = 1000;
    document.body.appendChild(draggingItem);

    moveAt(event.pageX, event.pageY);

    function moveAt(pageX, pageY) {
      draggingItem.style.left = pageX - shiftX + "px";
      draggingItem.style.top = pageY - shiftY + "px";
    }

    elemBelow = document.elementFromPoint(event.clientX, event.clientY);

    function onMouseMove(event) {
      moveAt(event.pageX, event.pageY);

      draggingItem.hidden = true;
      elemBelow = document.elementFromPoint(event.clientX, event.clientY);
      draggingItem.hidden = false;

      if (!elemBelow) return;
    }
    document.addEventListener("mousemove", onMouseMove);

    draggingItem.onmouseup = function () {
      document.removeEventListener("mousemove", onMouseMove);
      draggingItem.style.cursor = "grab";
      if (elemBelow.classList.contains("matchParrot_parrots")) {
        draggingItem.style.position = "relative ";
        draggingItem.style.zIndex = null;
        draggingItem.style.top = null;
        draggingItem.style.left = null;
        draggingItem.classList.add("matchParrot_name_active");
        draggingItem.childNodes[0].classList.add("matchParrot_name_p_active");
        elemBelow.appendChild(draggingItem);

        lessonSetStartAction(true);
      } else {
        draggingItem.style.position = "relative ";
        draggingItem.style.zIndex = null;
        draggingItem.style.top = null;
        draggingItem.style.left = null;
        dragPlace.current.appendChild(draggingItem);
        draggingItem.classList.remove("matchParrot_name_active");
        draggingItem.childNodes[0].classList.remove(
          "matchParrot_name_p_active"
        );
      }
      setDraggingElem(draggingItem);
    };
  }

  const parrotsRandom = useMemo(() => {
    return parrots.sort(() => (Math.random() > 0.5 ? 1 : -1));
  }, []);

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
      <div className="matchParrotWrapper">
        <div className="matchParrot_dropPlace" ref={dropPlace}>
          <Parrots parrotsRandom={parrotsRandom} />
        </div>
        <div className="matchParrot_dragPlace" ref={dragPlace}>
          <Names onMouseDown={mouseDown} />
        </div>
      </div>
    </div>
  );
}

export default Task3;
