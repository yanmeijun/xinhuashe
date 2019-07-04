let formatError = (ctx, err) => {
    let method = ctx.method, url = ctx.url, body = ctx.request.body, userAgent = ctx.header.userAgent;
    console.error({method, url, body, userAgent, err})
    return {method, url, body, userAgent, err}
}

let formatRes = (ctx) => {
    let method = ctx.method, url = ctx.url, body = ctx.request.body, response = ctx.response;
    console.info({method, url, body, response})
    return {method, url, body, response}
}
module.exports = {formatError, formatRes}