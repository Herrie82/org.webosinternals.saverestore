#!/bin/sh

APPID=`basename $0`
APPNAME="UNO"

source `dirname $0`/srf.app.info

SRCDIR="$APPDIR/uno"
FILES=" UNOSetting.sav UNOMatch.sav"

source `dirname $0`/srf.app.files

exit 0
