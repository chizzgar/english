import React, { useState, useCallback, useContext, useRef } from 'react';
import './SidePanel.css';
import { Context } from '../../Context';

const Menu = ({ items, lessonsTargetState, lessonSetStartAction, lessonSetViewFeedback, lessonSetFinishAction }) => {
    const [menuItemTarget, setMenuItemTarget] = useState(undefined);
    const handlerMenuClick = (event, item) => {
        lessonsTargetState(item.href);
        setMenuItemTarget(event.target);
        lessonSetStartAction(false);
        lessonSetFinishAction(false);
        lessonSetViewFeedback(false);
        event.target.classList.add('menuItemActive');
        if (menuItemTarget != undefined && menuItemTarget != event.target) {
            menuItemTarget.classList.remove('menuItemActive');
        }
    }
    return (
        <ul className="lessonsMenu">
            {items.map(item => (
                <li key={item.id} onClick={(event) => handlerMenuClick(event, item)}>
                    <span>{item.value}</span>
                </li>
            ))}
        </ul>
    )
};

function SidePanel(props) {
    const { lessonSetStartAction, lessonSetViewFeedback, lessonSetFinishAction } = useContext(Context);
    const { itemsMenu, active, setActiveMenu } = props;
    const { lessonsTargetState } = useContext(Context);
    function onClickMenu() {
        setActiveMenu(false);

    };


    return (

        <nav className={active ? "menu active" : "menu"} onClick={onClickMenu} >
            {/* <div className="blur" /> */}
            <div className="menuContent" onClick={e => e.stopPropagation()}>
                <div className="menuHeader" >
                    <div className="closeMenu" onClick={onClickMenu}>
                        <div className="lineMenu one"></div>
                        <div className="lineMenu two"></div>
                    </div>
                    <Menu
                        items={itemsMenu}
                        lessonsTargetState={lessonsTargetState}
                        lessonSetStartAction={lessonSetStartAction}
                        lessonSetViewFeedback={lessonSetViewFeedback}
                        lessonSetFinishAction={lessonSetFinishAction}
                    />
                </div>
            </div>
        </nav>
    );
}


export default SidePanel;