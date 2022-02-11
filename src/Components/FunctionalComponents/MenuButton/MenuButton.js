import React from 'react';
import './MenuButton.css';


function MenuButton(props) {
    const { active, setActiveMenu } = props;

    function onClickMenu() {
        setActiveMenu(true);
    }

    return (

        <label className="menu-open-button" onClick={onClickMenu}>
            <span className="lines line-1"></span>
            <span className="lines line-2"></span>
            <span className="lines line-3"></span>
        </label>
    );
}

export default MenuButton;