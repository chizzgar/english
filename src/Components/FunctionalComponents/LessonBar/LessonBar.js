import React, { useContext } from 'react';
import './LessonBar.css';
import { Context } from '../../../Context';


function LessonBar() {
    const { lessonsNumber, lessonNow, lessonsContent, targetLink } = useContext(Context);

    const targetLesson = () => {
        return lessonNow;
    }

    return (
        <div className="lessonBar">
            <span className="progressText">Задание <span className="progressTextNowLesson">{targetLesson()}</span>/{lessonsNumber}</span>
            <progress className="lessonProgressBar" max={lessonsNumber} value={targetLesson()}></progress>
        </div>
    );
}

export default LessonBar;