import { Component, ParamHTMLAttributes } from "react";
import { Link, Navigate } from 'react-router-dom';
import axios from 'axios'
import List from './List.jsx'

class Landing extends Component {

    constructor() {
        super()
        this.goToList = this.goToList.bind(this);
        this.login = this.login.bind(this);
    }


    state = {
        pageURL: getCode(window.location.href),
        flag: false,
        name: 'placeholder',
        pass: '',
        error: null
    };

    componentDidMount() {
        this.setState({ pageURL: getCode(window.location.href) })

    }


    goToList = () => {
        const inpName = document.getElementById('nameInput').value.replace(" ", "");
        const inpPass = document.getElementById('passInput').value;
        //TODO: figure out what to do about spaces
        if (inpName == "") { console.log("returned"); return }
        //TODO: implement password 
        //whoRU()
        //addToSocket()
        this.setState({ name: inpName, pass: inpPass, flag: true })

    }

    login() {

        const inpName = document.getElementById('nameInput').value.replace(" ", "");
        const inpPass = document.getElementById('passInput').value;
        if (inpName == "") { console.log("returned"); return }
        const user = {}
        user[inpName] = inpPass
        const room = this.state.pageURL

        //check of person exists in shit 
        axios.post('http://localhost:8080/whoRu', {
            room: room,
        }).then((res) => {
            if (!res.status === 200) { console.log('something happened'); return }
            this.setState({ name: inpName, pass: inpPass, flag: true })
        }).catch((err) => {
            console.log(err)
        })

    }


    gettest() {
        axios.get('http://localhost:8080/read').then((res) => {
            console.log(res.data)
        })
        console.log('get done')
    }

    resethandle() {
        axios.get('http://localhost:8080/reset').then((res) => {
            res.status(200)
        }).catch((err) => (err))
        console.log('reset shite')
    }

    render() {

        let { pageURL, flag, name, pass } = this.state
        const obj = { [name]: pass }
        const user = JSON.stringify(obj)

        return (

            <>
                {flag && (< Navigate to={`/${pageURL}/${name}`} state={{ user: user }} element={<List />} />)}
                <h2>Want to play: {this.state.pageURL}</h2>
                <label>Who are you? <input placeholder="Name" id="nameInput" /></label>
                <br />
                <label>Password <input placeholder="Optional" id="passInput" /></label>
                <br />
                <button onClick={this.login}>lol</button>
                <button onClick={this.gettest}>lmao</button>
            </>
        )
    }
}


function getCode(shite) {
    const arr = shite.split('/')
    return arr[3]

}



export default (Landing);
