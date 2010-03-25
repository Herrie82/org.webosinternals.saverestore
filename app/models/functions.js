function dumpObject( obj ){
        Mojo.Log.info( "====================== DUMP ========================" );
        for( var i in obj ){
                Mojo.Log.info( i + ": " + obj[i] );
        }
        Mojo.Log.info( "====================== /DUMP =======================" );
}