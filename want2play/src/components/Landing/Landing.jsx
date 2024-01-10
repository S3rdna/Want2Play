import { Component, ParamHTMLAttributes } from "react";
import { Link, Navigate } from 'react-router-dom';
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
        console.log(`here`)
        const inpName = document.getElementById('nameInput').value
        if (inpName == "") { console.log("returned"); return }
        this.setState({ name: inpName, flag: true })
    }

    render() {

        let { pageURL, flag, name } = this.state

        console.log(this.state)
        return (

            <>
                {flag && (< Navigate to={`/${pageURL}/${name}`} element={<List />} />)}
                <h2>Want to play: {this.state.pageURL}</h2>
                <label>Who are you? <input placeholder="Name" id="nameInput" /></label>
                <br />
                <label>Password <input placeholder="Optional" /></label>
                <br />
                <button onClick={this.goToList}>lol</button>
            </>
        )
    }
}


function getCode(shite) {
    const arr = shite.split('/')
    return arr[3]

}



export default (Landing);
