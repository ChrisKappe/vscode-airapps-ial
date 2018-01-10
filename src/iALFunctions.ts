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

    window.showInputBox({prompt: 'What is the name of your action? '})
    .then(alActionName => 
    {
        if (alActionName === undefined) {
            return;
        }
    
        //console.log(alActionName);
        let request = require('request');

        const uri = "https://get-nav-actionimage.azurewebsites.net/api/HttpTriggerTS1?code=7Ch8YYjHchuECOms3rhC0gbFfHXWSzgqBLfuBrArW1laUr0Ng048iw=="+"&alActionName="+alActionName;
        
        const reqOptions = 
        {
            uri: uri,
            method: "POST",
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

            let alActionImage =  body;

            window.activeTextEditor.edit(editBuilder => 
            {
                editBuilder.insert(window.activeTextEditor.selection.active,alActionImage + ';\n'); 
            })
   
        })
    })
}
