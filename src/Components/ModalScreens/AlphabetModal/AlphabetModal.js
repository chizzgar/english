import React, { useContext, useState } from 'react';
import './AlphabetModal.css';
import { Context } from '../../../Context.js';
import alphabet from './alphabet.svg';



export const AlphabetModal = ({ alphabetIcon, alphabetModalContent }) => {
    // const { activeAlphabet, modalSetAlphabet, alphabetModalContent } = useContext(Context);
    const [activeAlphabet, modalSetAlphabet] = useState(false);


    const playSound = (media) => {
        let audio = new Audio(media);
        audio.play()
    }

    return (
        <>{alphabetIcon && <div className="alphabetStyleParrotWrapper" title="Словарь"><img className="alphabetStyleParrot" src={alphabet} with="70" height="70" onClick={() => modalSetAlphabet(true)} alt="" /></div>}
            <div className={activeAlphabet ? "alphabetModal active" : "alphabetModal"} onClick={() => modalSetAlphabet(!activeAlphabet)}>
                <div className="alphabetModal__content" onClick={(e) => e.stopPropagation()} >

                    <div className="lessonContent_alphabetIcons">
                        <div className="alphabetIcons">
                            {alphabetModalContent}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};