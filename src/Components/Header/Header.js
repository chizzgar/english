import React, { useState } from 'react';
import './Header.css';
import MenuButton from '../FunctionalComponents/MenuButton/MenuButton';
import LessonBar from '../FunctionalComponents/LessonBar/LessonBar';
import CloseButton from '../FunctionalComponents/CloseButton/CloseButton';
import SidePanel from '../Menu/SidePanel';

function Header(props) {
    const { lessonsContent } = props;
    const [dropMenuActive, setDropMenuActive] = useState(false);
    const [munuActive, setMenuActive] = useState(false);
    function setActiveDropMenu(active) {
        setDropMenuActive(active);
    };
    function setActiveMenu(active) {
        setMenuActive(active);
    };

    return (
        <div className="header">
            <SidePanel active={munuActive} setActiveMenu={setActiveMenu} itemsMenu={lessonsContent} dropMenu={dropMenuActive} setActiveDropMenu={setActiveDropMenu} />
            <MenuButton active={munuActive} setActiveMenu={setActiveMenu} />
            <LessonBar />
            <CloseButton />
        </div>
    );
}

export default Header;



