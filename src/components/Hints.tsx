import ActionDisplay from "./ActionDisplay.tsx";
import ActionButton from "./ActionButton.tsx";
import {Actions} from "../Actions.ts";

interface Props {
    value: Actions[];
    onChange: (value: Actions[]) => void;
}

const MAX_HINTS = 5;

function Hints({value, onChange}: Props) {
    const paddedValue = [...value, ...Array(MAX_HINTS - value.length).fill(Actions.None)];

    const handleClickAdd = (action: Actions) => () => {
        const newValue = [...value, action];
        onChange(newValue);
    }

    return <div>
        <div>
            {paddedValue.map((action, index) =>
                <ActionDisplay action={action} key={index}/>
            )}
        </div>

        <div>
            <ActionButton action={Actions.Clap} onClick={handleClickAdd(Actions.Clap)}
                          disabled={value.length >= MAX_HINTS}/>
            <ActionButton action={Actions.Bow} onClick={handleClickAdd(Actions.Bow)}
                          disabled={value.length >= MAX_HINTS}/>
        </div>
    </div>
}

export default Hints;
