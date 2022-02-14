import React from 'react';
import './CloseButton.css';
// import closeButton from './closeButton.svg';


function CloseButton() {

    function onClickClose() {
        window.location.assign('https://chizzgar.github.io/tasks-stand/');
    }

    return (

        <div className="closeButton" onClick={onClickClose} title="Вернуться к списку курсов">
            <div className="line one"></div>
            <div className="line two"></div>
        </div>

    );
}

export default CloseButton;