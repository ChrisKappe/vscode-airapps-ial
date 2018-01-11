# AirApps iAL

Make your development in AL for Dynamics NAV and Dynamics365 "Tenerife" smarter. If you spend too much time selecting a picture for an action from a list of 1400+ standard images, then this extension is for you. 

Just type the name of you action, and iAL will propose best image for it using machine learning algorithms in less than 1 second!

[![Marketplace](https://vsmarketplacebadge.apphb.com/version-short/dkatson.vscode-airapps-ial.svg)](https://marketplace.visualstudio.com/items?itemName=dkatson.vscode-airapps-ial)
[![Installs](https://vsmarketplacebadge.apphb.com/installs/dkatson.vscode-airapps-ial.svg)](https://marketplace.visualstudio.com/items?itemName=dkatson.vscode-airapps-ial)
[![GitHub issues](https://img.shields.io/github/issues/dkatson/vscode-airapps-ial.svg)](https://github.com/dkatson/vscode-airapps-ial/issues)
[![GitHub pull requests](https://img.shields.io/github/issues-pr/dkatson/vscode-airapps-ial.svg)](https://github.com/dkatson/vscode-airapps-ial/pulls)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/dkatson/vscode-airapps-ial/master/LICENSE)

## Features

* Create Action on your page as normal (using *tAction* snippet for example)
* Add *Image* property
* Press `Cmd+Shift+P` on OSX or `Ctrl+Shift+P` on Windows
* Select `iAL: Get image for action`
* Type the purpose of your action (name or short description)
* Feel the magic!

![Get Image](images/iAL.getimage.gif)


## Requirements

* iAL extension is developed for AL developers, so you need [AL extension](https://marketplace.visualstudio.com/items?itemName=ms-dynamics-smb.al)

* Name of your action should be in English

> Tip: Azure ML model was trained on standard NAV2018W1 version. [Dataset](https://getbridgeapp.co/docs/msdynnavactions) includes 9000+ standard actions.
So to get better results - name your action according standard name guidelines. 


## Known Issues
* Support only English action name
* Images will be selected from NAV2018 version

## Future ideas

* Autodetect name of action
* Propose *Application Area* property
* Support other NAV versions


## Release Notes

Notes for the released versions

### 0.1.0

Initial release

**Enjoy!**