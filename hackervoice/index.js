module.exports = async function (context, req) {
    
    const password = req.query.password || req.body.password

    let your_response;

    if (password == "letmein"){
        your_response = "Access granted."
    } else {
        your_response = "Access denied."
    }
   
    context.res = {
        // status: 200, /* Defaults to 200 */
        body: your_response
    } 
}