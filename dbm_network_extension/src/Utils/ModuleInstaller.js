const path = require('path'),
    fs = require('fs'),
    child = require('child_process');

/**
 * @class ModuleInstaller
 */
class ModuleInstaller {

    /**
     * Construct the ModuleInstaller.
     * 
     * @param {string} extensionName - the name of the extension to install them too
     */
    constructor(extensionName){

        this.extensionName = extensionName;
        this.extensionPath = path.join(__dirname, this.extensionName)
        this.modules = [];
        this.maxInstallTries = 3;

    }

    /**
     * Checks if the module exists within the extensions data folder
     * 
     * @param {string} module - the module to check existence for
     */
    check(module){
        const modulePath = path.join(this.extensionPath, module)
        let module = this.modules.find(x => x.name == module);
        try {
			
			require.resolve(modulePath)
		
			if(!module){
				module = { name: moduleName, attempts:1, installed: true, errored: false  };	
				this.modules.push(module)	
			}
			
			return true;

		} catch (e) { return false;}
    }

    install(module){

    }

    uninstall(module){

    }
  
  }
  module.exports = ModuleInstaller;
  