import React, { useContext, useEffect, useSate, useMemo } from 'react';
import './Main.css';
import { useState } from 'react';
import { Context } from '../../Context';
import { Routes, Route, useNavigate, useSearchParams, useParams } from 'react-router-dom';

function Main(props) {
    const { lessonsContent, targetLink, lessonsTargetState, lessonsTargetLink } = props;
    const lesson = lessonsContent.find(lesson => lesson.link === targetLink);

    const navigate = useNavigate();

    useEffect(() => {
        if (window.location.pathname === lessonsContent[0].link || window.location.pathname === '/') {
            navigate(lessonsContent[0].link);
        }
        else {
            const urlLesson = lessonsContent.find(lesson => lesson.link === window.location.pathname);
            lessonsTargetState(urlLesson?.href);
            navigate(window.location.pathname);
            lessonsTargetLink(window.location.pathname);
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
