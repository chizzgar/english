import React from 'react';
import './CloseButton.css';
// import closeButton from './closeButton.svg';


function CloseButton() {

    function onClickClose() {
        alert('Вы закрыли приложение')
    }

    return (

        <div className="closeButton" onClick={onClickClose}>
            <div className="line one"></div>
            <div className="line two"></div>
        </div>

    );
}

export default CloseButton;