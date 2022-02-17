import React, { useContext } from 'react';
import './NextButton.css';
import { Context } from '../../../Context'
import { useNavigate } from 'react-router-dom';



function NextButton() {
    const { lessonsTargetState,
        lessonNow,
        lessonsNumber,
        lessonSetViewFeedback,
        lessonSetAndAnswer,
        lessonSetFinishAction,
        lessonsTargetLink,
        lessonsContent,
        targetLink
    } = useContext(Context);

    const navigate = useNavigate();

    function onClickNext() {
        const nextLesson = lessonNow + 1;
        if (nextLesson > lessonsNumber) {
            return;
        }
        lessonsTargetState(nextLesson);
        lessonsTargetLink(lessonsContent[lessonNow].link);
        navigate(lessonsContent[lessonNow].link);
        lessonSetViewFeedback(false);
        lessonSetAndAnswer(false);
        lessonSetFinishAction(false);
    }

    return (
        <button className="nextButton" onClick={onClickNext}>ДАЛЕЕ&#8195;&#8195;&#8594;</button>
    );
}

export default NextButton;