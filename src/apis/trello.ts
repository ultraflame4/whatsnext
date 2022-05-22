import {CallbackCollection} from "./others";

export namespace TrelloApi {

}

export namespace TrelloAuthManager {

    export const login = new CallbackCollection()
    export const logout = new CallbackCollection()

    let authenticated = false
    const clientId: string = "ad0cb36225ffb74a5b7c5fc5e5d61d22"

    const trelloLocalStorageKey = "trello_token"

    export function isAuthenticated() {
        return authenticated
    }

    export function useExistingToken(): Promise<undefined> {

        return new Promise<undefined>(function (resolve, reject) {
            const a = localStorage.getItem(trelloLocalStorageKey)

            if (a !== null) {
                console.log("Using existing token")
                Trello.setToken(a)
                function onSuccess(boards: Trello.BoardObject[]) {
                    authenticated = true
                    login.dispatch()
                    resolve(undefined)
                }
                function onError(error: any) {
                    console.log("Existing token test failed", error)
                    localStorage.removeItem(trelloLocalStorageKey)
                    reject("Existing token test failed")
                }

                Trello.rest("GET", "/members/me/boards", {}, onSuccess, onError)
            }
            reject("No existing token")
        })
    }

    export function requestAuthentication() {
        useExistingToken()
            .then(() => {
                console.log("[Trello] Used existing token")
            })
            .catch(reason => {
                console.log("No existing token or existing token failed. Requesting new token")
                Trello.authorize({
                    type: "popup",
                    name: "WhatsNext",
                    scope: {
                        read: true,
                        write: true
                    },
                    expiration: "30days",
                    success: () => {
                        authenticated = true
                        login.dispatch()
                    },
                    error: () => {
                        console.warn("Trello Authentication failed")
                        authenticated = false
                        logout.dispatch()
                    }
                })
            })

    }
}

