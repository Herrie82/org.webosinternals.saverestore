function InstalledAssistant() {
	this.boundFunctions = new Array();
	//this.boundFunctions['getList'] = this.getList.bind(this);
}

InstalledAssistant.prototype.setup = function() {
	// initialize our list
	this.appListAttr = { itemTemplate: "app-list/row-template" };//, dividerTemplate: "app-list/divider", dividerFunction: this.boundFunctions['dividerFunc']
	this.appListModel = { items: [] };
	this.controller.setupWidget( "appList", this.appListAttr, this.appListModel );
	
	// load up
	//SaveRestoreService.listApps(this.boundFunctions['getList']);
	this.loadList();
};

/*
InstalledAssistant.prototype.getList = function(data) {
	if( data.apps ){
		var apps = data.apps;
		Mojo.Log.info( "We got back " + apps.length + " apps" );
		for( var i = 0; i < apps.length; i++ ){
			var app = apps[i];
			this.appListModel.items.push( { appname: app.title, appid: app.id } );
		}
		this.controller.modelChanged( this.appListModel );
	}else{
		Mojo.Log.error( "list returned error!" );
		dumpObject(data);
	}
};
*/

InstalledAssistant.prototype.loadList = function() {
	var apps = appDB.appsInstalled;
	for( var i = 0; i < apps.length; i++ ){
		var app = appDB.appsInformation[apps[i]];
		this.appListModel.items.push( { appname: app.title, appid: app.id, checked: true } );
	}
	this.controller.modelChanged( this.appListModel );
};

InstalledAssistant.prototype.activate = function(event) {
	/* put in event handlers here that should only be in effect when this scene is active. For
	   example, key handlers that are observing the document */
};

InstalledAssistant.prototype.deactivate = function(event) {
	/* remove any event handlers you added in activate and do any other cleanup that should happen before
	   this scene is popped or another scene is pushed on top */
};

InstalledAssistant.prototype.cleanup = function(event) {
	/* this function should do any cleanup needed before the scene is destroyed as 
	   a result of being popped off the scene stack */
};
