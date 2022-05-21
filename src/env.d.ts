/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>
  export default component
}


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
  function rest(method:"GET"|"POST"|"PUT"|"DELETE",path:string,params?:Object,success?:()=>void,error?:()=>void);
  function get(path:string,params?:Object,success?:()=>void,error?:()=>void);
  function post(path:string,params?:Object,success?:()=>void,error?:()=>void);
  function put(path:string,params?:Object,success?:()=>void,error?:()=>void);
  function del(path:string,params?:Object,success?:()=>void,error?:()=>void);


}

declare namespace Trello.actions{
  function get(id:string, params?:Object, success?:()=>void,error?:()=>void);
}
declare namespace Trello.cards{
  function get(id:string, params?:Object, success?:()=>void,error?:()=>void);
}
declare namespace Trello.checklists{
  function get(id:string, params?:Object, success?:()=>void,error?:()=>void);
}

declare namespace Trello.boards{
  function get(id:string, params?:Object, success?:()=>void,error?:()=>void);
}

declare namespace Trello.lists{
  function get(id:string, params?:Object, success?:()=>void,error?:()=>void);
}

declare namespace Trello.members{
  function get(id:string, params?:Object, success?:()=>void,error?:()=>void);
}

declare namespace Trello.organizations{
  function get(id:string, params?:Object, success?:()=>void,error?:()=>void);
}
