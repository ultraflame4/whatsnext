import {ApiRateLimitedExecutor} from "./others";


let a = new ApiRateLimitedExecutor({rateLimit: 1,refreshSeconds: 1});


a.request((success, error) => {
    console.log("TEST1")
    success()
})


let c = 2
a.request((success, error) => {
    c--
    console.log("Attempt #" + c)

    if (c>0){
        error("ratelimit")
    }
    else{
        success()
    }
})