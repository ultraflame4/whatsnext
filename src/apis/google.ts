import {CallbackCollection, googleclientId, googleScopes} from "./others";
import loggedIn from "./apiManager";
import {vRoute} from "../others";


export namespace GoogleAuthManager {
    import TokenResponse = google.accounts.oauth2.TokenResponse;
    let authenticated = false;
    export const login = new CallbackCollection()
    export const logout = new CallbackCollection()

    login.on(() => {
        authenticated = true
    })
    logout.on(() => {
        authenticated = false
        localStorage.removeItem("a")
        localStorage.removeItem("b")
        localStorage.removeItem("c")
        console.log("logging out")
        google.accounts.oauth2.revoke(currentAccessToken,()=>{
            vRoute("/login")
        })
    })

    let userEmail = ""
    let currentAccessToken = ""
    let currentExpire: number | null = null

    const client = google.accounts.oauth2.initTokenClient({
        client_id: googleclientId,
        scope: googleScopes,
        callback: async (tokenResponse: TokenResponse) => {

            if (tokenResponse.error !== undefined) {

                logout.dispatch()
                console.error("API: An unknown error has occured")
                console.error(tokenResponse.error)
                console.log(tokenResponse)

            } else {
                let ascopes = googleScopes.split(" ")
                if (google.accounts.oauth2.hasGrantedAllScopes(tokenResponse,ascopes[0],...ascopes.slice(1))){
                    await processToken(tokenResponse.expires_in, tokenResponse.access_token)
                }
                else{
                    alert("Google OAuth2. Not All Scopes Granted\n All scopes must be granted to use this app.\n Please login again!")
                    location.reload()
                }
            }
        }
    })

    let currentTimeoutHandle: number | null = null


    function processToken(tokenExpire_: string, accessToken: string) {
        const tokenExpire = parseInt(tokenExpire_)

        gapi.client.setToken({access_token: accessToken})

        gapi.client.people.people.get({
            personFields: "names,emailAddresses",
            resourceName: "people/me"
        }).then(response => { // store current user email into localStorage as hint for next time.

            userEmail = (<gapi.client.people.EmailAddress[]>response.result.emailAddresses).filter(e => e.metadata.primary)[0].value
            localStorage.setItem("a",
                // encode base 64
                btoa(userEmail)
            )

            currentAccessToken = accessToken
            currentExpire = new Date().getTime() + (tokenExpire - 1) * 1000
            localStorage.setItem("b", btoa(accessToken))
            localStorage.setItem("c",
                btoa((currentExpire).toString())
            )


            currentTimeoutHandle = setTimeout(() => {
                console.log("Error, token expired")
                console.log("Expire:", currentExpire)

                vRoute("/login")
            }, (tokenExpire - 1) * 1000)
            login.dispatch()

        }).catch(error => {
            logout.dispatch()
            if (currentTimeoutHandle != null) {
                clearTimeout(currentTimeoutHandle)
            }
            console.error(error)
        })

        return
    }


    export function userLogout() {
        logout.dispatch()
    }

    function getLastSessionData() {
        let A = localStorage.getItem("a")
        let B = localStorage.getItem("b")
        let C = localStorage.getItem("c")

        let lastUser = A == null ? null : atob(A)
        let lastAccessToken = B == null ? null : atob(B)
        let lastExpire: null | number = C == null ? null : parseInt(atob(C))
        return {lastUser, lastAccessToken, lastExpire}
    }

    /*
    Returns true if succesful
     */
    export function loginWithExistingToken(): boolean {
        const {lastUser, lastAccessToken, lastExpire} = getLastSessionData()
        if (lastUser != null && lastAccessToken != null && lastExpire != null) {
            // console.log("A")
            let now = new Date().getTime()
            if (lastExpire > now) {
                console.log("[GSI] Logging in with existing token...")
                // console.log("Expire:",lastExpire,"now:",now)
                processToken(((lastExpire - now) / 1000).toString(), lastAccessToken)
                return true
            }
        }
        return false
    }

    export async function requestUserLogin() {
        let lastUser = getLastSessionData().lastUser

        if (await loginWithExistingToken()) {

        } else if (lastUser != null) {
            console.log(lastUser)
            client.requestAccessToken({
                hint: lastUser
            })
        } else {
            client.requestAccessToken()
        }
    }

    export function isAuthenticated() {
        return authenticated
    }
}