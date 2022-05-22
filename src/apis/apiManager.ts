import {decodeJwt} from "jose";

import {GoogleAuthManager} from "./google";
import {googleclientId, googleScopes} from "./others";
import {TrelloAuthManager} from "./trello";


function isAuthorised() {
    console.log(GoogleAuthManager.isAuthenticated() , TrelloAuthManager.isAuthenticated())
    return GoogleAuthManager.isAuthenticated() && TrelloAuthManager.isAuthenticated()
}

export function start() {
    initGoogleClient()
}

export function logOutAll(){
    GoogleAuthManager.userLogout()
    TrelloAuthManager.logOut()
    localStorage.clear()
}
//@ts-ignore
window.wnLogOut = logOutAll

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