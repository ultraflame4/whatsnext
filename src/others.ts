import {Router} from "vue-router";

let router: Router;

export function setRouter(router_: Router) {
    router = router_
}

export const vRoute = (path: string) => {

    if (path.charAt(0) === "/" || path.slice(0, 2) === "./") {
        router.push(path)

    } else {
        location.assign(path)
    }
}