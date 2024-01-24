import { useState, useEffect } from 'react'
import './List.css'

export default function OthersList(props) {
    //get room using loc and pass into <List/>
    //sho shit to the right of me 

    const [data, setData] = useState(props.data)

    const temp = data.map((ele) => {
        const name = Object.entries(ele)[0][0]
        const list = Object.entries(ele)[0][1]
        console.log(name, list, props.me)
        return (
            <>
                <h3>{name}</h3>
                <ul>{list.map((game) => { return (<li key={game}>{game}</li>) })}</ul>
            </>
        )
    })



    //const temp = Object.entries(allLists).map((key, value) => (
    //    <>
    //        <li key={key[0]}>{key[1]}</li>
    //    </>
    //))
    // const [games, setGames] = useState([]);
    // const [socket, setSocket] = useState(null);
    // const [room, setRoom] = useState(this.props.room);


    //useeffect(() => {

    //    // keeping user in state
    //    // TODO: This fucks up when user refreshes page
    //    //console.log('big testign', loc.state.user, user)

    //    console.log('testing room',room)
    //    // connect to socket server
    //    const queryString = `roomID=${room}`
    //    const socket = io("http://localhost:8080", { query: queryString, })
    //    setSocket(socket)

    //    socket.on('update_request', (data) => {
    //        //get data from server and update list 
    //        const holding = data['data']
    //        const update_arr = holding.filter((ele) => ele['user'] == user)
    //        const update_games_arr = update_arr.map((ele) => ele['list_item'])
    //        setGames([...update_games_arr])
    //    })

    //    return () => {
    //        socket.disconnect();
    //    }

    //}, [name, roomID, user])
    return (
        <div className='them'>
            <div>OthersList</div>
            <br />
            {temp}
        </div>
    )
}
