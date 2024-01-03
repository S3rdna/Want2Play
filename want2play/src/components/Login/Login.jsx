import { useState } from 'react'

function Login() {
    const [count, setCount] = useState(0)



    return (
        // learn how to take text forms submitted
        // implement socketio
        // save info into sqlite for persistance 

        <>
            <h2>Login</h2>
            <form id="form1">
                <label>Username: <input></input></label>
                <br />
                <label>Password: <input></input></label>
            </form>
            <button type='submit' form='form1' value="Submit">Submit</button>
        </>
    )
}

export default Login;
