import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './List.css';

function List(props) {
    const [games, setGames] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const loc = useLocation();
    const name = loc.pathname.split("/")[2];

    const addGame = () => {
        if (inputValue !== "") {
            setGames([...games, inputValue]);
            setInputValue('');
        }
    };


    const handleOnChange = (event) => {
        setInputValue(event.target.value);
    };

    const shareButtonHandle = () => {
        const link = window.location.href
        navigator.clipboard.writeText(link)
        console.log(link);
    };

    const listItems = games.map((game, index) => (
        <>
            <li key={index}>{game}</li>
        </>
    ));

    return (
        <>
            <nav>
                <Link to={"/"} style={{ marginRight: "10px" }}>home</Link>
                <button onClick={shareButtonHandle}>share</button>
            </nav>

            <strong><h3>{name}</h3></strong>
            <ul>{listItems}</ul>
            <input type="text" value={inputValue} onChange={handleOnChange} />
            <br />
            <button onClick={addGame}>add game</button>
        </>
    );
}

export default List;
