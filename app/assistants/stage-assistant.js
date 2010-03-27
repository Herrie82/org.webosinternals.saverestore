function StageAssistant() {
    /* this is the creator function for your stage assistant object */
}

StageAssistant.prototype.setup = function() {
    /* this function is for setup tasks that have to happen when the stage is first created */
    // TODO - we should push a loading scene to show while polling the service
    // then we push main once the load is complete, or show dialog on error
    appDB = new Applications(this);
    //this.controller.pushScene("main");
};
