import { Component, ParamHTMLAttributes } from "react";
import { Link, Navigate } from 'react-router-dom';
import axios from 'axios'
import List from './List.jsx'

class Landing extends Component {

    constructor() {
        super()
        this.whoRU = this.whoRU.bind(this);
        this.goToList = this.goToList.bind(this);
    }


    state = {
        pageURL: getCode(window.location.href),
        flag: false,
        name: 'placeholder',
        error: null

    };

    componentDidMount() {
        this.setState({ pageURL: getCode(window.location.href) })

    }


    goToList = () => {
        const inpName = document.getElementById('nameInput').value.replace(" ", "");
        //TODO: figure out what to do about spaces
        if (inpName == "") { console.log("returned"); return }
        //TODO: implement password 
        //whoRU()
        //addToSocket()
        this.setState({ name: inpName, flag: true })

    }

    whoRU() {
        //check if person exists in rooms table 

        const inpName = document.getElementById('nameInput').value.replace(" ", "");
        if (inpName == "") { console.log("returned"); return }

        const inpPass = document.getElementById('passInput').value.replace(" ", "");
        const room = this.state.pageURL

        axios.post('http://localhost:8080/whoRu', {
            name: inpName,
            password: inpPass,
            room: room,
        }).then((res) => {
            const t2 = res
            console.log("in react", t2)
        }).catch((err) => {
            console.log(err)
        })
        console.log("whoRU is done")
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

        let { pageURL, flag, name } = this.state

        return (

            <>
                {flag && (< Navigate to={`/${pageURL}/${name}`} element={<List />} />)}
                <h2>Want to play: {this.state.pageURL}</h2>
                <label>Who are you? <input placeholder="Name" id="nameInput" /></label>
                <br />
                <label>Password <input placeholder="Optional" id="passInput" /></label>
                <br />
                <button onClick={this.goToList}>lol</button>
                <button onClick={this.whoRU}>psot</button>
                <button onClick={this.gettest}>get</button>
                <br />
                <button onClick={this.resethandle}>reset</button>
            </>
        )
    }
}


function getCode(shite) {
    const arr = shite.split('/')
    return arr[3]

}



export default (Landing);
