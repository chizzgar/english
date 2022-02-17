import React, { useContext, useEffect, useSate, useMemo } from 'react';
import './Main.css';
import { useState } from 'react';
import { Context } from '../../Context';
import { Routes, Route, useNavigate } from 'react-router-dom';

function Main(props) {
    const { lessonsContent, targetLink, lessonsTargetState, lessonsTargetLink } = props;
    const lesson = lessonsContent.find(lesson => lesson.link === targetLink);

    const navigate = useNavigate();

    useEffect(() => {
        if (window.location.hash === `#${lessonsContent[0].link}` || window.location.hash === '') {
            navigate(lessonsContent[0].link);
        }
        else {
            const urlLesson = lessonsContent.find(lesson => `#${lesson.link}` === window.location.hash);
            lessonsTargetState(urlLesson?.href);
            navigate(urlLesson.link);
            lessonsTargetLink(urlLesson.link);
        }

    }, []);



    return (
        <>
            <div className="main">
                <Routes>
                    <Route path={targetLink} element={lesson.content} />
                </Routes>
            </div>
        </>
    );
}

export default Main;
