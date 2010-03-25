function SaveAssistant() {
	this.boundFunctions = new Array();
	this.boundFunctions['getList'] = this.getList.bind(this);
	this.boundFunctions['saveApps'] = this.saveApps.bindAsEventListener(this);
	this.boundFunctions['processCallback'] = this.processCallback.bind(this);
	this.processAppsList = [];
}

SaveAssistant.prototype.setup = function() {
	// initialize our list
	this.appListAttr = { itemTemplate: "app-list/row-template-checkboxes" };//, dividerTemplate: "media-list/divider", dividerFunction: this.boundFunctions['dividerFunc']
	this.appListModel = { items: [] };
	this.controller.setupWidget( "appList", this.appListAttr, this.appListModel );
	this.controller.setupWidget( "appCheckbox", { modelProperty: 'checked' } );
	
	// button
	this.controller.setupWidget( "actionButton", {}, { label: "Save Data", buttonClass: 'affirmative' } );
	Mojo.Event.listen( this.controller.get("actionButton"), Mojo.Event.tap, this.boundFunctions['saveApps'] );

	// load up
	SaveRestoreService.list(this.boundFunctions['getList']);
};

SaveAssistant.prototype.getList = function(data) {
	if( data.returnValue == true ){
		var apps = data.scripts;
		Mojo.Log.info( "We got back " + apps.length + " apps" );
		for( var i = 0; i < apps.length; i++ ){
			var app = apps[i];
			this.appListModel.items.push( { appname: app, appid: app, checked: false } );
		}
		this.controller.modelChanged( this.appListModel );
	}else{
		Mojo.Log.error( "list returned error!" );
		dumpObject(data);
	}
};

SaveAssistant.prototype.saveApps = function(event) {
	for( var i = 0; i < this.appListModel.items.length; i++ ){
		var thisobj = this.appListModel.items[i];
		if( thisobj.checked ) this.processAppsList.push( thisobj.appid );
	}
	
	this.processApps();
}

SaveAssistant.prototype.processApps = function() {
	if( this.processAppsList.length < 1 ) return;
	var appid = this.processAppsList.shift();
	Mojo.Log.info( "Saving " + appid );
	SaveRestoreService.save( this.boundFunctions['processCallback'], appid );
};

SaveAssistant.prototype.processCallback = function(e) {
	if( e.returnValue == true ) this.processApps();
	else dumpObject(e);
};

SaveAssistant.prototype.activate = function(event) {
	/* put in event handlers here that should only be in effect when this scene is active. For
	   example, key handlers that are observing the document */
};

SaveAssistant.prototype.deactivate = function(event) {
	/* remove any event handlers you added in activate and do any other cleanup that should happen before
	   this scene is popped or another scene is pushed on top */
};

SaveAssistant.prototype.cleanup = function(event) {
	/* this function should do any cleanup needed before the scene is destroyed as 
	   a result of being popped off the scene stack */
};
