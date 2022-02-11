import React, { useContext, useState } from 'react';
import './HelpModal.css';
import { Context } from '../../../Context.js';
import parrotHelp from './parrotHelp.svg';

export const HelpModal = ({ helpIcon, helpModalContent }) => {
    // const { activeHelp, modalSetHelp, helpModalContent } = useContext(Context);
    const [activeHelp, modalSetHelp] = useState(false);

    const helpStyleParrot = ({

    });

    return (
        <>
            {helpIcon && <div className="helpStyleParrotWrapper" title="Помощь"><img className="helpStyleParrot" src={parrotHelp} onClick={() => modalSetHelp(true)} alt="" /></div>}
            <div className={activeHelp ? "helpModal active" : "helpModal"} onClick={() => modalSetHelp(!activeHelp)}>
                <div className="helpModal__content" onClick={(e) => e.stopPropagation()} >
                    {helpModalContent}
                </div>
            </div>
        </>

    );
};