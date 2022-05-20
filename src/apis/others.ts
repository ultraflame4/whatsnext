export const googleclientId = "580007816875-77nc469vfrlt52l255uo4o9vb0cac0ai.apps.googleusercontent.com"
export const googleScopes = "https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/userinfo.profile"

export class CallbackCollection{
    private callbacks: Array<()=>void>
    private once_callbacks: Array<()=>void>
    constructor() {
        this.callbacks = []
        this.once_callbacks =[]
    }

    on(callback:()=>void){
        this.callbacks.push(callback)
    }

    once(callback:()=>void){
        this.once_callbacks.push(callback)
    }

    dispatch(){
        this.callbacks.forEach(value => value())
        this.once_callbacks.forEach(value => value())
        this.once_callbacks =[]
    }
}