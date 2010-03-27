// our variable
var appDB;

// begin the "class"
function Applications( stage ){
	this.stage = stage;
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
	// load up the installed applications
	SaveRestoreService.listApps( this.loadApps.bind(this) );
	// load up the available applications
	SaveRestoreService.list( this.loadApps.bind(this) );
}

// shortcut
var Apps = Applications.prototype;

// handles returned apps from the server
Apps.loadApps = function( data ){
	
	if( data.apps ){
		var apps = data.apps;
		for( var i = 0; i < apps.length; i++ ){
			var app = apps[i];
			this.appsInstalled.push( app.id );
			// information from the device always trumps info from scripts
			this.appsInformation[app.id] = app;
		}
		// we loaded apps
		this.loadedApps = true;
	}else if( data.scripts ){
		var scripts = data.scripts;
		for( var i = 0; i < scripts.length; i++ ){
			var script = scripts[i];
			this.appsWithScripts.push( script.id );
			// check if we have save info for this script
			if( script.saved ) this.appsSaved.push( script.id );
			// store information in our array if we don't have it already
			if( !this.appsInformation[script.id] ) this.appsInformation[script.id] = script;
		}
		// we loaded scripts
		this.loadedScripts = true;
	}
	
	Mojo.Log.info( "loaded apps: " + this.loadedApps + "; loaded scripts: " + this.loadedScripts );

	if( this.loadedApps && this.loadedScripts ){
		// map which apps we actually CAN work with
		var installed = arrayToObject( this.appsInstalled );
		for( var i = 0; i < this.appsWithScripts.length; i++ ){
			var appid = this.appsWithScripts[i];
			if( appid in installed ) this.appsAvailable.push( appid );
		}
		
		// here's where we should probably push main
		this.stage.controller.pushScene("main");
	}
}