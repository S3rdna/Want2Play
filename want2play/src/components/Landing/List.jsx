import { Component } from "react";
import { Link } from 'react-router-dom';
import './List.css'

class List extends Component {


    constructor(props) {
        super(props);
        this.state = { name: this.props.name, games: ["lethal co", "csgo", "valo", "testing"], inputValue: '' };

    }

    addGame = () => {

        const inp = document.getElementById("addField").value
        if (inp != "") {
            var temp = this.state.games
            temp.push(inp)
            this.setState({ games: temp, inputValue: '' })
        }
    };

    handleOnChange = (event) => {
        this.setState({ inputValue: event.target.value })
    }

    render() {

        const listItems = this.state.games.map((game) =>
            <>
                <li>{game}</li>
                <br />
            </>
        );


        return (
            <>
                <nav><Link to={"/"} >home</Link></nav>
                <h4>{this.state.name}</h4>
                <ul>{listItems}</ul>
                <input type="text" id="addField" value={this.state.inputValue} onChange={this.handleOnChange} ></input>
                <br />
                <button onClick={this.addGame}>add game</button>
            </>
        )
    }


}

export default List

