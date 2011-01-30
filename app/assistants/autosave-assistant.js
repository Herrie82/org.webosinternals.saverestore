function AutosaveAssistant() {
	this.appCount = 0;
	this.appIndex = 0;
	this.progressModel = {
		value: 0,
		title: ""
	};
	this.apps = null;
}

AutosaveAssistant.prototype.setup = function() {
	this.controller.setupWidget("autoSaveProgress", {"image":"images/palm-dark/progress-back.png"}, this.progressModel);
	
	if (appDB.loadedApps) {
		Mojo.Log.info("calling initApps");
		this.saveApps();
    } else {
		Mojo.Log.info("calling initApps");
		appDB.initApps(this.saveApps.bind(this));
    }
}

AutosaveAssistant.prototype.updateStatus = function(appId) {
	this.appIndex++;
	this.progressModel.title = appDB.appsInformation[appId].title;
	this.progressModel.value = this.appIndex/this.appCount;
	
	this.controller.modelChanged(this.progressModel);
	
	this.controller.get("currentAppName").update(this.progressModel.title);	
}

AutosaveAssistant.prototype.saveApps = function(e) {
    if (e && e.returnValue === false) {
	Mojo.Log.error("error saving app=%j",e);
    }
          
    if (!this.apps) {
		this.apps = appDB.appsSaved;
		this.appCount = this.apps.length;
		Mojo.Controller.getAppController().showBanner($L("Saving application data"), {action:"autoSave",autoSave:"startup"}, "autoSave");
	}
  
    if (this.apps.length < 1) {
	// shutdown
	Mojo.Controller.getAppController().closeStage(dashStageName)

	this.controller.serviceRequest("palm://com.palm.power/com/palm/power", {
		method: "activityEnd",
		parameters: {
			id: Mojo.appInfo.id
		},
		onSuccess: function() {},
		onFailure: function() {}
	});

	return;
    }
  
    var a = this.apps.shift();
    if (this.subscription) {
	this.subscription.cancel();
    }
	
	this.updateStatus(a);

	// keep the device from sleeping (max 15 minutes)
	this.controller.serviceRequest("palm://com.palm.power/com/palm/power", {
		method: "activityStart",
		parameters: {
			id: Mojo.appInfo.id,
			duration_ms: "900000"
		},
		onSuccess: function() {},
		onFailure: function() {}
	});
	
	Mojo.Log.info("Saving",a);
    this.subscription = SaveRestoreService.save( this.saveApps.bind(this), a );
};
