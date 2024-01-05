import { Component } from "react";
import { Navigate } from "react-router-dom";

class LandingGenerate extends Component {

    render() {
        const genId = generateID()
        return <Navigate to=`/${genId}` />
    }
}


function generateID() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let id = '';
    for (let i = 0; i < 6; i++) {
        id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    console.log("test", id);
    return id;
}

