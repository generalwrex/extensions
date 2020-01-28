const path = require('path');

module.exports = {

	//---------------------------------------------------------------------
	// Editor Extension Name
	//
	// This is the name of the editor extension displayed in the editor.
	//---------------------------------------------------------------------
	
	name: "Rich Presence Extension",
	
	//---------------------------------------------------------------------
	// Is Command Extension
	//
	// Must be true to appear in "command" context menu.
	// This means each "command" will hold its own copy of this data.
	//---------------------------------------------------------------------
	
	isCommandExtension: false,
	
	//---------------------------------------------------------------------
	// Is Event Extension
	//
	// Must be true to appear in "event" context menu.
	// This means each "event" will hold its own copy of this data.
	//---------------------------------------------------------------------
	
	isEventExtension: false,
	
	//---------------------------------------------------------------------
	// Is Editor Extension
	//
	// Must be true to appear in the main editor context menu.
	// This means there will only be one copy of this data per project.
	//---------------------------------------------------------------------
	
	isEditorExtension: true,
	
	//---------------------------------------------------------------------
	// Extension Fields
	//
	// These are the fields for the extension. These fields are customized
	// by creating elements with corresponding IDs in the HTML. These
	// are also the names of the fields stored in the command's/event's JSON data.
	//---------------------------------------------------------------------
	
	fields: [],
	
	//---------------------------------------------------------------------
	// Default Fields
	//
	// The default values of the fields.
	//---------------------------------------------------------------------
	
	defaultFields: {
	},
	
	//---------------------------------------------------------------------
	// Extension Dialog Size
	//
	// Returns the size of the extension dialog.
	//---------------------------------------------------------------------
	
	size: function() {
		return { width: 500, height: 500 };
	},
	
	//---------------------------------------------------------------------
	// Extension HTML
	//
	// This function returns a string containing the HTML used for
	// the context menu dialog.
	//---------------------------------------------------------------------
	
	html: function(data) {
		return `
		<div style="padding: 10px 10px 10px 10px; width: 100vw;">
      <div class="left image" style="margin: 15px; text-align: center;">
        <img class="ui middle aligned circular image" src="${require('path').join(__dirname, 'rich_presence_extension')}/images/network-logo.gif" width="32">
        <label class="label" style="font-size: 20px; color: inherit">DBM Network Rich Presence Extension</label> 
      </div>    
      
      <div class="ui fluid" style="margin-top: 5px; margin-bottom: 3px;">
        <label class="label" style="font-size: 17px; color: inherit">Details about the project:</label><br>
        <div class="ui fluid action input" style="margin-bottom: 5px;">
          <input type="text" placeholder="${data.details}">
          <button class="ui grey icon button">
            Submit
          </button>
        </div>
        <div style="margin-bottom: 8px;">
          <p> This is sample text of the various options that will be available if any
        </div>
      </div>

      <div class="ui fluid" style="margin-top: 5px; margin-bottom: 3px;">
        <label class="label" style="font-size: 17px; color: inherit">State of the project</label>
        <div class="ui fluid action input" style="margin-bottom: 5px;">
          <input type="text" placeholder="${data.state}">
          <button class="ui grey icon button">
            Submit
          </button>
        </div>
        <div style="margin-bottom: 8px;">
          <p> This is sample text of the various options that will be available if any
        </div>
      </div>

      <div class="ui fluid" style="margin-top: 5px; margin-bottom: 3px;">
        <label class="label" style="font-size: 17px; color: inherit">Large image caption text</label>
        <div class="ui fluid action input" style="margin-bottom: 5px;">
          <input type="text" placeholder="${data.largeImageText}">
          <button class="ui grey icon button">
            Submit
          </button>
        </div>
        <div style="margin-bottom: 8px;">
          <p> This is sample text of the various options that will be available if any
        </div>
      </div>

      <div class="ui fluid" style="margin-top: 5px; margin-bottom: 3px;">
        <label class="label" style="font-size: 17px; color: inherit">Small image caption text</label>
        <div class="ui fluid action input" style="margin-bottom: 5px;">
          <input type="text" placeholder="${data.smallImageText}">
          <button class="ui grey icon button">
            Submit
          </button>
        </div>
        <div style="margin-bottom: 8px;">
          <p> This is sample text of the various options that will be available if any
        </div>
      </div>
    </div>`
	},
	
	//---------------------------------------------------------------------
	// Extension Dialog Init Code
	//
	// When the HTML is first applied to the extension dialog, this code
	// is also run. This helps add modifications or setup reactionary
	// functions for the DOM elements.
	//---------------------------------------------------------------------
	
	init: function() {
	},
	
	//---------------------------------------------------------------------
	// Extension Dialog Close Code
	//
	// When the dialog is closed, this is called. Use it to save the data.
	//---------------------------------------------------------------------
	
	close: function(document, data) {
	},
	
	//---------------------------------------------------------------------
	// Extension On Load
	//
	// If an extension has a function for "load", it will be called
	// whenever the editor loads data.
	//
	// The "DBM" parameter is the global variable. Store loaded data within it.
	//---------------------------------------------------------------------
	
	load: function(DBM, projectLoc) {
	  DBM.DBM_Network = DBM.DBM_Network || {}
	  DBM.DBM_Network.RichPresence_Extension = {}
	  const RP = {}
	
	  const DiscordRPC = RP.DiscordRPC = require('discord-rpc');
	
	  const rpc = RP.rpc = new DiscordRPC.Client({ transport: 'ipc' });
	  RP.startTimestamp = new Date();
	
	  const options = {
		details: "Project: " + DBM._currentProject.substring(DBM._currentProject.lastIndexOf('\\') + 1),
		state: 'Editing ' + DBM.currentSection,
		startTimestamp: RP.startTimestamp,
		largeImageKey: 'dbm',
		largeImageText: 'DBM',
		smallImageKey: 'dbm',
		smallImageText: 'DBM',
		instance: false,
	  }
	
		
		try {
	
		rpc.once('ready', () => {

		  rpc.setActivity(options);
			// overwrite the shit, but not to early as it breaks rich presence

			//overwrite the command click function, update RPC, call original
			DBM.DBM_Network.RichPresence_Extension.onCommandClick = DBM.onCommandClick;
			DBM.onCommandClick = function(index) {
				
				try {
					options.partyId = "DBM";
					options.partyMax = require(path.join(projectLoc,'data','commands.json')).length - 1
					options.partySize = index
					rpc.setActivity(options);
				} catch (err) {
					require("fs").appendFileSync(require('path').join(projectLoc, 'extensions', 'rich_presence_extension', 'errors.txt'), err + "\n\r")
				}

				DBM.DBM_Network.RichPresence_Extension.onCommandClick.apply(this, arguments);
			}

					//overwrite the command click function, update RPC, call original
			DBM.DBM_Network.RichPresence_Extension.eonCommandClick = DBM.eonCommandClick;
			DBM.eonCommandClick = function(index) {
				
				try {
					options.partyId = "DBM";
					options.partyMax = require(path.join(projectLoc,'data','events.json')).length - 1
					options.partySize = index
					rpc.setActivity(options);
				} catch (err) {
					require("fs").appendFileSync(require('path').join(projectLoc, 'extensions', 'rich_presence_extension', 'errors.txt'), err + "\n\r")
				}

				DBM.DBM_Network.RichPresence_Extension.eonCommandClick.apply(this, arguments);
			}

		});
		
		rpc.login({clientId:"482011505634574347"})
		  .catch(err =>require("fs").appendFileSync(path.join(projectLoc, 'extensions','rich_presence_extension','errors.txt'), err + "\n\r"));
	
	
		  DBM.DBM_Network.RichPresence_Extension = RP;
		} catch (err) {
			require("fs").appendFileSync(require('path').join(projectLoc, 'extensions','rich_presence_extension','errors.txt'), err + "\n\r")
		}

		//overwrite the shiftTabs function, update RPC, call original
		DBM.DBM_Network.RichPresence_Extension.shiftTabs = DBM.shiftTabs;
		DBM.shiftTabs = function(event, section, index) {
			
			try {
				delete options.partyId;
				delete options.partyMax; 
				delete options.partySize;
				options.state = 'Editing: ' + section;
				rpc.setActivity(options);
			} catch (err) {
				require("fs").appendFileSync(require('path').join(projectLoc, 'extensions', 'rich_presence_extension', 'errors.txt'), err + "\n\r")
			}

			DBM.DBM_Network.RichPresence_Extension.shiftTabs.apply(this, arguments);
		}

	},
	



	//---------------------------------------------------------------------
	// Extension On Save
	//
	// If an extension has a function for "save", it will be called
	// whenever the editor saves data.
	//
	// The "data" parameter contains all data. Use this to modify
	// the data that is saved. The properties correspond to the
	// data file names:
	//
	//  - data.commands
	//  - data.settings
	// etc...
	//---------------------------------------------------------------------
	
	save: function(DBM, data, projectLoc) {
 		const RP = DBM.DBM_Network.RichPresence_Extension;
		
		RP.rpc.setActivity({
			details: "Project: " + DBM._currentProject.substring(DBM._currentProject.lastIndexOf('\\') + 1),
			state: 'Editing: ' + DBM.currentSection,
			startTimestamp: RP.startTimestamp,
			largeImageKey: 'dbm',
			largeImageText: 'DBM',
			smallImageKey: 'dbm',
			smallImageText: 'DBM',
			instance: false,
		}).catch(err =>require("fs").appendFileSync(require('path').join(projectLoc, 'extensions', this.name,'errors.txt'), err + "\n\r"));  
	},
	
	//---------------------------------------------------------------------
	// Editor Extension Bot Mod
	//
	// Upon initialization of the bot, this code is run. Using the bots
	// DBM namespace, one can add/modify existing functions if necessary.
	// In order to reduce conflicts between mods, be sure to alias
	// functions you wish to overwrite.
	//
	// This is absolutely necessary for editor extensions since it
	// allows us to setup modifications for the necessary functions
	// we want to change.
	//
	// The client object can be retrieved from: `const bot = DBM.Bot.bot;`
	// Classes can be retrieved also using it: `const { Actions, Event } = DBM;`
	//---------------------------------------------------------------------
	
	mod: function(DBM) {
	
		// Let's make our own namespace like the chads we are.
		DBM.Test_Context = DBM.Test_Context || {};
	
		// Modify "Actions.preformActions" function without losing original code.
		DBM.Test_Context._Actions_preformActions = DBM.Actions.preformActions;
		DBM.Actions.preformActions = function(msg, cmd) {
	
			// Get "customData" from command or event.
			const customData = cmd.customData;
	
			// Get the data unique to this extension.
			const data = customData ? customData["Test Extension"] : null;
	
			// Do something with the data.
			// For example:
			//
			// if(data.input1 == 20) return; // do not run the command
	
			console.log(`Data for "${cmd.name}" command is: ${JSON.stringify(data)}`);
	
			// Call original function
			DBM.Test_Context._Actions_preformActions.apply(this, arguments);
		}
	
		console.log("Test Editor Extension registered!");
	}
	
	}; // End of module