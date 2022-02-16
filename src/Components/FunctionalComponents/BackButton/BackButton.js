import React, { useContext, useEffect, useState } from 'react';
import './BackButton.css';
import { Context } from '../../../Context'
import { useNavigate } from 'react-router-dom';

function BackButton() {
    const { lessonsTargetState,
        lessonNow,
        lessonSetViewFeedback,
        startAction,
        lessonSetAndAnswer,
        answer,
        lessonsNumber,
        lessonSetStartAction,
        lessonSetFinishAction,
        lessonsContent,
        lessonsTargetLink,
        targetLink, } = useContext(Context);


    const navigate = useNavigate();


    function onClickBack() {
        const previousLesson = lessonNow - 1;
        if (previousLesson < 1 || startAction === true) {
            return;
        }
        lessonsTargetState(previousLesson);
        lessonsTargetLink(lessonsContent[previousLesson - 1].link);
        navigate(lessonsContent[previousLesson - 1].link);
        lessonSetViewFeedback(false);
        lessonSetAndAnswer(false);
        lessonSetFinishAction(false);
    }


    return (
        <button className={startAction ? "backButton notActive" : "backButton"} onClick={onClickBack}>&#8592;&#8195;&#8195;НАЗАД</button>
    );
}

export default BackButton;