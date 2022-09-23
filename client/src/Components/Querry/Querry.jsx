import React, {useState} from 'react';
import axios from "axios";

function QuerryBar(props) {
    const [query, setQuery] = useState("")
    const [status, setStatus] = useState(null)
    function handleQueryChange(e){
        setQuery(e.target.value)
    }

    async function handleSubmit(e){
        e.preventDefault()
        try{
            const docSums = await axios({
                method: 'POST',
                url: '/api/search',
                data: {
                   query
                }
            })
            if(docSums.status === 200){
                props.setResults(docSums.data)
            } else {

                setStatus(docSums.data.status)
            }
        } catch {

        }
        console.log('neat?', `\n`, query)
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Enter your query here, or use the builder to build one"
                    onChange={handleQueryChange}
                    value={query}
                />
                <button type='submit'>Search</button>
            </form>
            {
                status &&
                <div>
                    {status}
                </div>
            }
        </div>
    );
}

export default QuerryBar;