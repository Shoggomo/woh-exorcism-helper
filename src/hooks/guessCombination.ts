import {Actions, Combination} from "../Actions.ts";
import {useState} from "react";

export interface GuessCombinationHook {
    nextGuess: Actions[] | null
    hint: Actions[]
    error: string | null
    evaluateGuess: (correctCount: number) => void
    setHint: (hint: Actions[]) => void
    reset: () => void
}

export const COMBINATION_LENGTH = 5;

function countEqual(combination1: Actions[], combination2: Actions[]) {
    return combination1.reduce(
        (acc, action, index) => acc + (action === combination2[index] ? 1 : 0),
        0
    )
}


function generateAllPossibilities(length: number): Combination[] {
    if (length === 0) return [];

    const actions = [Actions.Clap, Actions.Bow];

    const generateCombinations = (n: number): Combination[] => {
        if (n === 1) return actions.map(action => [action]);

        return generateCombinations(n - 1)
            .flatMap(comb => actions.map(action => [...comb, action]));
    }

    return generateCombinations(length);
}

export const useGuessCombination = (): GuessCombinationHook => {
    const [possibilities, setPossibilities] = useState<Combination[]>(generateAllPossibilities(COMBINATION_LENGTH));
    const [hint, setHint] = useState<Actions[]>([]);
    const [error, setError] = useState<string | null>(null);
    const nextGuess = possibilities.length > 0 ? possibilities[0] : null;

    const evaluateGuess = (correctCount: number) => {
        const newPossibilities = possibilities.filter(p => countEqual(p, nextGuess || []) === correctCount);

        if (newPossibilities.length === 0) {
            setError('Hmm, that does not seem right. Did you make a mistake?');
        } else {
            setError(null);
            setPossibilities(newPossibilities);
        }
    }

    const updateHint = (hint: Actions[]) => {
        const newPossibilities = possibilities.filter(p => countEqual(p, hint) === hint.length)

        if (newPossibilities.length === 0) {
            setError('Hmm, that does not seem right. Did you make a mistake?');
        } else {
            setError(null);
            setPossibilities(newPossibilities);
            setHint(hint)
        }
    }

    const reset = () => {
        setPossibilities(generateAllPossibilities(COMBINATION_LENGTH));
        setHint([]);
        setError(null);
    }

    return {
        nextGuess: nextGuess,
        hint,
        error,
        reset,
        evaluateGuess: evaluateGuess,
        setHint: updateHint
    }
}
