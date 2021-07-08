const querystring = require('querystring')
const fetch = require ('node-fetch');

module.exports = async function (context, req) {
    context.log(req.body)

    const queryObject = querystring.parse(req.body);

    const url =queryObject.mediaUrl10;

    let resp = fetch(url, {
        method: 'GET'
    }
)

    let data = await resp.arrayBuffer()

    let age_data = await analyzeImage(data)

    let age = age_data[0].faceAttributes.age
    let generation = determine_generation(age)

    context.log(generation)

    context.res = {
        // status: 200, /* Defaults to 200 */
        body: url
    };
}

function determine_generation(age){
    if(age > 5 && age < 25) {
        generation = "GenZ"
    }else if (age >24 && age < 41){
        generation = "GenY"
    }else if (age >40 && age < 57){
        generation = "GenX"
    }else if (age >56 && age < 76){
        generation = "BabyBoomer"  
    }else{
        generation = "Unknown"
    }

    return generation;
}

async function analyzeImage(img) {
    const subscriptionKey = process.env.FACEAPI_KEY1;
    const uriBase = process.env.FACEAPI_ENDPOINT + '/face/v1.0/detect';

    let params = new URLSearchParams({
        'returnFaceId': 'true',
        'returnFaceAttributes': 'age'
    })

    let resp = await fetch(uriBase + '?' + params.toString(),{
        method: 'POST',
        body: img,

        headers: {
            'Content-Type': 'application/octet-stream',
            'Ocp-Apim-Subscription-Key': subscriptionKey
        }
    })

    let result = resp.json()
    return result
}

//twilio number +17737869041