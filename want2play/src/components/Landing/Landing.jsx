import { Component, ParamHTMLAttributes } from "react";
import { Link, Navigate } from 'react-router-dom';
import axios from 'axios'
import List from './List.jsx'

class Landing extends Component {


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

        axios.post('http://localhost:8080/testpost', {
            name: inpName,
        }).then((res) => {
            const t2 = res.data
            console.log(t2)
        }).catch((err) => {
            console.log(err)
        })
        console.log("whoRU is done")
    }

    gettest() {
        axios.get('http://localhost:8080/test').then((res) => {
            console.log(res.data)
        })
        console.log('get done')
    }

    render() {

        let { pageURL, flag, name } = this.state

        return (

            <>
                {flag && (< Navigate to={`/${pageURL}/${name}`} element={<List />} />)}
                <h2>Want to play: {this.state.pageURL}</h2>
                <label>Who are you? <input placeholder="Name" id="nameInput" /></label>
                <br />
                <label>Password <input placeholder="Optional" /></label>
                <br />
                <button onClick={this.goToList}>lol</button>
                <button onClick={this.whoRU}>psot</button>
                <button onClick={this.gettest}>get</button>
            </>
        )
    }
}


function getCode(shite) {
    const arr = shite.split('/')
    return arr[3]

}



export default (Landing);
