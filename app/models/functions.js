function dumpObject( obj ){
    Mojo.Log.info( "=========================================================" );
    for( var i in obj ) Mojo.Log.info( i, obj[i] );
    Mojo.Log.info( "=========================================================" );
}
