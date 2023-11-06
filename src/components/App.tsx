import Hints from "./Hints.tsx";
import {useGuessCombination} from "../hooks/guessCombination.ts";
import ActionDisplay from "./ActionDisplay.tsx";

function App() {
    const {nextGuess, hint, error, possibleCombinations, reset, evaluateGuess, setHint} = useGuessCombination();

    const handleClickEvaluate = (correctCount: number) => () => {
        evaluateGuess(correctCount);
    }

    return (
        <div className="app">
            <h1 className="title">WOH Exorcism Helper</h1>
            <p>Try this combination<br/>(possible combinations: {possibleCombinations.length})</p>
            <div>{nextGuess?.map((action, i) => <ActionDisplay key={i} action={action}/>)}</div>

            {
                possibleCombinations.length === 1 ?
                    <p>This must be it.<br />If not, did you make a mistake?</p> :
                    <>
                        <div>How many were correct?</div>

                        <div>
                            <button onClick={handleClickEvaluate(0)}>0</button>
                            <button onClick={handleClickEvaluate(1)}>1</button>
                            <button onClick={handleClickEvaluate(2)}>2</button>
                            <button onClick={handleClickEvaluate(3)}>3</button>
                            <button onClick={handleClickEvaluate(4)}>4</button>
                        </div>
                    </>
            }

            <hr className="divider"/>

            <p>Got any Hints?</p>
            <Hints value={hint} onChange={setHint}/>
            <p className="error">{error}</p>
            <button onClick={reset}>Reset</button>
        </div>
    )
}

export default App
