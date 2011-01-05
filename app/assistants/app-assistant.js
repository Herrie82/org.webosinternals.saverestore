// get the cookies
var prefs = new preferenceCookie();
var vers =  new versionCookie();

// stage names
var mainStageName = 'saverestore-main';
var dashStageName = 'saverestore-dash';

function AppAssistant() {}

AppAssistant.prototype.handleLaunch = function(params)
{
    var mainStageController = this.controller.getStageController(mainStageName);
	
    try {
	if (!params) {
	    if (mainStageController) {
		mainStageController.popScenesTo('main');
		mainStageController.activate();
	    }
	    else {
		this.controller.createStageWithCallback({name: mainStageName, lightweight: true},
							this.launchFirstScene.bind(this));
	    }
	} else {
	  if(params.action === "autoSave") {
	    this.executeAutoSave();
	  }
	}
    }
    catch (e) {
	Mojo.Log.logException(e, "AppAssistant#handleLaunch");
    }
};

AppAssistant.prototype.executeAutoSave = function() {
  if(appDB.loadedApps) {
    this.saveApps();
  } else {
    appDB.initApps(this.saveApps.bind(this));
  }
};

AppAssistant.prototype.saveApps = function(e) {
  
  if(e && e.returnValue === false) {
    Mojo.Log.error("error saving app=%j",e);
  }
          
  if(!this.autoSaveApps) {
    this.autoSaveApps = appDB.appsSaved;
  }
  
  if(this.autoSaveApps.length < 1) return;
  
  var a = this.autoSaveApps.pop();
  SaveRestoreService.save( this.saveApps.bind(this), a );
};

AppAssistant.prototype.cancelAutoSave = function() {
  
  new Mojo.Service.Request("palm://com.palm.power/timeout", {
    method: "clear",
    parameters: {
      "key": "org.webosinternals.saverestore.autoSave",
      "uri": "palm://com.palm.applicationManager/launch",
    },
	onSuccess:function() { Mojo.Log.info("autoSave cancelled"); }
  });
};

AppAssistant.prototype.scheduleAutoSave = function() {
  
  var p = prefs.get(true);
  
  if(!p.autoSave) return;
  
  try {
    var when = new Date();
    var t = new Date(p.autoSaveTime);
    when.setHours(t.getHours());
    when.setMinutes(t.getMinutes());
    when.setDate(when.getDate()+parseInt(p.autoSaveFrequency))
    
    var at = (when.getUTCMonth()+1)+"/"+when.getUTCDate()+"/"+when.getUTCFullYear()+" "+when.getUTCHours()+":"+when.getUTCMinutes()+":00";

    new Mojo.Service.Request("palm://com.palm.power/timeout", {
      method: "set",
      parameters: {
        "wakeup": false,
        "key": "org.webosinternals.saverestore.autoSave",
        "uri": "palm://com.palm.applicationManager/launch",
        "params": '{"id":"' + Mojo.appInfo.id + '","params":{"action":"autoSave"}}',
        "at": at
      },
	  onSuccess:function() { Mojo.Log.info("autoSave scheduled"); },
      onFailure: function(e) { Mojo.Log.error("alarm failed %j",e); }
    });
  } catch(e) {
    Mojo.Log.logException(e, "AppAssistant#scheduleAutoSave");
  }
}

AppAssistant.prototype.launchFirstScene = function(controller)
{
    vers.init();
    if (vers.showStartupScene()) {
	controller.pushScene('startup');
    }
    else {
	controller.pushScene('main');
    }
};

AppAssistant.prototype.cleanup = function() {
};
