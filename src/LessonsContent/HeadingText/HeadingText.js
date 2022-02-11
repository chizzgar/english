import React from 'react';
import question_textHeader from './img/question_textHeader.svg';
import sound_textHeader from './img/sound_textHeader.svg';
// import soundNotActive_textHeaing from './soundNotActive_textHeaing.svg';
import './HeadingText.css';



export const HeadingText = ({ lessonHeading, themeHeading, titleHeading, soundSource, soundVisible, titleVisible }) => {
    const playSound = (media) => {
        let audio = new Audio(media);
        audio.play()
    }
    return (
        <div className="textStartContent_heading">
            <div>
                <div className="lessonsHeading" >{lessonHeading}</div>
            </div>
            <div className="taskHeading" >
                {soundVisible && <span className="questionHelpTranslation" onClick={() => playSound(soundSource)}>
                    <img src={sound_textHeader} className="soundIcon" alt="" />
                </span>}
                {titleVisible && <span className="questionHelpTranslation" data-title={titleHeading}>
                    <img src={question_textHeader} className="questionIcon" alt="" />
                </span>}
                <div className="themeHeading" >{themeHeading}
                </div>
            </div>
        </div>
    )
};
