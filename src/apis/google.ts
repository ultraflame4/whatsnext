import {CallbackCollection, googleclientId} from "./others";
import loggedIn from "./apiManager";



export namespace GoogleAuthManager{
    import TokenResponse = google.accounts.oauth2.TokenResponse;
    let authenticated = false;
    export const login = new CallbackCollection()
    export const logout = new CallbackCollection()

    const client = google.accounts.oauth2.initTokenClient({
        client_id: googleclientId,
        scope: "https://www.googleapis.com/auth/calendar",
        callback: (tokenResponse:TokenResponse) => {
            console.log("New Token!")
            console.log(tokenResponse)

            if (tokenResponse.error!==undefined){

                logout.dispatch()
                console.error("API: An unknown error has occured")
                console.error(tokenResponse.error)
                console.log(tokenResponse)
            }
            else{
                authenticated = true;
                if (tokenResponse && tokenResponse.access_token){
                    console.log(gapi.client)
                    console.log("API")


                    gapi.client.setToken({access_token:tokenResponse.access_token})


                    gapi.client.load("calendar","v3",() => {
                        console.log("Test2")
                        //@ts-ignore
                        console.log(gapi.client.calendar)
                    })
                }


                setTimeout(()=>{
                    console.log("Error, token expired")
                    console.log(parseInt(tokenResponse.expires_in)-1)
                    authenticated = false;
                    client.requestAccessToken()
                },(parseInt(tokenResponse.expires_in)-1)*1000)
                login.dispatch()
            }
        }
    })


    export function requestUserLogin(){
        client.requestAccessToken()
    }

    export function isAuthenticated(){
        return authenticated
    }

}