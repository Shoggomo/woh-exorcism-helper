import {actionImage, Actions} from "../Actions.ts";

interface Props {
    action: Actions;
}

function ActionDisplay({action}: Props) {
    return (
        <span><img src={actionImage[action]}/></span>
    );
}

export default ActionDisplay;
