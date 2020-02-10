

/**
 * Class Test Editor Extension

 * @class WrexMultipleBotOwners
 */
class WrexMultipleBotOwners {
	/**
	 *Creates an instance of WrexMultipleBotOwners
	 */
	constructor() {
	  // This is the name of the editor extension displayed in the editor.
	  this.name = 'Multiple Bot Owners',
  
	  // Must be true to appear in "command" context menu.
	  // This means each "command" will hold its own copy of this data.
	  this.isCommandExtension = false;
  
	  // Must be true to appear in "event" context menu.
	  // This means each "event" will hold its own copy of this data.
	  this.isEventExtension = false;
  
	  // Must be true to appear in the main editor context menu.
	  // This means there will only be one copy of this data per project.
	  this.isEditorExtension = true;
  
	  // These are the fields for the extension. These fields are customized
	  // by creating elements with corresponding IDs in the HTML. These
	  // are also the names of the fields stored in the command's/event's JSON data.
	  this.fields = ["currentowners"];
  
	  // The default values of the fields.
	  this.defaultFields = {
  
	  }
  
	  // these variables will be used by a custom installer (Optional, but nice to have)
	  this.authors = ["GeneralWrex", "Mitch"]
	  this.version = "1.0.0";
	  this.changeLog = "SHIT HTML FIXED";
	  this.shortDescription = "Overrides a bot.js method to allow multiple bot owners."
	  this.longDescription = "a longer extension if wanted(Optional)"
	  this.requiredNodeModules = [
		  //{name:"neededmodule", version: "latest"},
		  //{name:"metoo", version: "^2.4.2"},
		]
	  // these variables will be used by a custom installer
	}
  
	/**
	 * Extension Dialog Size
	 *
	 * @returns {*} The size of the extension dialog.
	 */
	size() {
	  return {
		width: 500,
		height: 500
	  };
	}
  
