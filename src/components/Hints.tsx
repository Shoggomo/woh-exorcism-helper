import ActionDisplay from "./ActionDisplay.tsx";
import ActionButton from "./ActionButton.tsx";
import {Actions} from "../Actions.ts";
import {config} from "../config.ts";

interface Props {
    value: Actions[];
    onChange: (value: Actions[]) => void;
}

function Hints({value, onChange}: Props) {
    const paddedValue = [...value, ...Array(config.combinationLength - value.length).fill(Actions.None)];

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
                          disabled={value.length >= config.combinationLength}/>
            <ActionButton action={Actions.Bow} onClick={handleClickAdd(Actions.Bow)}
                          disabled={value.length >= config.combinationLength}/>
        </div>
    </div>
}

export default Hints;
