function RestoreAssistant() {
    this.boundFunctions = new Array();
    this.boundFunctions['restoreApps'] = this.restoreApps.bindAsEventListener(this);
    this.boundFunctions['processCallback'] = 
    this.processAppsList = [];
    this.toggleOn = false;
}

RestoreAssistant.prototype.setup = function() {
    // initialize our list
    this.appListAttr = { itemTemplate: "app-list/row-template-toggle" };//, dividerTemplate: "media-list/divider", dividerFunction: this.boundFunctions['dividerFunc']
    this.appListModel = { items: [] };
    this.controller.setupWidget( "appList", this.appListAttr, this.appListModel );
    this.controller.setupWidget( "appToggleButton", { modelProperty: 'checked', trueLabel: 'on', falseLabel: 'off' } );
	
    // button
    //this.controller.setupWidget( "actionButton", {}, { label: "Restore Data", buttonClass: 'affirmative' } );
    //Mojo.Event.listen( this.controller.get("actionButton"), Mojo.Event.tap, this.boundFunctions['restoreApps'] );
	
    // new buttons
    this.buttonsAttributes = { spacerHeight: 50, menuClass: 'no-fade' };
    this.buttonsModel = {
	visible: true,
	items: [
    { label: "Select None", command: "toggleChecked" },
    { label: "Restore Selected", command: "doRestore" }
		]
    }
    this.controller.setupWidget( Mojo.Menu.commandMenu, this.buttonsAttributes, this.buttonsModel );

    // load up
    this.loadList();
};

RestoreAssistant.prototype.loadList = function() {
    var apps = appDB.appsSaved;
    for (var i = 0; i < apps.length; i++) {
	var app = appDB.appsInformation[apps[i]];
	this.appListModel.items.push( { appname: app.title, appid: app.id, timestamp: Mojo.Format.formatDate(ISO8601Parse(app.timestamp),"long"), summary: app.note, checked: true } );
    }
    this.controller.modelChanged( this.appListModel );
};

RestoreAssistant.prototype.restoreApps = function(event) {
    for (var i = 0; i < this.appListModel.items.length; i++) {
	var thisobj = this.appListModel.items[i];
	if (thisobj.checked) this.processAppsList.push( thisobj );
    }
	
    this.processApps();
};

RestoreAssistant.prototype.processApps = function() {
    if (this.processAppsList.length < 1) {
	this.buttonsModel.items[0].label = "Select All";
	this.controller.modelChanged( this.buttonsModel );
	this.toggleOn = true;
	return;
    }
    var item = this.processAppsList.shift();
    Mojo.Log.info( "Restoring " + item.appid );
    SaveRestoreService.restore( this.processCallback.bindAsEventListener(this, item), item.appid );
};

RestoreAssistant.prototype.processCallback = function(e, item) {
    if (e.returnValue == true) {
	if (e.output && e.output.length > 0) {
	    item.summary = e.output.join("\n");
	}
	item.checked = false;
	this.controller.modelChanged( this.appListModel );
	this.processApps();
    }
    else dumpObject(e);
};

RestoreAssistant.prototype.handleCommand = function (event) {

    if (event.type === Mojo.Event.command) {
        if (event.command == 'toggleChecked') {
            Mojo.Log.info( "toggling" );
			
	    // loop the items
	    for (var i = 0; i < this.appListModel.items.length; i++) {
		var thisobj = this.appListModel.items[i];
		thisobj.checked = this.toggleOn;
	    }
	    this.controller.modelChanged( this.appListModel );
			
	    // switch it up
	    this.buttonsModel.items[0].label = this.toggleOn ? "Select None" : "Select All";
	    Mojo.Log.info( "label: " + this.buttonsModel.items[0].label );
	    this.controller.modelChanged( this.buttonsModel );
	    this.toggleOn = !this.toggleOn;
        }
	else if (event.command == 'doRestore') {
            Mojo.Log.info( "restoring" );
	    this.restoreApps();
        }
    }
};

RestoreAssistant.prototype.activate = function(event) {
    /* put in event handlers here that should only be in effect when this scene is active. For
       example, key handlers that are observing the document */
};

RestoreAssistant.prototype.deactivate = function(event) {
    /* remove any event handlers you added in activate and do any other cleanup that should happen before
       this scene is popped or another scene is pushed on top */
};

RestoreAssistant.prototype.cleanup = function(event) {
    /* this function should do any cleanup needed before the scene is destroyed as 
       a result of being popped off the scene stack */
};
