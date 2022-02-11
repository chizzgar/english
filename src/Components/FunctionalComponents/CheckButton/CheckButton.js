import React, { useContext, useEffect } from 'react';
import './CheckButton.css';
import { Context } from '../../../Context'
import check from './check.svg';


function CheckButton() {
    const { lessonSetCheckTask, answer, lessonSetStartAction, lessonSetFinishAction, lessonSetAndAnswer, lessonSetViewFeedback, startAction, checkTask, lessonsTargetState, lessonNow, lessonsNumber } = useContext(Context);


    function onClickCheck() {
        lessonSetCheckTask(true);
        lessonSetViewFeedback(true);
        lessonSetStartAction(false);
        lessonSetFinishAction(true);

    }

    return (
        <button className="checkButton" onClick={onClickCheck}>
            <span className="checkBtn">
                {/* <span className="checkText"> */}
                ПРОВЕРИТЬ
                {/* </span> */}
                {/* <img src={check} alt="" /> */}
            </span>
        </button>
    );
}

export default CheckButton;