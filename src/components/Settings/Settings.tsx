import React from "react";
import "./Settings.sass";
import { Dropdown } from "react-bootstrap";

interface Props {
    matchesLeft: number;
    setMatchesLeft: (param: number) => void;
    maxPick: number;
    setMaxPick: (param: number) => void;
    setWhichIsTurn: (param: string) => void;
    whichIsTurnTitle: string;
    setWhichIsTurnTitle: (param: string) => void;
    startGame: () => void;
}

const Settings: React.FC<Props> = ({
    matchesLeft,
    setMatchesLeft,
    maxPick,
    setMaxPick,
    setWhichIsTurn,
    whichIsTurnTitle,
    setWhichIsTurnTitle,
    startGame,
}) => {
    return (
        <div className="settings">
            <label className="settings__item">
                <span>Кількість сірників (непарна !):</span>
                <input
                    type="number"
                    value={matchesLeft}
                    onChange={(e) => setMatchesLeft(+e.target.value)}
                    min="3"
                    step="2"
                />
            </label>
            <label className="settings__item">
                <span>
                    Максимальна кількість сірників, які можна брати (m):
                </span>
                <input
                    type="number"
                    value={maxPick}
                    onChange={(e) => setMaxPick(+e.target.value)}
                    min="1"
                />
            </label>
            <Dropdown>
                <Dropdown.Toggle>{whichIsTurnTitle}</Dropdown.Toggle>
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
                className="settings__start-button"
                onClick={startGame}
                disabled={
                    whichIsTurnTitle === "Хто ходить першим ?" ||
                    !matchesLeft ||
                    maxPick >= matchesLeft
                }
            >
                Почати гру
            </button>
        </div>
    );
};

export default Settings;
