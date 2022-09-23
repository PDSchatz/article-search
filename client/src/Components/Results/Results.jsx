import React from 'react';
import Docsum from "./Docsum";
import './Results.css'

function Results(props) {
    if(props.results !== null){
        return (
            <div className='results-container'>
                    {
                        props.results.map((docSum) => {
                            if(docSum){
                                return (
                                    <Docsum document={docSum}></Docsum>
                                )
                            }
                        })
                    }
            </div>
        )
    } else {
        return null
    }
}

export default Results;