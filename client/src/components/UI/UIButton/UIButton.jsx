import style from './UIButton.module.css'
import cn from 'classnames';

function UiButton({onClick, children, buttonClass, textClass, text}) {
    return (
    <div onClick={onClick} className={cn(style.button, buttonClass)}>
        {children}
        <span className={cn(style.text, textClass)}>{text}</span>
    </div>
    );
}

export default UiButton;