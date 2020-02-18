const path = require("path"),
	fs = require("fs");
/**
 * DBM Network Extension
 * (put your name if you contrib)
 * General Wrex
 * Danno3817
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
  
	  // these variables will be used by a custom installer (Optional, but nice to have)
	  this.authors = ["GeneralWrex", "Danno3817"]
	  this.version = "1.0.0";
	  this.changeLog = [{v:"1.0.0",desc:"Initial Version"}]
	  this.shortDescription = "Extension to make managing DBM Network Additions easy."
	  this.longDescription = ""
	  this.requiredNodeModules = [
		  {name:"simple-git", version: "latest"},
		  {name:"module-alias", version: "latest"},
		]
	  // these variables will be used by a custom installer	  

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
  
	  this.path = path.join(__dirname, "dbm_network_extension"),
  
		// The default values of the fields.
		this.defaultFields = {
  
		}
	}
  
	/**
	 * RequireEX - Require Extension
	 * 
	 * @param {*} module Requires the module from the extensions node modules folder.
	 */
	requireEX(module){
		return require(path.join(this.path, "node_modules", module ));
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
		<div style="overflow-y: scroll; overflow-x: hidden; width: 100%;">
			<center>
				<div style="margin: auto">
					<p style="color: #D47522; font-size: 45px; font-weight: 600; font-family: Arial, Helvetica, sans-serif;">DBM Modifications</p><br>
					<img src="${__dirname}/dbm_network_extension/images/network-logo.png" style="hight: 20px; margin-top: -55px;" alt=""><br><br>
					<p style="font-size: large">Manage DBM Mods, Events, and Extensions.<br>Join us today <a href="https://discordapp.com/invite/3QxkZPK">here</a>!</p><br>
					<button class="ui button" margin-top: -10px;">Install Modifications</button>
				</div>
			</center>
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
	}
  
  }
  
  module.exports = new DBM_Network();
