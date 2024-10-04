import React from "react";
import './Playing.sass';

interface Props {
    matchesLeft: number;
    playerMatches: number;
    computerMatches: number;
    message: string;
    whichIsTurn: string;
    maxPick: number;
    handlePlayerPick: (param: number) => void;
    startNewGame: () => void
}

const Playing: React.FC<Props> = ({
    matchesLeft,
    playerMatches,
    computerMatches,
    message,
    whichIsTurn,
    maxPick,
    handlePlayerPick,
    startNewGame
}) => {
    return (
        <div className="playing">
            <p className="playing__text">Залишилось сірників: {matchesLeft}</p>
            <p className="playing__text">Ваші сірники: {playerMatches}</p>
            <p className="playing__text">Сірники комп'ютера: {computerMatches}</p>
            <p className="playing__text message">{message}</p>
            {whichIsTurn === "player" && (
                <div className="playing__pick-buttons">
                    {Array.from({ length: maxPick }, (item, idx) => (
                        <button
                            key={idx}
                            onClick={() => handlePlayerPick(idx + 1)}
                            className="playing__pick-button"
                        >
                            Взяти {idx + 1}
                        </button>
                    ))}
                </div>
            )}
            <button onClick={startNewGame} className="playing__new-game-button">
                Почати нову гру
            </button>
        </div>
    );
};

export default Playing;