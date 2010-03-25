function MainAssistant() {
	/* this is the creator function for your scene assistant object. It will be passed all the 
	   additional parameters (after the scene name) that were passed to pushScene. The reference
	   to the scene controller (this.controller) has not be established yet, so any initialization
	   that needs the scene controller should be done in the setup function below. */
}

MainAssistant.prototype.setup = function() {
	/* this function is for setup tasks that have to happen when the scene is first created */
		
	/* use Mojo.View.render to render view templates and add them to the scene, if needed */
	
	/* setup widgets here */
	
	/* add event handlers to listen to events from widgets */

	// get elements
	this.versionElement =	this.controller.get('version');
	this.listElement =	this.controller.get('mainList');

	this.versionElement.innerHTML = "v" + Mojo.Controller.appInfo.version;

	// handlers
	this.listTapHandler =		this.listTap.bindAsEventListener(this);

	// setup list model
	this.mainModel = {items:[]};

	// setup widget
	this.controller.setupWidget('mainList', { itemTemplate: "main/rowTemplate", swipeToDelete: false, reorderable: false }, this.mainModel);
	this.controller.listen(this.listElement, Mojo.Event.listTap, this.listTapHandler);

};

MainAssistant.prototype.listTap = function(event)
{
	if( event.item.cmd == 'save' ){
		this.controller.stageController.pushScene( 'save' );
	}
}

MainAssistant.prototype.updateList = function(skipUpdate)
{
Mojo.Log.error("updateList");
	// clear main list model of its items
	this.mainModel.items = [];
		
	this.mainModel.items.push(
	{
		name:     $L('Save Application Data'),
		style:    'showCount',
		scene:    'available',
		cmd:		'save',
		pkgCount: 5
	});
	this.mainModel.items.push(
	{
		name:     $L('Restore Application Data'),
		style:    'showCount',
		scene:    'active',
		cmd:		'restore',
		pkgCount: 1
	});
	this.mainModel.items.push(
	{
		name:     $L('List of Everything'),
		style:    'showCount',
		scene:    'active',
		cmd:		'everything',
		pkgCount: 1
	});


	this.listElement.mojo.noticeUpdatedItems(0, this.mainModel.items);
	this.listElement.mojo.setLength(this.mainModel.items.length);
}



MainAssistant.prototype.activate = function(event) {
	/* put in event handlers here that should only be in effect when this scene is active. For
	   example, key handlers that are observing the document */
	this.updateList();
};

MainAssistant.prototype.deactivate = function(event) {
	/* remove any event handlers you added in activate and do any other cleanup that should happen before
	   this scene is popped or another scene is pushed on top */
};

MainAssistant.prototype.cleanup = function(event) {
	/* this function should do any cleanup needed before the scene is destroyed as 
	   a result of being popped off the scene stack */
	this.controller.stopListening(this.listElement, Mojo.Event.listTap, this.listTapHandler);
};
