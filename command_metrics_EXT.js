const extension = module.exports = {

    //---------------------------------------------------------------------
    // Editor Extension Name
    //
    // This is the name of the editor extension displayed in the editor.
    //---------------------------------------------------------------------

    name: "Command Metrics",

    //---------------------------------------------------------------------
    // Is Command Extension
    //
    // Must be true to appear in "command" context menu.
    // This means each "command" will hold its own copy of this data.
    //---------------------------------------------------------------------

    isCommandExtension: true,

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

    defaultFields: {},

    // these variables will be used by a custom installer (Optional, but nice to have)
    authors: ["GeneralWrex"],
    version: "1.0.0",
    changeLog: "Initial Release",
    shortDescription: "Overrides a bot.js method to allow server prefixes.",
    longDescription: "",
    requiredNodeModules: [],
    datafile: 'serverPrefixes.json',

    //---------------------------------------------------------------------
    // Extension Dialog Size
    //
    // Returns the size of the extension dialog.
    //---------------------------------------------------------------------

    size: function() {
        return {
            width: 500,
            height: 500
        };
    },

    //---------------------------------------------------------------------
    // Extension HTML
    //
    // This function returns a string containing the HTML used for
    // the context menu dialog.
    //---------------------------------------------------------------------

    html: function(data) {

        return `
  			<style>
			  html,
			  body {
				  text-align: center;
				  height: 100%;
				  width: 100%;
				  background-color: #23272a;
			  }
	  
			  .input {
				  border-top-right-radius: 0px !important;
				  border-bottom-right-radius: 0px !important;
			  }
	  
  
			  .container {
				  margin-left: 15% !important;
				  margin-right: 15% !important;
			  }
	  
			  .input {
				  width: 100% !important;
			  }
	  
			  label, p {
				  color: white !important;
			  }
		  </style>
		  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.8.0/css/bulma.min.css">
		  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.12.1/css/all.min.css">		  
		  <script src="https://kit.fontawesome.com/9f46650366.js" crossorigin="anonymous"></script>	  

          <div class="container has-text-centered"> 
            <label class="label">Command Metrics</label>
            <p><br>Created By ${extension.authors.join(', ')}<br></p>
            <a onclick="require('child_process').execSync('start https://www.patreon.com/bePatron?u=8722862')">Like this? Join Patreon!</a><br><br>		      

          </div>	        
		  `
    },

    //---------------------------------------------------------------------
    // Extension Dialog Init Code
    //
    // When the HTML is first applied to the extension dialog, this code
    // is also run. This helps add modifications or setup reactionary
    // functions for the DOM elements.
    //---------------------------------------------------------------------

    init: function(document, data) {

        try {
       
        } catch (error) {
            alert(`${extension.name} Extension Error:\n${error}`)
        }

    },

    //---------------------------------------------------------------------
    // Extension Dialog Close Code
    //
    // When the dialog is closed, this is called. Use it to save the data.
    //---------------------------------------------------------------------

    close: function(document, data) {
    },

    //---------------------------------------------------------------------
    // Editor Extension Bot Mod
    //
    // Upon initialization of the bot, this code is run. Using the bot's
    // DBM namespace, one can add/modify existing functions if necessary.
    // In order to reduce conflictions between mods, be sure to alias
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

        return;
        
        const fs = require('fs'),
        path = require('path');

        const {
            Files,
            Actions,
            Bot
        } = DBM;
        
        const metrics = {};
        if (!fs.existsSync(filepath)) {
            fs.writeFileSync(filepath, JSON.stringify(botOwners));
        } else {
            botOwners = JSON.parse(fs.readFileSync(filepath, "utf8"));
        }

		// Let's make our own namespace like the chads we are.
		DBM.Command_Metrics = DBM.Command_Metrics || {};
	
		// Modify "Actions.preformActions" function without losing original code.
		DBM.Command_Metrics.preformActions = DBM.Actions.preformActions;
		DBM.Actions.preformActions = function(msg, cmd) {
	
            try {

                const filePath = path.join(__dirname, "../data", extension.datafile);

                if(cmd.comType !== "3"){


                    msg.guild.members.get(msg.author.id).setData('metrics', metrics)
                    console.log(com.name ,com.times)
                }
      
            } catch (error) {
                console.error(`${extension.name} Extension Error:\n${error}`)
            }

			// Call original function
			DBM.Command_Metrics.preformActions.apply(this, arguments);
		}
	
		console.log("Test Editor Extension registered!");
    }
   
}; // End of module
