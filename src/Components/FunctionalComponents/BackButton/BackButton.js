import React, { useContext, useEffect } from 'react';
import './BackButton.css';
import { Context } from '../../../Context'

function BackButton() {
    const { lessonsTargetState, lessonNow, lessonSetViewFeedback, startAction, lessonSetAndAnswer, answer, lessonsNumber, lessonSetStartAction, lessonSetFinishAction } = useContext(Context);

    useEffect(() => {
        if (!answer) {

        }


    }, [answer,]);



    function onClickBack() {
        const previousLesson = lessonNow - 1;
        if (previousLesson < 1 || startAction === true) {
            return;
        }
        lessonsTargetState(previousLesson);
        lessonSetViewFeedback(false);
        lessonSetAndAnswer(false);
        lessonSetFinishAction(false);
    }


    return (
        <button className={startAction ? "backButton notActive" : "backButton"} onClick={onClickBack}>&#8592;&#8195;&#8195;НАЗАД</button>
    );
}

export default BackButton;