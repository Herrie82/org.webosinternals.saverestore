SaveRestoreService.identifier = 'palm://org.webosinternals.saverestore';

function SaveRestoreService() {
    this.log = '';
    this.logNum = 1;
}

SaveRestoreService.version = function(callback) {
    var request = new Mojo.Service.Request(SaveRestoreService.identifier, {
	    method: 'version',
	    onSuccess: callback,
	    onFailure: callback
	});
    return request;
};

// returns list of apps we have scripts for
SaveRestoreService.list = function(callback) {
    var request = new Mojo.Service.Request(SaveRestoreService.identifier, {
	    method: 'list',
	    onSuccess: callback,
	    onFailure: callback
	});
    return request;
}
    
SaveRestoreService.save = function(callback, pkg) {
    var request = new Mojo.Service.Request(SaveRestoreService.identifier, {
	    method: 'save',
	    parameters: {"id":pkg, "subscribe":true},
	    onSuccess: callback,
	    onFailure: callback
	});
    return request;
};

SaveRestoreService.restore = function(callback, pkg) {
    var request = new Mojo.Service.Request(SaveRestoreService.identifier, {
	    method: 'restore',
	    parameters: {"id":pkg, "subscribe":true},
	    onSuccess: callback,
	    onFailure: callback
	});
    return request;
};

// returns list of apps installed on the device
SaveRestoreService.listApps = function(callback) {
    var request = new Mojo.Service.Request(SaveRestoreService.identifier, {
	    method: 'listApps',
	    onSuccess: callback,
	    onFailure: callback
	});
    return request;
}
    
SaveRestoreService.logClear = function() {
    this.log = '';
    this.logNum = 1;
};

SaveRestoreService.logPayload = function(payload, stage) {
    if (payload.stage || stage) {
	this.log += '<div class="container '+(this.logNum%2?'one':'two')+'">';
		
	if (payload.stage) this.log += '<div class="title">' + payload.stage + '</div>';
	else if (stage) this.log += '<div class="title">' + stage + '</div>';
		
	var stdPlus = false;
		
	if (payload.errorCode || payload.errorText) {
	    stdPlus = true;
	    this.log += '<div class="stdErr">';
	    this.log += '<b>' + payload.errorCode + '</b>: ';
	    this.log += payload.errorText;
	    this.log += '</div>';
	}
		
	if (payload.stdOut && payload.stdOut.length > 0) {
	    stdPlus = true;
	    this.log += '<div class="stdOut">';
	    for (var s = 0; s < payload.stdOut.length; s++) {
		this.log += '<div>' + payload.stdOut[s] + '</div>';
	    }
	    this.log += '</div>';
	}
		
	if (payload.stdErr && payload.stdErr.length > 0) {
	    stdPlus = true;
	    this.log += '<div class="stdErr">';
	    for (var s = 0; s < payload.stdErr.length; s++) {
		this.log += '<div>' + payload.stdErr[s] + '</div>';
	    }
	    this.log += '</div>';
	}
	
	if (!stdPlus) {
	    this.log += $L("<div class=\"msg\">Nothing Interesting.</div>");
	}
		
	this.log += '</div>';
	this.logNum++;
    }
    /*
    // debug display
    alert('--- IPKG Log ---');
    for (p in payload) {
        alert(p + ': ' + payload[p]);
    }
    */
};
