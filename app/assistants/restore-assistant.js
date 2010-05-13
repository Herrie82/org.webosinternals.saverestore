function RestoreAssistant() {
    this.boundFunctions = new Array();
    this.boundFunctions['restoreApps'] = this.restoreApps.bindAsEventListener(this);
    this.processAppsList = [];
    this.toggleOn = true;

    // we'll need this for the subscription based services
    this.subscription = false;

    // setup menu
    this.menuModel = {
	visible: true,
	items:
	[
    {
	label: $L("Preferences"),
	command: 'do-prefs'
    },
    {
	label: $L("Help"),
	command: 'do-help'
    }
	 ]
    };
    
}

RestoreAssistant.prototype.setup = function() {

    this.titleElement = this.controller.get('listTitle');
    this.titleElement.innerHTML = $L("Restore Application Data");

    // setup menu
    this.controller.setupWidget(Mojo.Menu.appMenu, { omitDefaultItems: true }, this.menuModel);

    // initialize our list
    this.appListAttr = { itemTemplate: "app-list/row-template-toggle" };//, dividerTemplate: "media-list/divider", dividerFunction: this.boundFunctions['dividerFunc']
    this.appListModel = { items: [] };
    this.controller.setupWidget( "appList", this.appListAttr, this.appListModel );
    this.controller.setupWidget( "appToggleButton", { modelProperty: 'checked', trueLabel: 'on', falseLabel: 'off' } );
	
    // new buttons
    this.buttonsAttributes = { spacerHeight: 50, menuClass: 'no-fade' };
    this.buttonsModel = {
	visible: true,
	items: [
    { },
    { label: "Select All", command: "toggleChecked" },
    { label: "Restore Selected", command: "doRestore" },
    { }
		]
    }
    this.controller.setupWidget( Mojo.Menu.commandMenu, this.buttonsAttributes, this.buttonsModel );

    // load up
    this.loadList();
};

RestoreAssistant.prototype.loadList = function() {
    this.appListModel.items = [];
    var apps = appDB.appsSaved;
    var position = 0;
    for (var i = 0; i < apps.length; i++) {
	var app = appDB.appsInformation[apps[i]];
	var timestamp = "No archives available";
	if (app.timestamp) {
	    timestamp = Mojo.Format.formatDate(ISO8601Parse(app.timestamp),"long");
	}
	var summary = "";
	if (app.note) {
	    summary = app.note;
	}
	this.appListModel.items.push( { appname: app.title, appid: app.id, timestamp: timestamp, summary: summary, checked: false, position: position } );
	position += 1;
    }
    this.controller.modelChanged( this.appListModel );
};

RestoreAssistant.prototype.restoreApps = function(event) {
    this.buttonsModel.items[2].label = "Restoring ...";
    this.controller.modelChanged( this.buttonsModel );

    for (var i = 0; i < this.appListModel.items.length; i++) {
	var thisobj = this.appListModel.items[i];
	if (thisobj.checked) this.processAppsList.push( thisobj );
    }
	
    this.processApps();
};

RestoreAssistant.prototype.processApps = function() {
    if (this.processAppsList.length < 1) {
	this.buttonsModel.items[1].label = "Select All";
	this.buttonsModel.items[2].label = "Restore Selected";
	this.controller.modelChanged( this.buttonsModel );
	this.toggleOn = true;
	return;
    }
    var item = this.processAppsList.shift();
    this.controller.get('appList').mojo.revealItem(item.position, true);
    // Mojo.Log.info( "Restoring " + item.appid );
    appDB.reload = true;
    this.subscription = SaveRestoreService.restore( this.processCallback.bindAsEventListener(this, item), item.appid );
};

RestoreAssistant.prototype.processCallback = function(e, item) {
    if (e.returnValue == true) {
	if (e.stdOut && e.stdOut.length > 0) {
	    item.timestamp = Mojo.Format.formatDate(ISO8601Parse(e.stdOut.shift()),"long");
	    item.summary = e.stdOut.join("\n");
	}
	item.checked = false;
    }
    else {
	if (e.stdErr && e.stdErr.length > 0) {
	    item.timestamp = Mojo.Format.formatDate(ISO8601Parse(e.stdErr.shift()),"long");
	    item.summary = e.stdErr.join("\n");
	}
	item.timestamp = "Archive not restored";
    }
    this.controller.get('appList').mojo.invalidateItems(item.position, 1);
    this.processApps();
};

RestoreAssistant.prototype.handleCommand = function (event) {

    if (event.type === Mojo.Event.command) {
	switch (event.command) {
	case 'toggleChecked': {
            // Mojo.Log.info( "toggling" );
			
	    // move to the top of the list 
	    this.controller.get('appList').mojo.revealItem(0, true);

	    // loop the items
	    for (var i = 0; i < this.appListModel.items.length; i++) {
		var thisobj = this.appListModel.items[i];
		thisobj.checked = this.toggleOn;
	    }
	    this.controller.modelChanged( this.appListModel );
			
	    // switch it up
	    this.buttonsModel.items[1].label = this.toggleOn ? "Select None" : "Select All";
	    // Mojo.Log.info( "label: " + this.buttonsModel.items[1].label );
	    this.controller.modelChanged( this.buttonsModel );
	    this.toggleOn = !this.toggleOn;
	    break;
        }
	case 'doRestore': {
            // Mojo.Log.info( "restoring" );
	    this.restoreApps();
	    break;
        }
	case 'do-prefs': {
	    this.controller.stageController.pushScene('preferences');
	    break;
	}
	case 'do-help': {
	    this.controller.stageController.pushScene('help');
	    break;
	}
	default:
	break;
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
    // cancel the last subscription, this may not be needed
    if (this.subscription) {
	this.subscription.cancel();
    }
};
