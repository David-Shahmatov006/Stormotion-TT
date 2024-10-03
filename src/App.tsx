import React, { useState } from "react";
import "./App.sass";
import { Dropdown } from "react-bootstrap";

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

    const startGame = () => {
        setPlayerMatches(0);
        setComputerMatches(0);
        setGameStarted(true);
        setWhichIsTurn(whichIsTurn);
        if (whichIsTurn === 'computer') {
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
            };
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
                    <div className="game__settings">
                        <label className="game__settings-item">
                            <span>Кількість сірників (непарна !):</span>
                            <input
                                type="number"
                                value={matchesLeft}
                                onChange={(e) =>
                                    setMatchesLeft(+e.target.value)
                                }
                                min="3"
                                step="2"
                            />
                        </label>
                        <label className="game__settings-item">
                            <span>
                                Максимальна кількість сірників, які можна брати
                                (m):
                            </span>
                            <input
                                type="number"
                                value={maxPick}
                                onChange={(e) =>
                                    setMaxPick(+(e.target.value))
                                }
                                min="1"
                            />
                        </label>
                        <Dropdown>
                            <Dropdown.Toggle
                                variant="success"
                                id="dropdown-basic"
                            >
                                {whichIsTurnTitle}
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item
                                    onClick={() => {
                                        setWhichIsTurn("player");
                                        setWhichIsTurnTitle("Ви");
                                    }}
                                >
                                    Ви 👨‍💻
                                </Dropdown.Item>
                                <Dropdown.Item
                                    onClick={() => {
                                        setWhichIsTurn("computer");
                                        setWhichIsTurnTitle("Комп'ютер");
                                    }}
                                >
                                    Комп'ютер 🤖
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                        <button
                            className="game__start-button"
                            onClick={startGame}
                            disabled={
                                whichIsTurnTitle === "Хто ходить першим ?" || !matchesLeft
                            }
                        >
                            Почати гру
                        </button>
                    </div>
                ) : (
                    <div className="game__playing">
                        <p className="game__text">
                            Залишилось сірників: {matchesLeft}
                        </p>
                        <p className="game__text">
                            Ваші сірники: {playerMatches}
                        </p>
                        <p className="game__text">
                            Сірники комп'ютера: {computerMatches}
                        </p>
                        <p className="game__text message">{message}</p>
                        {whichIsTurn === "player" && (
                            <div className="game__pick-buttons">
                                {Array.from({ length: maxPick }, (item, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => handlePlayerPick(idx + 1)}
                                        className="game__pick-button"
                                    >
                                        Взяти {idx + 1}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Game;
