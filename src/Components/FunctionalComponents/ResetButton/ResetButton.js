import React, { useContext } from 'react';
import './ResetButton.css';
import reset from './reset.svg';
import { Context } from '../../../Context';



function ResetButton() {
    const { lessonSetStartAction, lessonSetResetTask, lessonSetViewFeedback, lessonSetFinishAction, lessonSetAndAnswer } = useContext(Context);



    function onClickReset() {
        lessonSetStartAction(false);
        lessonSetResetTask(true);
        lessonSetViewFeedback(false);
        lessonSetFinishAction(false);

    }


    return (
        <button className="resetButton" onClick={onClickReset}><span className="resetBtn"><span className="resetText">СБРОС</span><img src={reset} alt="" /></span></button>
    );
}

export default ResetButton;