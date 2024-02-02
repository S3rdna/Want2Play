import { useState, useEffect } from 'react'
import './List.css'

export default function OthersList(props) {
    //get room using loc and pass into <List/>
    //sho shit to the right of me 

    const [data, setData] = useState(props.data)

    useEffect(() => {
        console.log('useeffect test 1',props.data)
        console.log('useeffect test 2',Object.entries(props.data))
        console.log('ohterfile test ', Object.entries(props.data))
        setData(Object.entries(props.data));
        return () => {
        }
    }, [props.data])

    const temp = data.map((ele, index) => {
        const names = ele[0]
        const games  = ele[1]
        console.log('ohter file index:',index, names,games)
        return (

            <>
            <div className='col'>
            <h3>{names}</h3>
            <ul>{games.map((e) => (<li>{e}</li>))}</ul>
            </div>
            </>
        )
    })

    return (
        <div className='them'>
            <div>OthersList</div>
            <br />
            <div className='row'>
                {temp}
            </div>
        </div>
    )
}
