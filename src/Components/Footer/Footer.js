import React, { useContext, useEffect } from 'react';
import './Footer.css';
import BackButton from '../FunctionalComponents/BackButton/BackButton';
import ResetButton from '../FunctionalComponents/ResetButton/ResetButton';
import NextButton from '../FunctionalComponents/NextButton/NextButton';
import CheckButton from '../FunctionalComponents/CheckButton/CheckButton';
import { Context } from '../../Context';


function Footer(props) {
    const { lessonNow, lessonsNumber, startAction, finishAction, lessonSetFinishAction, answer } = useContext(Context);


    useEffect(() => {
        if (startAction) {
            lessonSetFinishAction(true);
        }
    }, [startAction]);


    // {show && <p>Тише, мыши, кот на крыше!</p>}  // для RestButton
    return (
        <div className="footer">
            <div className="backButtonWrapper"><BackButton /></div>
            <div className="resetWrapper">{finishAction && <ResetButton />}</div>
            <div className="nextButtonWrapper">{startAction ? <CheckButton /> : <NextButton />}</div>
        </div>
    );
}

export default Footer;