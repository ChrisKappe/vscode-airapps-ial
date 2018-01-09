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
    .then(alActionName => 
    {
        if (alActionName === undefined) {
            return;
        }
    
        //console.log(alActionName);
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
                    'Text on Action': alActionName
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
                window.showErrorMessage('Failed to read the content. Error: ' + error);
                return;
            }
            if (response.statusCode !== 200) 
            {
                window.showErrorMessage('Failed to read the content. Status code ' + response.statusCode + ' and body: ' + body);
                return;
            }

            let jsonObject = JSON.parse(body);

            let alActionImage =  jsonObject.Results.output1[0]["Scored Labels"];

            window.activeTextEditor.edit(editBuilder => 
            {
                editBuilder.insert(window.activeTextEditor.selection.active,'"' + alActionImage + '";\n'); //TODO change alActionName => alImageName
            })
   
        })
    })
}
