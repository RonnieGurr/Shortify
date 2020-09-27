import React from 'react';

function Jumbotron(props) {
    return (
    <div className="jumbotron">
        <h1 className="display-4">{props.title}</h1>
        <p className="lead">{props.lead}</p>
    <hr className="my-4"/>
        <p>{props.small}</p>
    <p className="lead">
    <a className="btn btn-dark btn-lg" href={props.link} role="button">{props.buttonText}</a>
    </p>
    </div>
    )
}

export default Jumbotron;