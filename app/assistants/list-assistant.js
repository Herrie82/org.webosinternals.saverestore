function ListAssistant() {
    this.boundFunctions = new Array();
}

ListAssistant.prototype.setup = function() {
    // initialize our list
    this.appListAttr = { itemTemplate: "app-list/row-template" };//, dividerTemplate: "media-list/divider", dividerFunction: this.boundFunctions['dividerFunc']
    this.appListModel = { items: [] };
    this.controller.setupWidget( "appList", this.appListAttr, this.appListModel );
	
    // load up
    this.loadList();
};

ListAssistant.prototype.loadList = function() {
    var apps = appDB.appsWithScripts;
    for (var i = 0; i < apps.length; i++) {
	var app = appDB.appsInformation[apps[i]];
	this.appListModel.items.push( { appname: app.title, appid: app.id, checked: true } );
    }
    this.controller.modelChanged( this.appListModel );
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
};
