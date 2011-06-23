function ListAssistant() {
    this.boundFunctions = new Array();

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

ListAssistant.prototype.setup = function() {

    this.titleElement = this.controller.get('listTitle');
    this.titleElement.innerHTML = $L("Supported Applications");

    // setup menu
    this.controller.setupWidget(Mojo.Menu.appMenu, { omitDefaultItems: true }, this.menuModel);

    // initialize our list
    this.appListAttr = { itemTemplate: "app-list/row-template" };//, dividerTemplate: "app-list/divider", dividerFunction: this.boundFunctions['dividerFunc']
    this.appListModel = { items: [] };
    this.controller.setupWidget( "appList", this.appListAttr, this.appListModel );
	
    // Add back button functionality for the TouchPad
    this.backElement = this.controller.get('listTitle');
    this.backTapHandler = this.backTap.bindAsEventListener(this);
    this.controller.listen(this.backElement, Mojo.Event.tap, this.backTapHandler);

    // load up
    this.loadList();
};

ListAssistant.prototype.loadList = function() {
    var apps = appDB.appsWithScripts;
    for (var i = 0; i < apps.length; i++) {
	var app = appDB.appsInformation[apps[i]];
	this.appListModel.items.push( { appname: app.title, appid: app.id, summary: app.note, checked: true } );
    }
    this.controller.modelChanged( this.appListModel );
};

ListAssistant.prototype.backTap = function(event)
{
    if (Mojo.Environment.DeviceInfo.modelNameAscii == 'TouchPad') {
	this.controller.stageController.popScene();
    }
};

ListAssistant.prototype.handleCommand = function (event) {

    if (event.type === Mojo.Event.command) {
	switch (event.command) {
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

ListAssistant.prototype.activate = function(event) {
    /* put in event handlers here that should only be in effect when this scene is active. For
       example, key handlers that are observing the document */
};

ListAssistant.prototype.deactivate = function(event) {
    /* remove any event handlers you added in activate and do any other cleanup that should happen before
       this scene is popped or another scene is pushed on top */
};

ListAssistant.prototype.cleanup = function(event) {
    /* this function should do any cleanup needed before the scene is destroyed as 
       a result of being popped off the scene stack */
    this.controller.stopListening(this.backElement, Mojo.Event.tap, this.backTapHandler);
};
