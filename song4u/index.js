const querystring = require('querystring')

module.exports = async function (context, req) {
    context.log(req.body)

    const queryObject = querystring.parse(req.body);

    const url =queryObject.mediaUrl10;

    context.res = {
        // status: 200, /* Defaults to 200 */
        body: url
    };
}

//twilio number +17737869041