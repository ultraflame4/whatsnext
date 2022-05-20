import {decodeJwt} from "jose";

import {GoogleAuthManager} from "./google";
import {googleclientId} from "./others";

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
            scope: "https://www.googleapis.com/auth/calendar profile",
            discoveryDocs: [
                "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"
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