	/**
	 * Extension HTML
	 * 
	 * @param {*} data
	 * @returns {string} A string containing the HTML used for the context menu dialog.
	 */
	html(data) { 
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
	  
			  .currentowners {
				  max-height: 150px;
				  height: 150px;
				  overflow-y: scroll !important;
				  overflow-x: hidden;
			  }
	  
			  .container {
				  margin-left: 15% !important;
				  margin-right: 15% !important;
			  }
	  
			  .input {
				  width: 100% !important;
			  }
	  
			  label {
				  color: white !important;
			  }
		  </style>
		  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.8.0/css/bulma.min.css">
		  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.12.1/css/all.min.css">		  
		  <script src="https://kit.fontawesome.com/9f46650366.js" crossorigin="anonymous"></script>	  

		  <div class="container has-text-centered"> <label class="label">Current Owners</label>
			  <div class="currentowners" id="current-owners">

			  </div><label class="label">Add owners</label>
			  <div class="field has-addons"> <input id="ownerinput" class="input" type="text" placeholder="User ID">
				  <div class="control"> <a id="addowner" class="button is-info"> <i class="fas fa-plus"></i> </a> </div>
			  </div>
		  </div>			  
	  `
	}
  
	/**
	 * Extension Dialog Init Code
	 * 
	 * When the HTML is first applied to the extension dialog, this code
	 * is also run. This helps add modifications or setup reactionary
	 * functions for the DOM elements.
	 */
	init(document) {
		try {
			const fs = require('fs'), 
				path = require('path');

			const filepath = path.join(__dirname, "../data",'multiple_bot_owners.json');

			let botOwners = [];
			if (fs.existsSync(filepath)) {
				botOwners = JSON.parse(fs.readFileSync(filepath, "utf8"));
			}

			function delOwner(element){

				
			}

			function addOwner(owner){
				if(!owner) return;
				document.getElementById('current-owners').innerHTML += `
				<div class="field has-addons "> <input id="${owner}" class="input" type="text" placeholder="User ID" disabled 
				value="${owner}">
					<div class="control"> <a class="button is-info rem-owner"> <i class="fas fa-minus rem-owner"></i> </a> </div>
				</div>
				`;				
			}

			botOwners.forEach(owner=> { 
				if(owner && /^\d+$/.test(owner)) {
					addOwner(owner)
				}
			})
			
			document.addEventListener('click', function (event) {
				// If the clicked element doesn't have the right selector, bail
				const target = event.target;
				if (!target.className.includes('rem-owner')) return;
			
				// Don't follow the link
				event.preventDefault();
			
				//const owner = document.getElementById('ownerinput').value

			
			}, false);

	

			document.getElementById('addowner').onclick = function(e){
				const owner = document.getElementById('ownerinput').value

				if(!owner){
					return alert(`MultipleBotOwners\nYou must enter a value!`)
				}else if(!/^\d+$/.test(owner)){
					return alert(`MultipleBotOwners\nThe inputted value can only be a discord ID.\nYou put ${owner}.`)					
				}else if(botOwners.includes(owner)){
					return alert(`MultipleBotOwners\nThat ID already exists!.`)		
				}

				addOwner(owner);
				botOwners.push(owner);

				fs.writeFileSync(filepath, JSON.stringify(botOwners));

			}

		} catch (error) {
			alert("MultipleBotOwners Error: \n"+error)
		}

	}
  
	/**
	 * Extension Dialog Close Code
	 * 
	 * When the dialog is closed, this is called. Use it to save the data.
	 *
	 * @param {*} document
	 * @param {*} data
	 */
	close(document, data) {
	  //data.input1 = parseInt(document.getElementById("input1").value);
	  //data.input2 = parseInt(document.getElementById("input2").value);

		//let botOwners = [];

		//const filepath = path.join(projectLoc, 'data', 'multiple_bot_owners.json');
		//if (fs.existsSync(filepath)) {
		//	botOwners = fs.readFileSync(filepath).toString();
		//}
		//const data = JSON.parse(botOwners);

		//process.send("message","pizza");

	}
  

	  
	/**
	 * Editor Extension Bot Mod
	 *
	 * Upon initialization of the bot, this code is run. Using the bots
	 * DBM namespace, one can add/modify existing functions if necessary.
	 * In order to reduce conflicts between mods, be sure to alias  //hover over the word
	 * functions you wish to overwrite.
	 * 
	 * This is absolutely necessary for editor extensions since it
	 * allows us to setup modifications for the necessary functions
	 * we want to change.
	 * 
	 * The client object can be retrieved from: `const bot = DBM.Bot.bot;`
	 * Classes can be retrieved also using it: `const { Actions, Event } = DBM;`
	 * @param {*} DBM
	 */
	mod(DBM) {
		const { Actions } = DBM;
		
		const fs = require('fs'), 
		path = require('path');
	

		try {
			const filepath = path.join(__dirname, "../data",'multiple_bot_owners.json');

			const botOwners = [];
	
			if (!fs.existsSync(filepath)) {
				fs.writeFileSync(filepath, JSON.stringify(botOwners));
			}else{
				botOwners = JSON.parse(fs.readFileSync(filepath, "utf8"));
			}
	
			Actions.checkConditions = function(msg, cmd) {
				const isServer = Boolean(msg.guild && msg.member);
				const restriction = parseInt(cmd.restriction);
				const permissions = cmd.permissions;
				switch(restriction) {
					case 0:
						if(isServer) {
							return this.checkPermissions(msg, permissions);
						} else {
							return true;
						}
					case 1:
						return isServer && this.checkPermissions(msg, permissions);
					case 2:
						return isServer && msg.guild.owner === msg.member;
					case 3:
						return !isServer;
					case 4:
						return botOwners.length > 0 && botOwners.includes(msg.author.id) 
							|| Files.data.settings.ownerId && msg.author.id === Files.data.settings.ownerId;; 
					default:
						return true;
				}
			};
		} catch (error) {
			console.error("MultipleBotOwners_ERROR:\n"+error)
		}


		console.log('Multiple Bot Owners Extension Loaded!');
	}

		/** 
	 * Extension On Load
	 *
	 * If an extension has a function for "load", it will be called
	 * whenever the editor loads data.
	 *
	 * @param {*} DBM - The "DBM" parameter is the global variable. Store loaded data within it.
	 * @param {*} projectLoc  - contains the project directory path
	 
		load(DBM, projectLoc) {}
	  */
	  
	/**
	 * Extension On Save
	 *
	 * If an extension has a function for "save", it will be called
	 * whenever the editor saves data.
	 *
	 * The "data" parameter contains all data. Use this to modify
	 * the data that is saved. The properties correspond to the
	 * data file names:
	 *
	 *  - data.commands
	 *  - data.settings 
	 * etc...
	 * 
	 * @param {*} DBM
	 * @param {*} data
	 * @param {*} projectLoc
	 
		save(DBM, data, projectLoc) {}
	  */
  
  }
  
  module.exports = new WrexMultipleBotOwners();