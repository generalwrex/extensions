/**
 * DBM Network Extension
 * (put your name if you contrib)
 * General Wrex
 * Deus Corvi
 * Created for the DBM Network and its users.
 * @class DBM_Network
 */
class DBM_Network {
	/**
	 *Creates an instance of DBM_MODS.
	 */
	constructor() {
	  // This is the name of the editor extension displayed in the editor.
	  this.name = 'DBM Network Extension',
  
		this.version = "0.1 Alpha";
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
	  this.fields = [];
  
	  this.path = require('path').join(__dirname, "dbm_network_extension"),
  
		// The default values of the fields.
		this.defaultFields = {
  
		}
	}
  
	/**
	 * Extension Dialog Size
	 *
	 * @returns {*} The size of the extension dialog.
	 */
	size() {
	  return {
		width: 800,
		height: 800
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
			<div style="padding: 10px 10px 10px 10px;">
			<div class="ui four column grid">
			  
			  <div class="row">
				  <div class="column"></div>
				  <div class="column"></div>
				  <div class="column"></div>
			  </div>
			  <div class="column"></div>
			  <div class="column"></div>
			  <div class="column"></div>
			  <div class="column"></div>
			  </div>
  
				<img class="ui fluid image" src="${this.path}/images/network-logo.gif">
			</div>`
	}
  
	/**
	 * Extension Dialog Init Code
	 * 
	 * When the HTML is first applied to the extension dialog, this code
	 * is also run. This helps add modifications or setup reactionary
	 * functions for the DOM elements.
	 */
	init() {
  
  
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
	}
  
  
	/** 
	 * Extension On Load
	 *
	 * If an extension has a function for "load", it will be called
	 * whenever the editor loads data.
	 *
	 * @param {*} DBM - The "DBM" parameter is the global variable. Store loaded data within it.
	 * @param {*} projectLoc  - contains the project directory path
	 */
	load(DBM, projectLoc) {
  
	  let txt = "{}";
	  const filepath = require('path').join(projectLoc, 'data', 'thisistest.json');
	  if (require('fs').existsSync(filepath)) {
		txt = require('fs').readFileSync(filepath).toString();
	  }
	  DBM.__myCustomData = JSON.parse(txt);
	}
  
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
	 */
  
	save(DBM, data, projectLoc) {
	  if (!DBM.__myCustomData) return;
	  if (!DBM.__myCustomData.number) DBM.__myCustomData.number = 0;
	  DBM.__myCustomData.number++;
	  data.thisistest = DBM.__myCustomData;
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
  
	  DBM.DBM_Network = DBM.DBM_Network || {};
  
	  // Modify "Actions.preformActions" function without losing original code.
	  DBM.DBM_Network.Default_Functions.preformActions = DBM.Actions.preformActions;
	  DBM.Actions.preformActions = (msg, cmd) => {
  
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
		DBM.DBM_Network.Default_Functions.preformActions.apply(this, arguments);
	  }
  
	  console.log("DBM Network Extension registered!");
	}
  
  }
  
  module.exports = new DBM_Network();