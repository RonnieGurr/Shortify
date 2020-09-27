import React from 'react';
import Shortify from './shortifyEngine';
import LatestLinks from './LatestLinks';
const axios = require('axios');

function uploadObject(object) {


    axios.post('http://localhost/server.php', {
        uploadObject: object
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });

}

async function checkLink(link) {
    
    const submitBTN = document.getElementById('submit');
    const urlInput = document.getElementById('linkBox')
    const textArea = document.getElementById('json');
    let url = link.trim()

    if (url.length > 0) {
        submitBTN.disabled = true
        urlInput.disabled = true
        axios.get(`http://localhost/server.php?checkLink=${link}`)
    .then((response) => {
        urlInput.style.border = ""
        const response1 = response
        if (response1.data[0] === "Invalid URL" || response1.data.includes("Error: 28") || response1.data.includes("/advancedsearch2.virginmedia.com")) {
            submitBTN.disabled = false
            urlInput.disabled = false
            if (response1.data.includes("Error: 28:")) {
                textArea.innerHTML = `The request timed out, please check your URL. &#13 ${response1.data}`
            }
            else if (response1.data.includes("/advancedsearch2.virginmedia.com")) {
                textArea.innerHTML = "This link seems dead, please try again! if you think this is an issue on our end please use the contact form."
            } else {
                textArea.innerHTML = "Please enter a valid link."
            }
        } else {
            delete response1.data
            submitBTN.disabled = false
            urlInput.disabled = false
            let shortiftyData = new Shortify("new link", link, response.status)
            axios.get(`http://localhost/server.php?shortenLink=${link}`)
            .then((response) => {
                shortiftyData.smallUrl = response.data
                var finalResponse = "--------YOUR REQUEST-------- &#13" + JSON.stringify(response1, null, 2) + "&#13 --------YOUR LINK-------- &#13" + JSON.stringify(shortiftyData, null, 2); // spacing level = 2
                document.getElementById('json').innerHTML = finalResponse
                uploadObject(JSON.stringify(shortiftyData))
            })
        }
    })
  }
  else {
      urlInput.style.border = "2px solid red"
      textArea.innerHTML = 'Please enter a valid link'
  }
}

function ShortifyDisplay(props) {
    return (
       <div className="shortify">
           <div className="container">
                <h2>Shorten Link</h2>

                <div className="shorten-link">
                    <div className="shortify-output">
                        <textarea id="json"></textarea>
                    </div>
                    <div className="input-group">
                        <span className="input-group-btn">
                        <button id="submit" className="btn btn-dark" type="button" name="submit" onClick={() => {checkLink(document.getElementById("linkBox").value)}}>SUBMIT</button>
                        </span>
                        <input id="linkBox" type="text" className="form-control" name="url"  placeholder="https://www.google.com"/>
                    </div>

                    <div className="latest-links">
                        <h2>Latest Links</h2>
                        <LatestLinks />
                    </div>
                </div>

           </div>
       </div>
    )
}

export default ShortifyDisplay;