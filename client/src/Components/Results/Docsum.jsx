import React from 'react';

function Docsum(props) {
    return (
        <>
            {
                <div className="doc-sum">
                    <span>Title: {props.document.title}</span>
                    <span>Publication Date: {props.document.pubdate}</span>
                    <span>Authors: </span>
                    <ul>
                        {
                            props.document.authors.map( (author) => {
                                if(author.authtype === "Author"){
                                    return (
                                        <li>{author.name}</li>
                                    )
                                } else {
                                    return null
                                }
                            })
                        }
                    </ul>
                    <span>Journal: {props.document.fulljournalname}</span>
                </div>
            }
        </>
    );
}

export default Docsum;