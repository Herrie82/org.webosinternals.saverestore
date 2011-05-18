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
	
    // we'll need this for the subscription based services
    this.subscription = false;

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
	
    // load up the installed applications
    if (this.subscription) this.subscription.cancel();
    this.subscription = SaveRestoreService.listApps( this.loadApps.bindAsEventListener(this, callback) );
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
	
    var final = false;

    if (data.apps) {
	var apps = data.apps;
	for (var i = 0; i < apps.length; i++) {
	    var app = apps[i];
	    this.appsInstalled.push( app.id );
	    // store information in our array if we don't have it already
	    if (!this.appsInformation[app.id]) this.appsInformation[app.id] = app;
	}

	if (!data.stage || (data.stage == "end")) {
	    // load up the available applications
	    if (this.subscription) this.subscription.cancel();
	    this.subscription = SaveRestoreService.list( this.loadApps.bindAsEventListener(this, callback) );
	}
    }
    else if (data.scripts) {
	var scripts = data.scripts;
	var installed = arrayToObject( this.appsInstalled );
	for (var i = 0; i < scripts.length; i++) {
	    var script = scripts[i];
	    this.appsWithScripts.push( script.id );
	    // check if we have save info for this script
	    if( script.saved ) this.appsSaved.push( script.id );
	    // information from the scripts has more fields
	    this.appsInformation[script.id] = script;
	    // push on appsAvailable
	    if (script.id in installed) this.appsAvailable.push( script.id );
	}

	if (!data.stage || (data.stage == "end")) {
	    // sort the list of supported apps
	    this.appsWithScripts.sort(this.sortApps);

	    // sort the list of saved apps
	    this.appsSaved.sort(this.sortApps);

	    // fully loaded
	    this.reload = false;

	    final = true;
	}
    }

    // Update the relevant screen
    if (callback) callback(final);
}