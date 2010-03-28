function dumpObject( obj ){
        Mojo.Log.info( "====================== DUMP ========================" );
        for( var i in obj ){
                Mojo.Log.info( i + ": " + obj[i] );
        }
        Mojo.Log.info( "====================== /DUMP =======================" );
}

function arrayToObject( arr ){
	var obj = {};
	for( var i = 0; i < arr.length; i++ ) obj[arr[i]] = "";
	return obj;
}

function ISO8601Parse(dString){
    var date = new Date(0);
    var regexp = /(\d\d\d\d)(-)?(\d\d)(-)?(\d\d)(T)?(\d\d)(:)?(\d\d)(:)?(\d\d)(\.\d+)?(Z|([+-])(\d\d)(:)?(\d\d))/;
    if (dString.toString().match(new RegExp(regexp))) {
	var d = dString.match(new RegExp(regexp));
	date.setUTCFullYear(parseInt(d[1],10));
	date.setUTCMonth(parseInt(d[3],10) - 1);
	date.setUTCDate(parseInt(d[5],10));
	date.setUTCHours(parseInt(d[7],10));
	date.setUTCMinutes(parseInt(d[9],10));
	date.setUTCSeconds(parseInt(d[11],10));
	if (d[12])
	    date.setUTCMilliseconds(parseFloat(d[12]) * 1000);
	else
	    date.setUTCMilliseconds(0);
	if (d[13] != 'Z') {
	    var offset = 0;
	    offset = (d[15] * 60) + parseInt(d[17],10);
	    offset *= ((d[14] == '-') ? -1 : 1);
	    date.setTime(date.getTime() - offset * 60 * 1000);
	}
    }
    else {
	date.setTime(Date.parse(dString));
    }
    return date;
};
