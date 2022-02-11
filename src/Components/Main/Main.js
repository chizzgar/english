import React, { useContext } from 'react';
import './Main.css';
import { useState } from 'react';
import { Context } from '../../Context';

function Main(props) {
    const { lessonsContent } = props;
    const { lessons, lessonNow, changeLessonState } = useContext(Context);
    const actualLesson = lessonNow - 1;


    return (
        <>
            <div className="main">
                {lessonsContent[actualLesson].content}
            </div>
        </>
    );
}

export default Main;