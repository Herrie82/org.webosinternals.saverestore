// begin the "class"
function Applications(){
    // all applications installed on device
    this.appsInstalled = [];
    // store the information for apps, by appid
    this.appsInformation = [];
    // all applications available from the service
    this.appsWithScripts = [];
    // all applications both installed and saveable
    this.appsAvailable = [];
    // all applications with saved data
    this.appsSaved = [];
	
    // load state placeholders - may want a better way
    this.loadedApps = this.loadedScripts = false;

    // do we need to reload?
    this.reload = false;
}

var appDB = new Applications();

// shortcut
var Apps = Applications.prototype;

Apps.initApps = function( callback ) {
    // all applications installed on device
    this.appsInstalled = ['com.palm.app.launcher'];
    // store the information for apps, by appid
    this.appsInformation = [];
    // all applications available from the service
    this.appsWithScripts = [];
    // all applications both installed and saveable
    this.appsAvailable = [];
    // all applications with saved data
    this.appsSaved = [];
	
    // load state placeholders - may want a better way
    this.loadedApps = this.loadedScripts = false;

    // load up the installed applications
    SaveRestoreService.listApps( this.loadApps.bindAsEventListener(this, callback) );
    // load up the available applications
    SaveRestoreService.list( this.loadApps.bindAsEventListener(this, callback) );
}

Apps.sortApps = function(a, b) {

    strA = appDB.appsInformation[a].title;
    strB = appDB.appsInformation[b].title;
    if (strA && strB) {
	strA = strA.toLowerCase();
	strB = strB.toLowerCase();
	return ((strA < strB) ? -1 : ((strA > strB) ? 1 : 0));
    }
    else {
	strA = appDB.appsInformation[a].id;
	strB = appDB.appsInformation[b].id;
	return ((strA < strB) ? -1 : ((strA > strB) ? 1 : 0));
    }
};

// handles returned apps from the server
Apps.loadApps = function( data, callback ) {
	
    if (data.apps) {
	var apps = data.apps;
	for (var i = 0; i < apps.length; i++) {
	    var app = apps[i];
	    this.appsInstalled.push( app.id );
	    // store information in our array if we don't have it already
	    if (!this.appsInformation[app.id]) this.appsInformation[app.id] = app;
	}
	// we loaded apps
	this.loadedApps = true;
    }
    else if (data.scripts) {
	var scripts = data.scripts;
	for (var i = 0; i < scripts.length; i++) {
	    var script = scripts[i];
	    this.appsWithScripts.push( script.id );
	    // check if we have save info for this script
	    if( script.saved ) this.appsSaved.push( script.id );
	    // information from the scripts has more fields
	    this.appsInformation[script.id] = script;
	}
	// we loaded scripts
	this.loadedScripts = true;

	// sort the list of supported apps
	this.appsWithScripts.sort(this.sortApps);

	// sort the list of saved apps
	this.appsSaved.sort(this.sortApps);
    }
	
    // Mojo.Log.info( "loaded apps: " + this.loadedApps + "; loaded scripts: " + this.loadedScripts );

    if (this.loadedApps && this.loadedScripts) {
	// map which apps we actually CAN work with
	var installed = arrayToObject( this.appsInstalled );
	for (var i = 0; i < this.appsWithScripts.length; i++) {
	    var appid = this.appsWithScripts[i];
	    if (appid in installed) this.appsAvailable.push( appid );
	}

	// fully loaded
	this.reload = false;

	// Update the relevant screen
	if (callback) callback();
    }
}