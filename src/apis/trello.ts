import {CallbackCollection} from "./others";


export namespace TrelloAuthManager {

    export const login = new CallbackCollection()
    export const logout = new CallbackCollection()

    let authenticated = false
    const clientId: string = "ad0cb36225ffb74a5b7c5fc5e5d61d22"


    export function isAuthenticated() {
        return authenticated
    }

    export function requestAuthentication() {

    }
}