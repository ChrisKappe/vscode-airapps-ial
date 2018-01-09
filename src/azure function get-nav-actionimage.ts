declare var require: any

export function run(context: any, req: any): void 
{
    context.log("TypeScript HTTP trigger function processed a request.")

    if (req.query.alActionName || (req.body && req.body.alActionName)) 
    {
    } else 
    {
        context.res = 
        {
            status: 400,
            body: "Please pass an Action Name on the query string or in the request body"
        }
    }

    let request = require('request');

    const uri = 'https://europewest.services.azureml.net/workspaces/8875ef269b164df68811b465e832ec93/services/a0b10602cc4a4b4ca9f39fcba80ef3bf/execute?api-version=2.0&format=swagger';
    const apiKey = 'PVs/Hj/zCVMnVcIjm7dgDX/rE8hY5KCae3yN40RxFmSw+8++ELK+SsOWxilUibpthsIrooTeUYfA87vA1DIptw==';
    
    let data = 
        {
        "Inputs": 
            {
             "input1":
             [
                {
                    'Text on Action': (req.query.alActionName || req.body.alActionName)
                }
             ],
            },
            "GlobalParameters": {}
         }
    
    const reqOptions = 
    {
         uri: uri,
         method: "POST",
         headers: 
         {
             "Content-Type": "application/json",
             "Authorization": "Bearer " + apiKey,
         },
         body: JSON.stringify(data)
    }
    
    request(reqOptions, function (error, response, body) 
    {
        if (error !== undefined && error !== null) 
        {
            context.res = 
            {
                status: 400,
                body: 'Failed to read the content. Error: ' + error
            }
            return;
        }
        if (response.statusCode !== 200) 
        {
            context.res = 
            {
                status: response.statusCode,
                body: 'Failed to read the content. Status code ' + response.statusCode + ' and body: ' + body
            };
            return;
        }

        let jsonObject = JSON.parse(body);

        let alActionImage =  jsonObject.Results.output1[0]["Scored Labels"];
        context.res = 
        {
            status: response.statusCode,
            body: alActionImage
        };
        context.done();

    })    
}
