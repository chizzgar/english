import React, { useState } from 'react';
import './App.css';
import { Context } from './Context';
import Header from './Components/Header/Header.js';
import Main from './Components/Main/Main.js';
import Footer from './Components/Footer/Footer.js';

import { AlphabetModal } from './Components/ModalScreens/AlphabetModal/AlphabetModal.js';
import { HelpModal } from './Components/ModalScreens/HelpModal/HelpModal.js';
import { TaskCheckFeedback } from './Components/TaskCheckFeedback/TaskCheckFeedback.js'


import {
  Task1,
  Task2,
  Task3
} from './LessonsContent/index_lessons';


const lessonsContent = [
  {
    id: "menu_1",
    value: "Диалоговый симулятор",
    href: 1,
    content: <Task1 />
  },
  {
    id: "menu_1",
    value: "Собери пазл",
    href: 2,
    content: <Task2 />
  },
  {
    id: "menu_1",
    value: "Найди Киви и Коко",
    href: 3,
    content: <Task3 />
  }
];

function App() {
  const lessonsNumber = lessonsContent.length;
  const [lessonNow, setLessonNow] = useState(1);

  const [startAction, setStartAction] = useState(false);
  const [finishAction, setFinishAction] = useState(false);
  const [answer, setAnswer] = useState(false);
  const [viewFeedback, setViewFeedback] = useState(false);

  const [resetTask, setResetTask] = useState(false);
  const [checkTask, setCheckTask] = useState(false);

  const [alphabetIcon, setAlphabetIcon] = useState();
  const [alphabetModalContent, setAlphabetModalContent] = useState();

  const [helpIcon, setHelpIcon] = useState();
  const [helpModalContent, setHelpModalContent] = useState();


  function lessonsTargetState(targetLeson) {
    setLessonNow(targetLeson);
  };

  function lessonSetStartAction(startActionState) {
    setStartAction(startActionState);
  };
  function lessonSetFinishAction(finishActionState) {
    setFinishAction(finishActionState);
  };
  function lessonSetAndAnswer(answerState) {
    setAnswer(answerState);
  };
  function lessonSetResetTask(resetButtonState) {
    setResetTask(resetButtonState);
  };
  function lessonSetCheckTask(checkTask) {
    setCheckTask(checkTask);
  };
  function lessonSetViewFeedback(feedBackState) {
    setViewFeedback(feedBackState);
  };


  function alphabetSetIcon(alphabetIconView) {
    setAlphabetIcon(alphabetIconView)
  };
  function alphabetSetModalContent(modalAlphabetContent) {
    setAlphabetModalContent(modalAlphabetContent);
  }


  function helpSetModalContent(modalHelpContent) {
    setHelpModalContent(modalHelpContent);
  }
  function helpSetIcon(helpIconView) {
    setHelpIcon(helpIconView)
  };




  const appValueContext = {
    lessonsNumber,

    lessonsTargetState,
    lessonNow,

    lessonSetStartAction,
    startAction,

    lessonSetFinishAction,
    finishAction,

    lessonSetResetTask,
    resetTask,

    lessonSetCheckTask,
    checkTask,

    lessonSetAndAnswer,
    answer,

    lessonSetViewFeedback,

    alphabetSetModalContent,
    alphabetSetIcon,
    alphabetModalContent,

    helpSetModalContent,
    helpSetIcon,
    helpModalContent
  };





  return (
    <Context.Provider value={appValueContext}>
      <div className="appWrapper">
        <Header lessonsContent={lessonsContent} />
        <Main lessonsContent={lessonsContent} />
        {viewFeedback && <TaskCheckFeedback answer={answer} />}
        <AlphabetModal
          alphabetIcon={alphabetIcon}
          alphabetModalContent={alphabetModalContent}
        />
        <HelpModal
          helpIcon={helpIcon}
          helpModalContent={helpModalContent}
        />
        <Footer />
      </div>
    </Context.Provider>
  );
}

export default App;