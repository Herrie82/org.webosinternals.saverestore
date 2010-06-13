function StartupAssistant()
{
    // on first start, this message is displayed, along with the current version message from below
    this.firstMessage = $L('Here are some tips for first-timers:<ul><li>To see what Save/Restore is able to process, look in the Supported Applications list</li><li>For the subset of those applications that you have installed, Save/Restore can Save Application Data</li><li>For applications that have saved data, Save/Restore can Restore Application Data</li></ul>');
	
    this.secondMessage = $L('We hope you enjoy being able to manage your application data.<br>Please consider making a <a href=http://www.webos-internals.org/wiki/WebOS_Internals:Site_support>donation</a> if you wish to show your appreciation.');
	
    // on new version start
    this.newMessages =
	[
	 // Don't forget the comma on all but the last entry
         { version: '0.8.4', log: [ 'Application: Govnah',
                                    'Now supports saving of profiles' ] },
	 { version: '0.8.3', log: [ 'Application: Cloud Hopper',
				    'Now supports Add-to-Launcher icons (e.g. browser, launchpoints, contacts)' ] },
	 { version: '0.8.2', log: [ 'Applications: Gangstar, wIRC' ] },
	 { version: '0.8.1', log: [ 'Removed DOS line endings from some contributed scripts that caused startup failure' ] },
	 { version: '0.8.0', log: [ 'Applications: Sports Live, Football Live, US Soccer Live (all courtesy of MoreSolutions)' ] },
	 { version: '0.7.9', log: [ 'Applications: Hockey Live, Basketball Live, Baseball Live (all courtesy of MoreSolutions)' ] },
	 { version: '0.7.8', log: [ 'Applications: Pack n Track, Pribbage, Top Stocks, Roll Quest, The Helicopter Game, Whendle, Bubble Puzzle (all courtesy of Audermars02), Time Tracker Full (courtesy of baldric)' ] },
	 { version: '0.7.7', log: [ 'Applications: Transformers G1, WOG Card Keeper (both courtesy of Audermars02)' ] },
	 { version: '0.7.6', log: [ 'Robustified initial loading of applications',
				    'Added the Installed Applications list' ] },
	 { version: '0.7.5', log: [ 'Applications: MapTool, Just Pong, Match This, Consumption Calculator, UberRadio, Soccer 2010, TravelGuide, Wikay, OGCOpenInfo, My webOS Apps, FreeWeather (all courtesy of MetaView)',
				    'Improved Mail Lists support' ] },
	 { version: '0.7.4', log: [ 'Robustified saving and restoring multiple items' ] },
	 { version: '0.7.3', log: [ 'Improved Deer Hunter 3D support' ] },
	 { version: '0.7.2', log: [ 'Improved Govnah support' ] },
	 { version: '0.7.1', log: [ 'Applications: Govnah, ClassicNote, Mail Lists, Shopping Manager, Super Contacts, Epocrates, Family Medical History, XboxLive Friends, Bible Reader KJV, Time Tracker, Deer Hunter 3D' ] },
	 { version: '0.7.0', log: [ 'Now supports some launcher settings' ] },
	 { version: '0.6.9', log: [ 'Applications: WSOP3, The Settlers' ] },
	 { version: '0.6.8', log: [ 'Fixed Messaging query support',
				    'Applications: N.O.V.A' ] },
	 { version: '0.6.7', log: [ 'Applications: AmpachPre, Stock Kernel (Palm Pre), Uber-Kernel (Palm Pre)' ] },
	 { version: '0.6.6', log: [ 'Applications: NFL 2010, Real Soccer 2010, Sandstorm, Let\'s Golf, Shopping List, ShopList, ClassTracker, Fliq Notes' ] },
	 { version: '0.6.5', log: [ 'Applications: NewsRoom, SecuStore' ] },
	 { version: '0.6.4', log: [ 'Applications: Checkbook, Brothers in Arms' ] },
	 { version: '0.6.3', log: [ 'Fixed positioning of the list when toggling selections',
				    'Now supports databases on the emulator',
				    'Applications: Preware, FlashCards, Absolute Fitness' ] },
	 { version: '0.6.2', log: [ 'Applications: Hawx, Myles, Time is Money' ] },
	 { version: '0.6.1', log: [ 'Applications: Sorrowind Slots, GiftJammer, GolfPinFinder, Flickr Addict' ] },
	 { version: '0.6.0', log: [ 'Added support for saving and restoring cookies',
				    'Applications: Paratrooper, Weather Window, Scoop, Tweed, Clock Sync' ] },
	 { version: '0.5.2', log: [ 'Added activity notifications and disabled main buttons while reloading' ] },
	 { version: '0.5.1', log: [ 'Made the restore screen default to all off - much safer that way',
				    'Fixed a bug in screen positioning for partial restores' ] },
	 { version: '0.5.0', log: [ 'First Public Release',
				    'Applications: Dr Podder, Monopoly, NFSU, The Sims 3, ' +
				    'A+ Student Organiser, Asphalt5, Dungeon Hunter, Shrek Kart, ' +
				    'Dragon Game, Glyder 2, Keyring, Messaging (Save Only), Memos (Save Only), ' +
				    'JogStats, SplashID, Netstat' ] }
	 ];
	
    // setup menu
    this.menuModel =
	{
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
	
    // setup command menu
    this.cmdMenuModel =
	{
	    visible: false, 
	    items:
	    [
    {},
    {
	label: $L("Ok, I've read this. Let's continue ..."),
	command: 'do-continue'
    },
    {}
	     ]
	};
};

StartupAssistant.prototype.setup = function()
{
    // set theme because this can be the first scene pushed
    this.controller.document.body.className = prefs.get().theme;
	
    // get elements
    this.titleContainer = this.controller.get('title');
    this.dataContainer =  this.controller.get('data');
	
    // set title
    if (vers.isFirst) {
	this.titleContainer.innerHTML = $L('Welcome To Save/Restore');
    }
    else if (vers.isNew) {
	this.titleContainer.innerHTML = $L('Save/Restore Changelog');
    }
	
	
    // build data
    var html = '';
    if (vers.isFirst) {
	html += '<div class="text">' + this.firstMessage + '</div>';
    }
    if (vers.isNew) {
	html += '<div class="text">' + this.secondMessage + '</div>';
	for (var m = 0; m < this.newMessages.length; m++) {
	    html += Mojo.View.render({object: {title: 'v' + this.newMessages[m].version}, template: 'startup/changeLog'});
	    html += '<ul>';
	    for (var l = 0; l < this.newMessages[m].log.length; l++) {
		html += '<li>' + this.newMessages[m].log[l] + '</li>';
	    }
	    html += '</ul>';
	}
    }
    
    // set data
    this.dataContainer.innerHTML = html;
	
	
    // setup menu
    this.controller.setupWidget(Mojo.Menu.appMenu, { omitDefaultItems: true }, this.menuModel);
	
    // set command menu
    this.controller.setupWidget(Mojo.Menu.commandMenu, { menuClass: 'no-fade' }, this.cmdMenuModel);
	
    // set this scene's default transition
    this.controller.setDefaultTransition(Mojo.Transition.zoomFade);
};

StartupAssistant.prototype.activate = function(event)
{
    // start continue button timer
    this.timer = this.controller.window.setTimeout(this.showContinue.bind(this), 5 * 1000);
};

StartupAssistant.prototype.showContinue = function()
{
    // show the command menu
    this.controller.setMenuVisible(Mojo.Menu.commandMenu, true);
};

StartupAssistant.prototype.handleCommand = function(event)
{
    if (event.type == Mojo.Event.command) {
	switch (event.command) {
	case 'do-continue':
	this.controller.stageController.swapScene({name: 'main', transition: Mojo.Transition.crossFade});
	break;
			
	case 'do-prefs':
	this.controller.stageController.pushScene('preferences');
	break;
			
	case 'do-help':
	this.controller.stageController.pushScene('help');
	break;
	}
    }
}
