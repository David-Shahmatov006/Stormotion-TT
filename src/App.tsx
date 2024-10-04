import React, { useState } from "react";
import "./App.sass";
import Settings from "./components/Settings/Settings";
import Playing from "./components/Playing/Playing";

const Game: React.FC = () => {
    const [matchesLeft, setMatchesLeft] = useState<number>(25);
    const [playerMatches, setPlayerMatches] = useState<number>(0);
    const [computerMatches, setComputerMatches] = useState<number>(0);
    const [message, setMessage] = useState<string>("");
    const [whichIsTurn, setWhichIsTurn] = useState<string>("player");
    const [whichIsTurnTitle, setWhichIsTurnTitle] = useState<string>(
        "Хто ходить першим ?"
    );
    const [maxPick, setMaxPick] = useState<number>(3);
    const [gameStarted, setGameStarted] = useState<boolean>(false);

    const startNewGame = () => {
        setMatchesLeft(25);
        setPlayerMatches(0);
        setComputerMatches(0);
        setMessage("");
        setWhichIsTurnTitle("Хто ходить першим ?");
        setWhichIsTurn("player");
        setMaxPick(3);
        setGameStarted(false);
    }

    const startGame = () => {
        setPlayerMatches(0);
        setComputerMatches(0);
        setGameStarted(true);
        setWhichIsTurn(whichIsTurn);
        if (whichIsTurn === "computer") {
            setTimeout(() => computerTurn(0), 500);
        }
    };

    const computerTurn = (playerPick: number) => {
        let computerPick =
            (matchesLeft - playerPick - 1) % (maxPick + 1) ||
            Math.min(matchesLeft - playerPick, maxPick);

        setTimeout(() => {
            setComputerMatches(computerMatches + computerPick);
            setMatchesLeft(matchesLeft - playerPick - computerPick);
            setWhichIsTurn("player");
            setMessage(`🤖 Комп'ютер взяв ${computerPick} сірник/ів`);

            if (matchesLeft - playerPick - computerPick <= 0) {
                determineWinner(playerPick, computerPick);
            }
        }, 500);
    };

    const handlePlayerPick = (num: number) => {
        if (!whichIsTurn || num > matchesLeft) {
            return;
        }

        setPlayerMatches(playerMatches + num);
        setWhichIsTurn("computer");
        setMessage(`👨‍💻 Ви взяли ${num} сірник/ів`);

        if (matchesLeft - num > 0) {
            computerTurn(num);
        } else {
            determineWinner(num, 0);
        }
    };

    const determineWinner = (playerPick: number, computerPick: number) => {
        let finalPlayerMatches = playerMatches + playerPick;
        let finalComputerMatches = computerMatches + computerPick;

        if (finalPlayerMatches % 2 === 0 && finalComputerMatches % 2 !== 0) {
            setMessage(
                "Вітання!!! Ви перемогли 🥳 У вас парна кількість сірників"
            );
        } else if (
            finalComputerMatches % 2 === 0 &&
            finalPlayerMatches % 2 !== 0
        ) {
            setMessage(
                "Пощастить іншим разом 🙂 Комп'ютер переміг! У нього парна кількість сірників"
            );
        } else {
            setMessage("Нічия 🤝");
        }
    };

    return (
        <div className="game">
            <div className="game__content">
                <h1 className="game__title">Гра із сірниками</h1>
                {!gameStarted ? (
                    <Settings
                        matchesLeft={matchesLeft}
                        setMatchesLeft={setMatchesLeft}
                        maxPick={maxPick}
                        setMaxPick={setMaxPick}
                        setWhichIsTurn={setWhichIsTurn}
                        whichIsTurnTitle={whichIsTurnTitle}
                        setWhichIsTurnTitle={setWhichIsTurnTitle}
                        startGame={startGame}
                    />
                ) : (
                    <Playing
                        matchesLeft={matchesLeft}
                        playerMatches={playerMatches}
                        computerMatches={computerMatches}
                        message={message}
                        whichIsTurn={whichIsTurn}
                        maxPick={maxPick}
                        handlePlayerPick={handlePlayerPick}
                        startNewGame={startNewGame}
                    />
                )}
            </div>
        </div>
    );
};

export default Game;
