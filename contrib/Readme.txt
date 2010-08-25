The scripts included in this directory ( /media/cryptofs/apps/usr/palm/applications/org.webosinternals.saverestore/contrib ) are scripts that have been provided in the PreCentral forums but have not been released within the Save/Restore App itself.  These are considered more complex scripts that may not be needed for the general population.

There are currently 3 scripts in this folder:
1. com.palm.app.backup - Misc OS Backup Files + AutoReplace
    > This file replaces the existing com.palm.app.backup file in the scripts directory (that currently only saves the AutoReplace Dictionary).  This expanded script also saves: a variety of system and phone images that a user may customize, the PalmDatabase.db3, cookies.db, Databases.db, systemprefs.db, and all the /dev/tokens/.  Note that the only the images are included in a restore, not the database files or the tokens

2. com.palm.app.deviceinfo - Misc OS Backup Files (without AutoReplace)
    > This file is identical to the script above, except that it does not include the AutoReplace Dictionaries.  This way, you can copy this script to the app and it (1) won't get replaced with every update to the app and (2) will not duplicate the existing AutoReplace Dictionary saves.

3. org.webosinternals.saverestore - ZZZ Save Restore Zip Creation
    > This files creates a ZIP file called saverestore-(timestamp).zip with a zipped up version of your entire save/restore directory [replacing (timestamp) with the actual timestamp]! Right now this is placed in the USB root directory (i.e /media/internal), although you can of course modify this. The script It is named "ZZZ Save Restore Zip creation" so that it appears at the very bottom of the save/restore installed apps list and will therefore will always be run last.

In order to get these files into your scripts directory, you need to do one of the following 2 things: 

1) Run the following to command via Command Line (replacing [script name] with the name of the script you want
    >  cp /media/cryptofs/apps/usr/palm/applications/org.webosinternals.saverestore/contrib/[script name] /var/svc/org.webosinternals.saverestore

2) using Internals:
    > Go to /media/cryptofs/apps/usr/palm/applications/org.webosinternals.saverestore/contrib/
    > Select each script you want and select "copy" to /var/svc/org.webosinternals.saverestore

Let me know if you have any questions
Audemars02 in PreCentral Forums
http://forums.precentral.net/webos-internals/237558-save-restore-community-development.html

