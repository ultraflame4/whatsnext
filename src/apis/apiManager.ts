import {decodeJwt} from "jose";

import {GoogleAuthManager} from "./google";
import {googleclientId, googleScopes} from "./others";

namespace loggedIn {
    export let google = false
    export let trello = false
}

function isAuthorised() {
    return GoogleAuthManager.isAuthenticated() && loggedIn.trello
}

export function start() {
    initGoogleClient()
}




function initGoogleClient() {
    gapi.load("client",args => {
        gapi.client.init({
            clientId: googleclientId,
            scope: googleScopes,
            discoveryDocs: [
                "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest",
                "https://people.googleapis.com/$discovery/rest?version=v1"
            ]
        }).then(value => {
            console.log(value)
        })


    });

}




export default {
    isAuthorised,
    start,

}