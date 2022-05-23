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


export type ApiRateLimitedExecuteErrorHandler = (reason:"ratelimit"|"others")=>void;
export interface ApiRateLimitedExecuteOptions {
    refreshSeconds?: number,
    rateLimit?: number,
    delay?: number
}
export class ApiRateLimitedExecutor{
    refreshSeconds: number // no of seconds before the api limit is refreshed
    rateLimit: number  // Number of requests allowed per refreshSeconds
    delay: number  // Delay in ms between each request
    requestsQueue: Array<ApiRateLimitedExecuteHandler>;

    private remaining: number
    private lastRefresh: number


    constructor(options:ApiRateLimitedExecuteOptions={}) {
        // refreshSeconds: number=10, rateLimit: number=50, delay: number=50
        this.refreshSeconds = options.refreshSeconds===undefined?10:options.refreshSeconds;
        this.rateLimit = options.rateLimit===undefined?50:options.rateLimit;
        this.delay = options.delay===undefined?50:options.delay;
        this.requestsQueue = [];
        this.remaining = this.rateLimit;
        this.lastRefresh = -1;
        this.isExecuting = false;

    }


    isExecuting: boolean = false;
    // work on the requests in the requests queue
    public execute(){

        // refresh remaining rate limit
        const now = Date.now();
        if (this.lastRefresh === -1 || now - this.lastRefresh > this.refreshSeconds * 1000) {
            this.lastRefresh = now;
            this.remaining=this.rateLimit;
            // console.log("refreshed rate limit")
        }

        // if there are requests in the queue
        if(this.requestsQueue.length > 0){
            this.isExecuting=true;
            console.log(this.requestsQueue)
            // if run out of rate limit, try again later
            if (this.remaining < 1){
                // caculate time of next refresh
                const nextRefresh = this.lastRefresh + this.refreshSeconds * 1000;
                const waitTime = nextRefresh - now;
                // set timeout to execute again
                // console.log("Caught Rate limited, waiting for " + waitTime + "ms");
                setTimeout(this.execute.bind(this), waitTime);
            }
            else{
                // execute current request
                // console.log(this.remaining + " requests remaining");
                this.remaining--;
                let current = <ApiRateLimitedExecuteHandler>this.requestsQueue[0]; // get current request
                let resulted = false
                // provide callbacks for success and error handling
                const onError = (reason:"ratelimit"|"others") => {
                    if (resulted) return;
                    resulted=true
                    // if rate limit error, try again later
                    if (reason === "ratelimit"){
                        // caculate time of next refresh
                        const nextRefresh = this.lastRefresh + this.refreshSeconds * 1000;
                        const waitTime = nextRefresh - now;
                        // set timeout to execute again
                        // console.log("APiError rate limited, waiting for " + waitTime + "ms");
                        setTimeout(this.execute.bind(this), waitTime);
                    }
                    else{
                        // if other error, just execute next request
                        setTimeout(this.execute.bind(this),this.delay)
                    }
                    console.log("error",reason);
                }
                const onSuccess = () => {
                    if (resulted) return;
                    resulted=true
                    // if success
                    // remove current request from queue
                    this.requestsQueue.shift();

                    // execute next request
                    setTimeout(this.execute.bind(this),this.delay)
                    console.log("success");
                }
                current(onSuccess, onError);
            }
        }
        else{
            this.isExecuting=false
        }
    }

    public request(request: ApiRateLimitedExecuteHandler){
        this.requestsQueue.push(request);
        if (!this.isExecuting){
            this.isExecuting=true
            setTimeout(this.execute.bind(this),0)
        }
    }

}
export type ApiRateLimitedExecuteSuccessHandler = ()=>void;


export type ApiRateLimitedExecuteHandler = (success:ApiRateLimitedExecuteSuccessHandler, error:ApiRateLimitedExecuteErrorHandler)=>void;
