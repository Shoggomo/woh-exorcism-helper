import {actionImage, Actions} from "../Actions.ts";

interface Props {
    action: Actions;
    onClick: (action: Actions) => void;
    disabled?: boolean;
}

function ActionButton({action, onClick, disabled}: Props) {

    const handleClick = () => {
        onClick(action);
    }

    return (
        <button onClick={handleClick} disabled={disabled}><img src={actionImage[action]}/></button>
    );
}

export default ActionButton;
