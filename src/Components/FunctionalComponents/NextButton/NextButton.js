import React, { useContext } from 'react';
import './NextButton.css';
import { Context } from '../../../Context'


function NextButton() {
    const { lessonsTargetState, lessonNow, lessonsNumber, lessonSetViewFeedback, lessonSetAndAnswer, lessonSetFinishAction } = useContext(Context);

    function onClickNext() {
        const nextLesson = lessonNow + 1;

        if (nextLesson > lessonsNumber) {
            return;
        }
        lessonsTargetState(nextLesson);
        lessonSetViewFeedback(false);
        lessonSetAndAnswer(false);
        lessonSetFinishAction(false);
    }

    return (
        <button className="nextButton" onClick={onClickNext}>ДАЛЕЕ&#8195;&#8195;&#8594;</button>
    );
}

export default NextButton;