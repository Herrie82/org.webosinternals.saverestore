/*=============================================================================
 Copyright (C) 2010 WebOS Internals <support@webos-internals.org>

 This program is free software; you can redistribute it and/or
 modify it under the terms of the GNU General Public License
 as published by the Free Software Foundation; either version 2
 of the License, or (at your option) any later version.

 This program is distributed in the hope that it will be useful,
 but WITHOUT ANY WARRANTY; without even the implied warranty of
 MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 GNU General Public License for more details.

 You should have received a copy of the GNU General Public License
 along with this program; if not, write to the Free Software
 Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.
 =============================================================================*/

#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <unistd.h>

#include "luna_service.h"
#include "luna_methods.h"

#define ALLOWED_CHARS "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789.-"

static char *scriptdir = "/var/svc/org.webosinternals.saverestore";

bool status_method(LSHandle* lshandle, LSMessage *message, void *ctx) {

  bool returnVal = true;

  LSError lserror;
  LSErrorInit(&lserror);

  char *jsonResponse = 0;
  int len = 0;

  len = asprintf(&jsonResponse, "{\"returnValue\":true}", VERSION);
  if (jsonResponse) {
    LSMessageReply(lshandle, message, jsonResponse, &lserror);
    free(jsonResponse);
  } else
    LSMessageReply(lshandle, message, "{\"returnValue\":false,\"errorCode\":-1,\"errorText\":\"Generic error\"}", &lserror);

  LSErrorFree(&lserror);

  return returnVal;
}

bool list_method(LSHandle* lshandle, LSMessage *message, void *ctx) {

  bool returnVal = true;
  char line[MAXLINELEN];
  // %%% MAGIC NUMBERS ALERT %%%
  char name[128];

  LSError lserror;
  LSErrorInit(&lserror);

  char *jsonResponse = 0;
  int len = 0;

  json_t *response = json_new_object();

  char command[128];

  // %%% IGNORING RETURN ALERT %%%
  sprintf((char *)&command, "/bin/ls -1 %s/ 2>&1", scriptdir);

  FILE *fp = popen(command, "r");
  if (fp) {
    json_t *array = json_new_array();
    while ( fgets( line, sizeof line, fp)) {
      // %%% MAGIC NUMBERS ALERT %%%
      if (sscanf(line, "%127s\n", (char*)&name) == 1) {
	if (strncmp(name, "srf.", 4)) {
	  // %%% IGNORING RETURN ALERT %%%
	  json_insert_child(array, json_new_string(name));
	}
      }
    }
    if (!pclose(fp)) {
      // %%% IGNORING RETURN ALERT %%%
      json_insert_pair_into_object(response, "returnValue", json_new_true());
      json_insert_pair_into_object(response, "scripts", array);
    }
    else {
      // %%% IGNORING RETURN ALERT %%%
      json_insert_pair_into_object(response, "returnValue", json_new_false());
    }
    json_tree_to_string(response, &jsonResponse);
  }

  if (jsonResponse) {
    LSMessageReply(lshandle, message, jsonResponse, &lserror);
    free(jsonResponse);
  } else
    LSMessageReply(lshandle, message, "{\"returnValue\":false,\"errorCode\":-1,\"errorText\":\"Generic error\"}", &lserror);
 
  json_free_value(&response);
  LSErrorFree(&lserror);

  return returnVal;
}

bool saverestore_method(LSHandle* lshandle, LSMessage *message, void *ctx, char *action) {

  bool returnVal = true;
  char line[MAXLINELEN];
  // %%% MAGIC NUMBERS ALERT %%%
  char name[128];

  LSError lserror;
  LSErrorInit(&lserror);

  char *jsonResponse = 0;
  int len = 0;

  json_t *object = LSMessageGetPayloadJSON(message);

  json_t *id = json_find_first_label(object, "id");               
  if (strspn(id->child->text, ALLOWED_CHARS) != strlen(id->child->text)) {
    LSMessageReply(lshandle, message, "{\"returnValue\":false,\"errorCode\":-1,\"errorText\":\"Invalid id\"}", &lserror);
    LSErrorFree(&lserror);
    return true;
  }

  // %%% MAGIC NUMBERS ALERT %%%
  char command[128];

  // %%% IGNORING RETURN ALERT %%%
  sprintf((char *)&command, "%s/%s %s 2>&1", scriptdir, id->child->text, action);

  json_t *response = json_new_object();

  FILE *fp = popen(command, "r");
  if (fp) {
    json_t *array = json_new_array();
    while ( fgets( line, sizeof line, fp)) {
      // %%% MAGIC NUMBERS ALERT %%%
      if (sscanf(line, "%127c\n", (char*)&name) == 1) {
	// %%% IGNORING RETURN ALERT %%%
	json_insert_child(array, json_new_string(name));
      }
    }
    if (!pclose(fp)) {
      // %%% IGNORING RETURN ALERT %%%
      json_insert_pair_into_object(response, "returnValue", json_new_true());
    }
    else {
      // %%% IGNORING RETURN ALERT %%%
      json_insert_pair_into_object(response, "returnValue", json_new_false());
    }
    json_insert_pair_into_object(response, "output", array);
    json_tree_to_string(response, &jsonResponse);
  }

  if (jsonResponse) {
    LSMessageReply(lshandle, message, jsonResponse, &lserror);
    free(jsonResponse);
  } else
    LSMessageReply(lshandle, message, "{\"returnValue\":false,\"errorCode\":-1,\"errorText\":\"Generic error\"}", &lserror);
 
  json_free_value(&response);
  LSErrorFree(&lserror);

  return returnVal;
}

bool save_method(LSHandle* lshandle, LSMessage *message, void *ctx) {
  return saverestore_method(lshandle, message, ctx, "save");
}

bool restore_method(LSHandle* lshandle, LSMessage *message, void *ctx) {
  return saverestore_method(lshandle, message, ctx, "restore");
}

LSMethod luna_methods[] = {
  { "status",	status_method },
  { "list",	list_method },
  { "save",	save_method },
  { "restore",	restore_method },
  { 0, 0 }
};

bool register_methods(LSPalmService *serviceHandle, LSError lserror) {
  return LSPalmServiceRegisterCategory(serviceHandle, "/", luna_methods,
				       NULL, NULL, NULL, &lserror);
}
