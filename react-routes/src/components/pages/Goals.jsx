import { useEffect, useState } from "react" // Importing hooks
import axios from 'axios' // Importing fetch method
import { Link, useParams } from 'react-router-dom'; // Importing router dom methods

const Goals = () => {
    return(
        <div>
            <h1>De 17 Verdensmål</h1>
            <section><GoalList /></section>
            <br />
        </div>
    )
}

const GoalList = () => {
    // Hook with a state variable and function - Datatype is a array
    const [apiData, setApiData] = useState([])

    //useEffect to control the rendering
    useEffect(() => {
        //Endpoint url
        const url = `https://api.mediehuset.net/sdg/goals`

        //Async funtion to fetch data
        const getData = async () => {
            try {
                // Waiting and assigns data to our variable result
                const result = await axios.get(url)
                // Assigns array property to state variable (The useState hook)
                setApiData(result.data.items);
            }
            catch(err) {
                console.error(err);
            }
        }
        // Calling the function
        getData()
        //Sets state function in dependency array - Runs at each render
    }, [setApiData])

    return(
        <ul>
            {
                // Checks if apiData exists and maps it - Inserts link to get details
                apiData && apiData.map(item => {
                    return(
                        <li key={item.id}>
                            <Link to={`/goals/${item.id}`}>{item.title}</Link></li>
                    )
                })
            }
        </ul>
    )
}

// Henter en record ud istedet for en liste.
const GoalDetails = () => {
    // Gets id from url (:id is defined in route)
    const { id } = useParams()
    // Hook with state variable and function - Datatype is a object
    const [ apiData, setApiData] = useState({})

    // useEffect to control of rendering
    useEffect(() => {
        // Endpoint url
        const url = `https://api.mediehuset.net/sdg/goals/${id}`

        // Async function to fetch data
        const getData = async () => {
            const result = await axios.get(url)
            // This time it's item and not items since we only get 1 result out and not the list.
            setApiData(result.data.item);
        }

        getData()
        // Sets id in dependecy array - Rendering each time it changes
    }, [id]);

    return(
        <div>
            {
                // Checks if state variable is true. If it's false then it never gets further down.
                apiData && (
                    <>
                        <h2>{apiData.title}</h2>
                        <img src={apiData.image} alt=""></img>
                        <p>{apiData.byline}</p>
                    </>
                )
            }
        </div>
    )
}

export { Goals, GoalDetails }