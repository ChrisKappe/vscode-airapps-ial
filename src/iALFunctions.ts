import * as vscode from 'vscode';
import { TextEditor, window } from "vscode";

export function getimage ()
{
    /*
    // Step 1 is to grab the selected text, this should be name or caption of button
    
    let editor = window.activeTextEditor;
    let oldSelection = editor.selection;

    if (editor.selection.start.isEqual(editor.selection.end)) {
        window.showErrorMessage('Select something');
        return;
    }
    let alActionName = editor.document.getText(oldSelection);
    */

    // Step 1 is to ask user for the name or english caption of action 
    //TODO : find action name automatically

    window.showInputBox({prompt: 'What is the name of your button? '})
    .then(alActionName => {
        if (alActionName === undefined) {
            return;
        }
    
    //console.log(alActionName);
    let request = require('request');

    const uri = 'https://europewest.services.azureml.net/subscriptions/d0e75c3ca34a455b9d44667cd10c9756/services/350d7fdaa6984a18a05de3e8ad4df5ba/execute?api-version=2.0&format=swagger';
    const apiKey = 'Hep3sjO/ec3mOdeCGbQE6p2PaLUsZL6OpgTp3YEJIcMtomkzu7bMCUt6LxzT73ixW6YPNmjwCXOaVQ7VeJiq8g==';
    
    let data = {
        "Inputs": {
            "input1":
            [
                {
                    'Text on Action': alActionName
                }
            ],
        },
        "GlobalParameters": {}
    }
    
    const reqOptions = {
        uri: uri,
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + apiKey,
        },
        body: JSON.stringify(data)
    }
    
    request(reqOptions, function (error, response, body) {
        if (error !== undefined && error !== null) {
            window.showErrorMessage('Failed to read the content. Error: ' + error);
            return;
        }
        if (response.statusCode !== 200) {
            window.showErrorMessage('Failed to read the content. Status code ' + response.statusCode + ' and body: ' + body);
            return;
        }

        let jsonObject = JSON.parse(body);

        let alActionImage =  jsonObject.Results.output1[0]["Scored Labels"];

        window.activeTextEditor.edit(editBuilder => {
            editBuilder.insert(window.activeTextEditor.selection.active,'"' + alActionImage + '";\n'); //TODO change alActionName => alImageName
        });
   
    });
    });
}
