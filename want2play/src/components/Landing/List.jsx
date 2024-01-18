import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './List.css';
import io from 'socket.io-client'

function List() {
    const [games, setGames] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [noItemFlag, setNoItemFlag] = useState(false);
    const loc = useLocation();
    const name = loc.pathname.split("/")[2];
    const roomID = loc.pathname.split("/")[1];
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        const queryString = `name=${name}&roomID=${roomID}`
        const socket = io("http://localhost:8080", { query: queryString, })
        setSocket(socket)
        socket.on('update_request', (data) => {
            //get data from server and update list 
            console.log('update requested', data['data'])
        })
        socket.on('item_added', () => { console.log('item_added in client ') })
        //socket.on('item_deleted')

        return () => {
            socket.disconnect();
        }
    }, [name, roomID])


    const handleOnChange = (event) => {
        setInputValue(event.target.value);
    };

    const shareButtonHandle = () => {
        const link = window.location.href.slice(0, -(name.length + 2))
        navigator.clipboard.writeText(link)
        console.log(link);
    };

    const addGameButtonHandle = () => {
        if (inputValue !== "") {
            setGames([...games, inputValue]);
            //change to post request that will emit from server the value that needs to be added to all users 
            socket.emit('item_added', { name: name, new_item: inputValue })
            //might remove under 
            setInputValue('');
            setNoItemFlag(false)
        } else { setNoItemFlag(true) }
    };

    const deleteGameButtonHandle = (game, index) => {
        setGames(games.filter((g) => {
            return g !== game
        }))
        socket.emit('item_deleted', { name: name, deleted_item: game, index: index })
    };

    const listItems = games.map((game, index) => (
        <li key={index}><a href='#' onClick={() => deleteGameButtonHandle(game, index)}>{game}</a></li>
    ));

    return (
        <>
            <nav>
                <Link to={"/"} style={{ marginRight: "10px" }}>home</Link>
                <button onClick={shareButtonHandle}>share</button>
            </nav>

            <strong><h3>{name}</h3></strong>
            <h4>room name {roomID}</h4>
            <ul>{listItems}</ul>
            <input type="text" value={inputValue} onChange={handleOnChange} />
            <br />
            <button onClick={addGameButtonHandle}>add game</button>
            <button onClick={deleteGameButtonHandle}>delete game</button>

            <br />
            {noItemFlag && <h4>No item to add!</h4>}
        </>
    );
}

export default List;
