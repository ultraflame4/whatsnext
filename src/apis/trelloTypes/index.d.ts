declare namespace Trello{

    interface TrelloAuthorizationScope{
        read?:boolean
        write?:boolean
        account?:boolean
    }

    interface TrelloAuthorizationOptions{
        type?: "redirect"|"popup"
        name?: string
        persist?:boolean
        interactive?:boolean
        scope?:TrelloAuthorizationScope
        expiration?:"1hour"|"1day"|"30days"|"never"
        success?:()=>void
        error?:()=>void
    }

    function authorize(opts:TrelloAuthorizationOptions);
}