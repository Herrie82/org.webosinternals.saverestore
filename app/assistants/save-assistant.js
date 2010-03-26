function SaveAssistant() {
	this.boundFunctions = new Array();
	//this.boundFunctions['getList'] = this.getList.bind(this);
	this.boundFunctions['saveApps'] = this.saveApps.bindAsEventListener(this);
	this.boundFunctions['processCallback'] = this.processCallback.bind(this);
	this.processAppsList = [];
	this.toggleOn = false;
}

SaveAssistant.prototype.setup = function() {
	// initialize our list
	this.appListAttr = { itemTemplate: "app-list/row-template-toggle" };//, dividerTemplate: "media-list/divider", dividerFunction: this.boundFunctions['dividerFunc']
	this.appListModel = { items: [] };
	this.controller.setupWidget( "appList", this.appListAttr, this.appListModel );
	this.controller.setupWidget( "appToggleButton", { modelProperty: 'checked', trueLabel: 'on', falseLabel: 'off' } );
	
	// button
	//this.controller.setupWidget( "actionButton", {}, { label: "Save Data", buttonClass: 'affirmative' } );
	//Mojo.Event.listen( this.controller.get("actionButton"), Mojo.Event.tap, this.boundFunctions['saveApps'] );
	
	// new buttons
	this.buttonsAttributes = { spacerHeight: 50, menuClass: 'no-fade' };
	this.buttonsModel = {
	  visible: true,
	  items: [
			   { label: "Select None", command: "toggleChecked" },
			   { label: "Save Selected", command: "doSave" }
	  ]
	}
	this.controller.setupWidget( Mojo.Menu.commandMenu, this.buttonsAttributes, this.buttonsModel );


	// load up
	//SaveRestoreService.list(this.boundFunctions['getList']);
	this.loadList();
};

/*
SaveAssistant.prototype.getList = function(data) {
	if( data.returnValue == true ){
		var apps = data.scripts;
		Mojo.Log.info( "We got back " + apps.length + " apps" );
		for( var i = 0; i < apps.length; i++ ){
			var app = apps[i];
			this.appListModel.items.push( { appname: app.name, appid: app.id, checked: true } );
		}
		this.controller.modelChanged( this.appListModel );
	}else{
		Mojo.Log.error( "list returned error!" );
		dumpObject(data);
	}
};
*/

SaveAssistant.prototype.loadList = function() {
	var apps = appDB.appsAvailable;
	for( var i = 0; i < apps.length; i++ ){
		var app = appDB.appsInformation[apps[i]];
		this.appListModel.items.push( { appname: app.title, appid: app.id, checked: true } );
	}
	this.controller.modelChanged( this.appListModel );
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

SaveAssistant.prototype.handleCommand = function (event) {

	if (event.type === Mojo.Event.command){
        if( event.command == 'toggleChecked' ){
            Mojo.Log.info( "toggling" );
			
			// loop the items
			for( var i = 0; i < this.appListModel.items.length; i++ ){
				var thisobj = this.appListModel.items[i];
				thisobj.checked = this.toggleOn;
			}
			this.controller.modelChanged( this.appListModel );
			
			// switch it up
			this.buttonsModel.items[0].label = this.toggleOn ? "Select None" : "Select All";
			Mojo.Log.info( "label: " + this.buttonsModel.items[0].label );
			this.controller.modelChanged( this.buttonsModel );
			this.toggleOn = !this.toggleOn;
        }else if( event.command == 'doSave' ){
            Mojo.Log.info( "saving" );
			this.saveApps();
        }
	}
}

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
