import { Component } from "react";
import { Link, Navigate } from 'react-router-dom';

class Landing extends Component {


    state = {
        pageURL: 'TestRoom'
    };

    componentDidMount() {
        this.setState({ pageURL: generateID() })

    }

    goToList = () => {
        Navigate("/lists");
    }

    render() {

        const clickHandle = () => {
            console.log("this is here now");
            Navigate("/lists");
        }

        return (

            <>
                <h2>Want to play: {this.state.pageURL}</h2>
                <label>Who are you? <input placeholder="Name"></input></label>
                <br />
                <label>Password <input placeholder="Optional"></input></label>
                <br />
                <button onClick={clickHandle}>fuck ya mom</button>
            </>
        )
    }
}


function generateID() {
    var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var id = '';
    for (var i = 0; i < 6; i++) {
        id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    console.log("test", id);
    return id;
}

export default Landing;
