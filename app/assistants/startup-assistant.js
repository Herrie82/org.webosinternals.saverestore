function StartupAssistant(changelog)
{
    this.justChangelog = changelog;

    // on first start, this message is displayed, along with the current version message from below
    this.firstMessage = $L('Here are some tips for first-timers:<ul><li>To see what Save/Restore is able to process, look in the Supported Applications list</li><li>For the subset of those applications that you have installed, Save/Restore can Save Application Data</li><li>For applications that have saved data, Save/Restore can Restore Application Data</li></ul>');
	
    this.secondMessage = $L('We hope you enjoy being able to manage your application data.<br>Please consider making a <a href=\"https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=HLSTYY3RCKVY2\">donation</a> if you wish to show your appreciation.');
	
    // on new version start
    this.newMessages =
	[
	 // Don't forget the comma on all but the last entry
	 { version: '1.5.8', log: [ 'Applications: Quell Reflect HD' ] },
	 { version: '1.5.7', log: [ 'Application: Bug Village' ] },
	 { version: '1.5.6', log: [ 'Application: podFrenzy (courtesy of Audemars02)' ] },
	 { version: '1.5.5', log: [ 'Application: Angry Birds Seasons HD (courtesy of Audemars02)' ] },
	 { version: '1.5.4', log: [ 'Applications: Launcher (3.0 update), Beyond Ynth, Sparkle HD, Quell HD (all courtesy of Audemars02), Blocked (courtesy of stickb0y)' ] },
	 { version: '1.5.3', log: [ 'Added AppNote for Robotek HD script to indicate restore only works with the same device' ] },
	 { version: '1.5.2', log: [ 'Applications: intervalGym, Jamwam Jog, Power Nap, ZenSearch (all courtesy of irateb), Need For Speed Hot Pursuit (TouchPad) (courtesy of A.Stice), FlightView, Gowalla, Open Table, Robotek HD, Slice It HD, Spare Time, Wall Switch (all courtesy of Audemars02)' ] },
	 { version: '1.5.1', log: [ 'Applications: Trip Traq - HBLR, Trip Traq - BART, Pane Free, Multi Pane (all courtesy of appsotutely), Clock In, Clock In Trial, Gizmo, BeamOut, Days Gone By, Days To Come (all courtesy of djgardn2), DORK 1 (courtesy of lordbah), FitTrack Trial, MiniSquadron (both courtesy of malpha), Super Ads (courtesy of Audemars02)' ] },
	 { version: '1.5.0', log: [ 'Applications: SecuStore 2, SecuStore 2 (Trial)' ] },
	 { version: '1.4.8', log: [ 'Added back buttons for devices with no back gesture' ] },
	 { version: '1.4.7', log: [ 'Applications: Angry Birds HD, Angry Birds Rio HD (courtesy of Audemars02)' ] },
	 { version: '1.4.6', log: [ 'Added support for saving Text Assist entries' ] },
	 { version: '1.4.5', log: [ 'Added support for devices with no back gesture' ] },
	 { version: '1.4.4', log: [ 'Applications: Add Pad, Convertor, GPS Fix, Grooveshark, Hopper, phnx, Touchnote, Universe Browser, Voice Memos, Voices, WhitePages (all courtesy of Audemars02)' ] },
	 { version: '1.4.3', log: [ 'Change scrim to Mojo spinner on Main during load' ] },
	 { version: '1.4.2', log: [ 'Better fix for auto-save' ] },
	 { version: '1.4.1', log: [ 'Fixed auto-save and sorting of apps in the save and installed scenes' ] },
	 { version: '1.4.0', log: [ 'Now incrementally loads the set of application scripts' ] },
	 { version: '1.3.9', log: [ 'Applications: Safe Wallet (courtesy of Audemars02), Koto Player (courtesy of fxspec06), CryptoNotes (courtesy of hboisvert), ToDo Classic (courtesy of hboisvert)',
                             'Applications: FitTrack, Headlines, Slice It (all courtesy of malpha), Kookaroo, LumenCalc, SiteStatusPro (all courtesy of pcimino)',
				    'Applications: Bills Vs Income, Blox, Chemistry Encyclopedia, Click Trainer, Dashboard Utilities, GeoStrings, Marquees ROCK, Music (Remix), Quick Post, Todays Tasks, WikiXplorer, ZIP Code Tools (all courtesy of djgardn2)' ] },
	 { version: '1.3.8', log: [ 'Applications: Angry Birds Rio, Supersonic (all courtesy of Audemars02)',
				    'Updated Device Info and Backup scripts in Contrib directory for webOS 2.0 changes.  Added Max webOS 1.4.5 version to Advanced Patches scripts.' ] },
	 { version: '1.3.6', log: [ 'Applications: Airplanes, Beat Box, BibleZ (pro), BibleZ, Bubbles (free), Buka, Buka (Lite), gpsDashboard Free, gpsDashboard, Helicopter 3D, Hit the dots, Hyperspace Tournament, Labyrinth Lite, Metronome, Navit, Puzzle Paint (Lite), Puzzle Paint, Radiant, Radiant (Lite), Relego, Rhythm News, Solitaire, SuperNES, Wetter.com, World Time (Lite), World Time (Pro), zcorder  (all courtesy of pcworld)',
                             'Applications: Brothers In Arms 2 (updated), InterfaceLift, Worms (all courtesy of djgardn2), Go To Demo, Go To Lite, Go To tool (all courtesy of markpowers)',
				    'Applications: Azkend, Heroes of Kalevala, Just Draw (all courtesy of sunmorgus), SiteStatus (courtesy of pcimino)' ] },
	 { version: '1.3.5', log: [ 'Applications: Done, Count Down Clock, Geocaching for Webos (all courtesy of MaPhi)',
                             'Applications: Astraware Mahjong (courtesy of capt4chris), ICE - In Case of Emergency (courtesy of RickNeff), Fling (courtesy of malpha)',
				    'Applications: Amigo, Bahnfahren, Dict.cc Translator, Forums, Free Klondike Solitaire, Glow Hockey, Glow Hockey FREE, Leo Dictionary, Nodoze, Plasma Cannon, Precentral News (unofficial), Premote , Raging Thunder 2, Rockus Racer Expansion Pack, Snake, Space Sheep, Space Sheep Lite, SWR3-Elchradio, Telmap O2 Germany, Znax (all courtesy of pcworld)' ] },
	 { version: '1.3.4', log: [ 'Applications: Clipboard for webOS, A+ Student Organizer Trial (both courtesy of Audemars02), Poker Session Tracker (courtesy of iamthedood), ColorHarmony (courtesy of rretsiem)',
                             'Applications: Backgammon, Bible Reader, Blink, Blink (free), Chess for webOS, chess.com, ColorJunction, DasTelefonbuch, Galcon, Labyrinth, Mazer, Palm Developer Day 2010 Schedule, ' +
                             'Pandablast, Plumbers Nightmare (Lite), PreJvm, Simple Bible, Tile Breaker, Tile Breaker (Lite), Titan Stopwatch, TuneIn by RadioTime, Virus Defense, Virus Defense (Lite), VLC Remote, ' +
				     'VLC Remote (free), webOS Blog, webOS roundup, YouTube Mini, YouTube Mini (Free) (all courtesy of pcworld)' ] },
	 { version: '1.3.3', log: [ 'Applications: Clipboard for webOS, Carbon Beta (courtesy of Audemars02)' ] },
	 { version: '1.3.2', log: [ 'Keep the device awake during scheduled auto-save (courtesy of MetaView)' ] },
	 { version: '1.3.1', log: [ 'Applications: Backup, Device Info (in Contrib directory.  See readme.txt file in that directory for details) (all courtesy of Audemars02)',
				     'Applications: Launcher (Updated for 2.0), Need for Speed (Spanish), Carbon, Foursquare (beta), Ace Casino, Definitive Saved by the Bell Quiz Full, freeTether (all courtesy of Audemars02)',
				     'Applications: Baseball Live, Basketball Live, Womens College Basketball Live, Womens Basketball Live, US Soccer Live, UK Football Live, Sports Live, International Soccer Live, Hockey Live, Football Live, Euro Football Live, College Football Live, College Basketball Live (all courtesy of MoreSolutions)',
				     'Application: TapNote (courtesy of One Crayon)' ] },
	 { version: '1.3.0', log: [ 'Rolled up all the beta release features for a public release' ] },
	 { version: '1.2.9', log: [ 'Added dashboard for auto-save and fixed scheduling (courtesy of ryanjduffy)' ] },
	 { version: '1.2.8', log: [ 'Added scheduled backups (courtesy of ryanjduffy)' ] },
	 { version: '1.2.7', log: [ 'Applications: InContact Plus, InContact (both courtesy of ryanjduffy), EVAC, Dough (both courtesy of Carl Spakler), EZ Shop List (courtesy of crabbz), Dead Runner (courtesy of Audemars02)',
				    'Applications: Feeder, Reboxed, Word Whirl, Gamer Friends for PSN, Tangram, Tilt Origami, Wobble Words, ExZeus arcade, Scrabble, Quell, Tradewinds 2 (all courtesy of malpha)' ] },
	 { version: '1.2.6', log: [ 'Applications: Angry Birds Seasons' ] },
	 { version: '1.2.5', log: [ 'Applications: DigiPay, Woodenigma, Ancient Frog' ] },
	 { version: '1.2.4', log: [ 'Now distinguishes internal and external databases with the same name',
				    'Affects My WebOS Apps and perhaps other scripts - please do a backup to ensure you have both databases saved correctly' ] },
	 { version: '1.2.3', log: [ 'Application: Pronto Dial (courtesy of malpha)' ] },
	 { version: '1.2.2', log: [ 'Applications: Ground Effect, TileStorm, TileStorm Eire, Rock Band' ] },
	 { version: '1.2.0', log: [ 'Added support for scripts that are dependent upon the webOS version' ] },
	 { version: '1.1.0', log: [ 'Rolled up all the beta release features for a public release' ] },
	 { version: '1.0.19', log: [ 'Applications: Whats for dinner? Premium (courtesy of rksand), NesEm (Updated), Dungeon Hunter (Updated), WOG O.S.K. (all courtesy of djgardn2)' ] },
	 { version: '1.0.18', log: [ 'No longer saves file attachments from MMS messages. You will need to manually back up those files from /attachments directory on the USB drive' ] },
	 { version: '1.0.17', log: [ 'Added a Changelog button to the Help scene' ] },
	 { version: '1.0.16', log: [ 'Patch: Advanced Config Sys Pref-World script',
				     'Applications: Astraware Boardgames, Angry Birds (Pixi) (both courtesy of Audemars02), Crosswords (courtesy of tobias funke)',
				     'Added executable for ACSP-World in the contrib directory. Updated Photos script and Readme.txt file in contrib directory.' ] },
	 { version: '1.0.15', log: [ 'Added support for saving Tasks' ] },
	 { version: '1.0.14', log: [ 'Added support for saving MMS messages' ] },
	 { version: '1.0.13', log: [ 'Application: FitTrack Beta (courtesy of troymiller)',
				     'Updated: Advanced Config for System Preferences patch (courtesy of tobias funke)',
				     'Robustify file-saving script when creating the source directory if it does not already exist.  ' ] },
	 { version: '1.0.12', log: [ 'Application: NesEm (courtesy of djgardn2)',
				     'Patch: Advanced Config for System Preferences (courtesy of tobias funke)',
				     'Added executable to run Advanced Config for System Preferences to /contrib directory and updated readme file' ] },
	 { version: '1.0.11', log: [ 'Robustify the Directory script',
				     'Added a photos/videos backup script and an executable for App Launcher Advanced Config script in the /contrib (see Readme.txt file in that directory for details)' ] },
	 { version: '1.0.10', log: [ 'Robustify postinst script',
				     'Added french translation support',
				     'Added support for saving a single directory',
				     'Robustify file-saving script to create the source directory if it does not already exist.  Updated Quick Contacts script accordingly',
				     'Applications: Jacksonville, New York Times, TodoTracker (all courtesy of djgardn2), Slide RSS (courtesy of appsotutely), Scratch Word Processor (courtesy of Chakat Silverstreak)',
				     'Applications: Astraware Casino (courtesy of Audemars02), Putki, SuperJump (both courtesy of pcworld), VisualBoy Advance (courtesy of rwhitby)',
				     'Applications: College Football Live, International Soccer Live, UK Football Live, Womens Basketball Live (all courtesy of MoreSolutions)',
				     'Applications: Angry Birds Lite, BFG Maps, BFG Maps Beta, Bluetooth Profiles, Crimson Fields, Frootrees, Lumberjack, Sparkle Lite (all courtesy of StoneRyno)' ] },
	 { version: '1.0.9', log: [ 'Robustify the installation scripts',
                                    'Applications: Music (Remix), Music Wave Lite, Fuzzies  (all courtesy of mamouton)',
                                    'Applications: Brain Challenge HD, TangramPuzzle Lite, TangramPuzzle (all courtesy of Audemars02)' ] },
	 { version: '1.0.8', log: [ 'Applications: EasyList, Cosmic Nitro, TechTray, GPS Trip Panel, Raging Thunder, Whats for dinner? Lite (all courtesy of djgardn2)',
                                    'Applications: Crusade Of Destiny, Rednecks Vs Aliens (both courtesy of mamouton), TrackMyWork Full (courtesy of kr_ke), Sparkle (courtesy of pip smith)' ] },
	 { version: '1.0.6', log: [ 'Applications: TouchConnect+, Mobile Hotspot (both courtesy of Audemars02), SmartRunner (courtesy of djgardn2)' ] },
	 { version: '1.0.5', log: [ 'Fixed case insensitive unzip overwrite query bug',
                                    'Applications: Angry Birds' ] },
	 { version: '1.0.4', log: [ 'Fixed issue created when allowing filenames that include spaces',
                                    'Fixed application names for a few scripts' ] },
	 { version: '1.0.3', log: [ 'Allows for filenames that include spaces',
                                    'Applications: AutoReplace Dictionary Backup, wIRC (updated), pReader, Photo Safe, YouTube (courtesy of Audemars02)',
                                    'Applications: Fliq Tasks, Sorting Thoughts, bit.ly (all courtesy of djgardn2), SiDiary Exporter (courtesy of Taurec), My Pets (courtesy of rgisraelsen)' ] },
	 { version: '1.0.1', log: [ 'Added support for Preferences-type backups, including support for Mode Switcher',
                                    'Applications: Quit Smoking Tracker (courtesy of Chakat Silverstreak), NaNPlayer  (courtesy of mamouton)',
                                    'Applications: TealSpeed, Brothers In Arms 2, YP Mobile (all courtesy of djgardn2)',
                                    'Applications: My DataBank Unlimited, Movie Diary (courtesy of pip smith)',
                                    'Applications: Wifi Profiles, YouView, Facebook, Facebook Beta, Cronk, Internalz, ZumoDrive, Switcharoo Free, Wallpaper Switcharoo, ' +
					    'Brightness Unlinked, WiFi Media Sync, Quick Event, LaunchPoint Speed Dial (courtesy of Audemars02)',
                                    'Applications: Spades, DZ.Tanks, foursquare, Geocaching for webOS BETA, Speed Brain, Pandora, Card Ace, Card Ace: Blackjack, Word Ace, WHERE, ' +
					    'Bible (Youversion), Solitaire Collection (minego), Solitaire Collection Beta (minego), LED torch, AccuRadio, Flixster, Convert, Unit Wizard, ' +
                                  'Slacker Radio, Trapster, Weather Channel, Units, MyQ for Netflix, Terminal (all courtesy of StoneRyno)' ] },
	 { version: '1.0.0', log: [ 'Rolled up all the 0.9.x alpha releases into a new public release' ] },
	 { version: '0.9.13', log: [ 'Updated Google Account Search script',
                                    'Applications: SecuStore (App Catalog), SecuStore Lite',
                                    'Applications: My DataBank, Speed Dial Plus, Speed Dial Pro (all courtesy of pip smith)' ] },
	 { version: '0.9.12', log: [ 'Fixed scripts to allow for database names with spaces' ] },
	 { version: '0.9.11', log: [ 'Allows for database names that include spaces',
                                    'Application: Blades of Fury, Guitar Hero 5 (both courtesy of Chakat Silverstreak), Sprint TV',
                                    'Applications: AirTraffic Lite, Market Live, Nuclear Attack, Skybox, Tan Total, TrackMyWork Free, Code Cabinet, ' +
					    'Simple Shop, WordRacer, Tuck Tuck, FeedReader, iCopter, MyLists, ' +
					    'SpaceAlarm, Ideal Weight , Touch Connect (all courtesy of pip smith)' ] },
	 { version: '0.9.10', log: [ 'Applications: Bad Kitty (courtesy of pip smith), jChecklist and jVault (both courtesy of cohoman)' ] },
	 { version: '0.9.9', log: [ 'Rearchitected list service method to return data in 4Kb chunks (fixes the hang related to a large number of scripts)' ] },
	 { version: '0.9.8', log: [ 'Application: My Medical',
                                    'Applications: Speed Dial Lite, P2Snippets, Do It Again (all courtesy of pip smith)',
                                    'Applications: Feeds, Uno, iStayFit, Notes (all courtesy of StoneRyno)' ] },
	 { version: '0.9.7', log: [ 'Application: Fuel, Jewel Quest III, Bills, Accounts, Google Account Search, Quick System Tasks, GeoTasks Pro, Mojo Messenger, My Loaned Items (all courtesy of mamouton)',
                                    'Applications: Cool Tip Calculator, SkyClimber (free), SkyClimber (paid), CineShowTime, Forbes ii, BillMyTime Demo, BillMyTime (all courtesy of pip smith)' ] },
	 { version: '0.9.6', log: [ 'Application: Agenda, Twee, Comics',
                                    'Applications: Bubbles! Plus, Bubbles! (free), FillUps, TXT Group, Topple Ball, Topple Ball Mini, Warranty Manager (all courtesy of pip smith)',
                                    'Applications: ASCII Star Wars, Ski for Pre, Ski for Pre Lite, WebUI for WebOS Lite, WebUI for WebOS PRO (all courtesy of sunmorgus)' ] },
	 { version: '0.9.5', log: [ 'Application: Milage Monitor Plus',
                                    'Applications: Scratchpad, Starship Commander, News Feed (all courtesy of pip smith)',
                                    'Applications: Avatar, Super KO Boxing 2 (both courtesy of Chakat Silverstreak)' ] },
	 { version: '0.9.4', log: [ 'Application: Preware (Now supports saving of custom feeds), WOG Card Keeper (enchanced support), Suduko (by Cakefight), Five Dice, Battleship (EA)',
                                    'Applications: Fall-E, Fall-E pro, Back of the Net, Timepiece (all courtesy of pip smith)',
                                    'Applications: Ampache Mobile, Plumbers Nightmare(all courtesy of mamouton)' ] },
	 { version: '0.9.3', log: [ 'Fixed Launcher support' ] },
	 { version: '0.9.2', log: [ 'Defensive Warfare (courtesy of pip smith), Preset Reset, ShareTheCost (STC), Sudoku Lite!, ' +
				    'Milage Monitor, Hero of Sparta, Score Keeper, Timesheet, Radio Hibiki, Online Tracker, ' +
				    'Online Tracker Free, Battery Monitor Plus, Quick Contacts (homebrew), Crossword Lite' ] },
	 { version: '0.9.1', log: [ 'Fixed Launcher support',
				    'Now supports the Palm Web Browser' ] },
	 { version: '0.9.0', log: [ 'Now stores the archives as zip files, so the media indexer does not see the constituent files' ] },
	 { version: '0.8.6', log: [ 'Fixed Govnah support' ] },
	 { version: '0.8.5', log: [ 'Improved support for Add-to-Launcher icons (e.g. browser, launchpoints, contacts)' ] },
	 { version: '0.8.4', log: [ 'Application: Govnah (Now supports saving of profiles)',
                                    'Applications: Net2Streams Pro, Assassins Creed, Thought Bubble, Giant Fighting Robots, Jump O Clock, Real Tennis, Tiger Woods PGA Tour' ] },
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
	var deviceTheme = '';
	if (Mojo.Environment.DeviceInfo.modelNameAscii == 'Pixi' ||
		Mojo.Environment.DeviceInfo.modelNameAscii == 'Veer')
		deviceTheme += ' small-device';
	if (Mojo.Environment.DeviceInfo.modelNameAscii == 'TouchPad' ||
		Mojo.Environment.DeviceInfo.modelNameAscii == 'Emulator')
		deviceTheme += ' no-gesture';
    this.controller.document.body.className = prefs.get().theme + deviceTheme;
	
    // get elements
    this.titleContainer = this.controller.get('title');
    this.dataContainer =  this.controller.get('data');
	
	if (Mojo.Environment.DeviceInfo.modelNameAscii == 'TouchPad' ||
	    Mojo.Environment.DeviceInfo.modelNameAscii == 'Emulator')
	    this.backElement = this.controller.get('back');
	else
	    this.backElement = this.controller.get('header');
	
    // set title
    if (this.justChangelog) {
	this.titleContainer.innerHTML = $L('Changelog');
	// setup back tap
	this.backTapHandler = this.backTap.bindAsEventListener(this);
	this.controller.listen(this.backElement, Mojo.Event.tap, this.backTapHandler);
    }
    else {
	this.controller.get('back').hide();
	if (vers.isFirst) {
	    this.titleContainer.innerHTML = $L('Welcome To Save/Restore');
	}
	else if (vers.isNew) {
	    this.titleContainer.innerHTML = $L('Save/Restore Changelog');
	}
    }
	
	
    // build data
    var html = '';
    if (this.justChangelog) {
	for (var m = 0; m < this.newMessages.length; m++) {
	    html += Mojo.View.render({object: {title: 'v' + this.newMessages[m].version}, template: 'startup/changeLog'});
	    html += '<ul>';
	    for (var l = 0; l < this.newMessages[m].log.length; l++) {
		html += '<li>' + this.newMessages[m].log[l] + '</li>';
	    }
	    html += '</ul>';
	}
    }
    else {
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
    }
    
    // set data
    this.dataContainer.innerHTML = html;
	
	
    // setup menu
    this.controller.setupWidget(Mojo.Menu.appMenu, { omitDefaultItems: true }, this.menuModel);
	
    // set command menu
    if (!this.justChangelog) {
	this.controller.setupWidget(Mojo.Menu.commandMenu, { menuClass: 'no-fade' }, this.cmdMenuModel);
    }
	
    // set this scene's default transition
    this.controller.setDefaultTransition(Mojo.Transition.zoomFade);
};

StartupAssistant.prototype.activate = function(event)
{
    if (!this.justChangelog) {
	// start continue button timer
	this.timer = this.controller.window.setTimeout(this.showContinue.bind(this), 5 * 1000);
    }
};

StartupAssistant.prototype.showContinue = function()
{
    // show the command menu
    this.controller.setMenuVisible(Mojo.Menu.commandMenu, true);
};

StartupAssistant.prototype.backTap = function(event)
{
    if (this.justChangelog) {
	this.controller.stageController.popScene();
    }
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
};

StartupAssistant.prototype.cleanup = function(event)
{
	if (this.justChangelog)
		this.controller.stopListening(this.backElement,  Mojo.Event.tap, this.backTapHandler);
};

// Local Variables:
// tab-width: 4
// End:
