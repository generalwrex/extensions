const extension = module.exports = {

    //---------------------------------------------------------------------
    // Editor Extension Name
    //
    // This is the name of the editor extension displayed in the editor.
    //---------------------------------------------------------------------

    name: "Server Assigned Prefixes",

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
            <label class="label">Server Assigned Prefixes</label>
            <p><br>Created By ${extension.authors.join(', ')}<br></p>
            <a onclick="require('child_process').execSync('start https://www.patreon.com/bePatron?u=8722862')">Like this? Join Patreon!</a><br><br>		      

            Servers With Custom Prefixes!: <p id="amount">0</p>

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
            const fs = require('fs'),
                path = require('path');

            const settings = require(path.join(__dirname, "../data", "settings.json"))
            const events = require(path.join(__dirname, "../data", "events.json"))
            const defaultTag = settings && settings.tag;

            const filePath = path.join(__dirname, "../data", extension.datafile);

            if(fs.existsSync(filePath)){

                let amount = 0;
                let prefixes = {}

                if(events.find(ev=> ev &&  ev._id === "serverprefixes")) return alert('You must remove the Event "Load Server Prefixes" to use this extension. Then Restart DBM.');

                try {
                    prefixes = JSON.parse(fs.readFileSync(filePath, "utf8"));	
                } catch (error) {
                    alert(`Could not parse serverPrefixes.json\n\nCheck\n${filePath}\nfor any errors\n  If the issue can't be resolved then, replace all text within the file with with {}`)     
                }

                try {
                    for (const server in prefixes) {
                        if(String(prefixes[server]) !== defaultTag) amount+=1;
                    }
                    document.getElementById('amount').innerHTML = amount;
                } catch (error) {
                    alert(error);
                }
                	
            }
    
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

        const {
            Files,
            Actions,
            Bot
        } = DBM;
        
        try {
            const fs = require('fs'),
            path = require('path');

            const filePath = path.join(__dirname, "../data", extension.datafile);

            Bot.prefixes = {};                   
            Bot.checkPrefixes = function(msg){
                try {
                    let tag = Files.data.settings.tag;
                    let guild = msg && msg.guild ? msg.guild : false; 
                    let content = msg.content;

                    if(guild){    

                        this.prefixes[guild.id] = tag;

                        if(fs.existsSync(filePath)){
                            const prefixes = fs.readFileSync(filePath, "utf8");
                            try {
                                this.prefixes = JSON.parse(prefixes);		
                            } catch(err){}			
                        }else{
                            
                            fs.writeFileSync(filePath, JSON.stringify(this.prefixes));
                        }   

                        tag = this.prefixes[guild.id];
                        guild.tag = tag;  // set it to msg.guild.tag or server.tag          
                             
                    }
            
                    if(content.startsWith(tag)) {	 

                        const separator = Files.data.settings.separator || '\\s+';
                        content = content.split(new RegExp(separator))[0];	

                         let command = content.substring(tag.length);
                        if(command) {       
                            if(!this._caseSensitive) {
                                command = command.toLowerCase();
                            }
                            const cmd = this.$cmds[command];
                            if(cmd) {					
                               Actions.preformActions(msg, cmd);
                               return true;
                            }
                        }				
                    }
                                            		
                } catch (e) {
                    console.error(e);
                }
                return false;
            }

            // need to overwrite the function, cant call the original
            Bot.checkCommand = function(msg) {
                let command = this.checkTag(msg.content);

                if(this.checkPrefixes(msg)) return true;

                if(command) {
                    if(!this._caseSensitive) {
                        command = command.toLowerCase();
                    }
                    const cmd = this.$cmds[command];
                    if(cmd) {
                        Actions.preformActions(msg, cmd);
                        return true;
                    }        
                }
                return false;
            };

            console.log(`${extension.name} Extension Loaded!`);
        } catch (error) {
            console.error(`${extension.name} Extension Error:\n${error}`)
        }
        
    }
   
}; // End of module
