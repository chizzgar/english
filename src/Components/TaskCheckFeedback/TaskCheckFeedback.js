import React, { useContext, useState } from 'react';
import './TaskCheckFeedback.css';

import wellDone from './img/wellDone_textInCloud.svg';
import motivationCarrot_wellDone from './img/motivationCarrot_wellDone.svg';

import tryAgain from './img/tryAgain_textInCloud.svg';
import motivationCarrot_tryAgain from './img/motivationCarrot_tryAgain.svg';

const WellDone = ({ cloudStyle }) => (
    <div className="wellDoneParrot">
        <img className="motivationParrot" src={motivationCarrot_wellDone} alt="" />
        <img className="motivationTextCloud" src={wellDone} alt="" />
    </div>
);

const TryAgain = ({ parrotStyle, cloudStyle }) => (
    <div className="tryAgainParrot">
        <img className="motivationParrot" src={motivationCarrot_tryAgain} with="300" height="300" alt="" />
        <img className="motivationTextCloud" src={tryAgain} width="270" height="270" alt="" />
    </div>
);

export const TaskCheckFeedback = ({ answer }) => {

    const motivationTextCloud = ({
        zIndex: '10000',
        position: 'absolute',
        top: '30vh',
        left: '74vw',
    });

    const motivationParrot = ({
        zIndex: '10000',
        position: 'absolute',
        top: '55vh',
        left: '84vw',
    });


    return (
        <>
            {answer ? <WellDone parrotStyle={motivationParrot} /> : <TryAgain parrotStyle={motivationParrot} />}
        </>
    );
};