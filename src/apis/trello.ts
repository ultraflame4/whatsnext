import {CallbackCollection} from "./others";
import {ApiRateLimitedExecutor, vRoute} from "../others";



export namespace TrelloAuthManager {

    export const login = new CallbackCollection()
    export const logout = new CallbackCollection()

    let authenticated = false

    login.on(() => {
        authenticated = true
    })

    logout.on(() => {
        authenticated = false
    })

    const clientId: string = "ad0cb36225ffb74a5b7c5fc5e5d61d22"

    const trelloLocalStorageKey = "trello_token"

    export function isAuthenticated() {
        return authenticated
    }

    export function useExistingToken(): Promise<undefined> {

        return new Promise<undefined>(function (resolve, reject) {
            const a = localStorage.getItem(trelloLocalStorageKey)

            if (a !== null) {
                console.log("[Trello] Using existing token")
                Trello.setToken(a)
                function onSuccess(boards: Trello.BoardObject[]) {
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
            else{
                reject("No existing token")
            }
        })
    }

    export function logOut() {
        localStorage.removeItem(trelloLocalStorageKey)
        logout.dispatch()
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

                        login.dispatch()
                    },
                    error: () => {
                        console.warn("Trello Authentication failed")
                        logout.dispatch()
                    }
                })
            })

    }
}

export namespace TrelloApi {

    const RateLimitedExecutor = new ApiRateLimitedExecutor()

    import GetBoardParam = Trello.boards.GetBoardParam;

    export function request<T,F=Object>(method: "GET" | "POST" | "PUT" | "DELETE", path: string, params?: F):Promise<T>{
        return new Promise<T>((resolve, reject) => {
            RateLimitedExecutor.request((success, error) => {
                function onSuccess(data:T) {
                    success()
                    resolve(data)
                }
                function onError(apierror:Trello.TrelloApiError) {
                    console.warn("Warning Api Error",apierror)
                    if (apierror.code==="401" || apierror.code==="400"){
                        console.warn("Trello Authentication failed")
                        alert("Trello Authentication failed")
                        error("others")

                        TrelloAuthManager.logOut()
                        vRoute("/login")
                    }

                    if (apierror.code==="429"){
                        console.warn("Rate Limited")
                        error("ratelimit")
                    }
                    else{
                        error("others")
                    }

                    reject(error)
                }

                Trello.rest(method, path, params, onSuccess, onError)
            })
        })
    }

    export class Board{

        public static getAllOpen():Promise<Trello.BoardObject[]> {
            let o = TrelloApi.request<Trello.BoardObject[]>("GET", "/members/me/boards", {filter:"open"})
            console.log("[Trello] Get all open boards",o)
            return o
        }

        public static getAll():Promise<Trello.BoardObject[]> {
            return TrelloApi.request<Trello.BoardObject[],GetBoardParam>("GET", "/members/me/boards")
        }

        public static get(id:string):Promise<Trello.BoardObject> {
            return TrelloApi.request<Trello.BoardObject>("GET", `/boards/${id}`)
        }
    }
}
