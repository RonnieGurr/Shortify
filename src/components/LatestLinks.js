import { get, param } from 'jquery';
import React, { Component } from 'react';
import { render } from "react-dom";
const axios = require('axios');

async function getLinks() {
    let response = await axios.post('http://192.168.0.10/server.php', {
        getLinks: 'True'
      })
      .then(function (response) {
        let x = []
        response.data.forEach(element => {
            x.push(JSON.parse(element))
        });
        
        return response.data
      })
      .catch(function (error) {
        console.log("Some error occoured");
      })

      return response
}

class LatestLinks extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        links: []
      }
    }
  
    componentDidMount() {
        this.interval = setInterval(() => {
            getLinks().then((x) => {
                const links = x
                this.setState({
                    links: links
                })
            })
        }, 1);
    }
    
    render() {
      return (
        <div className="LatestLinks">
          {this.state.links.map((link) => <p>{link}</p>)}
        </div>
      );
    }
  }

export default LatestLinks;