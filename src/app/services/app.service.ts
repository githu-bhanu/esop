import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { HttpLayerService } from './http-layer.service';
import { Config } from '../config/config';


@Injectable({
  providedIn: 'root'
})
export class AppService {

  public headerTab = new Subject<any>();
  public headerTabRoute = new Subject<any>();

  constructor(private _http: HttpClient, private _httplayer: HttpLayerService) {
  }

  // ----------------------------Service call Types--------------------------------//
  postService(api: string, data: any) {
    return this._httplayer.post(api, data);
  }

  getService(api: string, data?: undefined) {
    if (data) {
      return this._httplayer.get(api, data);
    }
    return this._httplayer.get(api);
  }

  deleteService(api: string, data: any) {
    return this._httplayer.delete(api, data);
  }

  // ------------------------------Route Functions--------------------------------------//
  getCurrentUrl(route: any) {
    const mainUrl = window.location.href.split('/#/');
    return mainUrl[0] + '/#/' + route;
  }

  // -----------------------------MQTT Functions-----------------------------------------//
  getMqttConfigDetails(payload: any): Observable<any> {
    return this.postService(Config.API.GET_MQTT_CONFIG_DETAILS, payload);
  }

  registerMqttTopics(payload: any): Observable<any> {
    return this._httplayer.post(Config.API.REGISTER_MQTT_TOPICS, payload);
  }

  // Service call Functions

















//-----------------------------------Side Menu-------------------------//
getSidebarMenusList(data: any): Observable<any> {
  return this._httplayer.get('assets/jsons/sidebar.json');
  // return this._httplayer.post(Config.API.LEFT_SIDE_BAR, data);
}

// Hierarchy

fetchLevels(payload?: any): Observable<any> {
  return this._httplayer.post(Config.API.FETCH_LEVELS, payload);
}

getHierarchyTable(payload?: any): Observable<any> {
  // return this._httplayer.get('assets/jsons/sites.json');
  return this._httplayer.post(Config.API.FETCH_LEVEL_TABLE, payload);
}

fetchLevelTemplate(payload?: any): Observable<any> {
  return this._httplayer.post(Config.API.FETCH_LEVEL_TEMPLATE, payload);
}

createHierarchyItem(payload?: any): Observable<any> {
  return this._httplayer.post(Config.API.CREATE_HIERARCHY_ITEM, payload);
}

updateHierarchyItem(payload?: any): Observable<any> {
  return this._httplayer.post(Config.API.UPDATE_HIERARCHY_ITEM, payload);
}

fetchHierarchyItem(payload?: any): Observable<any> {
  return this._httplayer.post(Config.API.FETCH_HIEARARCHY_LEVEL, payload);
}

deleteHierarchyItem(payload?: any): Observable<any> {
  return this._httplayer.post(Config.API.DELETE_HIERARCHY_ITEM, payload);
}

// Parameters

fetchParameters(payload: any): Observable<any> {
  return this._httplayer.post(Config.API.FETCH_PARAMETERS, payload);
}

createParameter(payload: any): Observable<any> {
  return this._httplayer.post(Config.API.CREATE_PARAMETER, payload);
}

updateParameter(payload: any): Observable<any> {
  return this._httplayer.post(Config.API.UPDATE_PARAMETER, payload);
}

deleteParameter(payload: any): Observable<any> {
  return this._httplayer.post(Config.API.DELETE_PARAMETER, payload);
}

// User & User roles Table 

getUserDetails(payload?: any): Observable<any> {
  return this._httplayer.post(Config.API.FETCH_USERS, payload);
  // return this._httplayer.get('assets/jsons/get_user_details.json', payload);
}

deleteUser(payload: any): Observable<any> {
  return this._httplayer.post(Config.API.DELETE_USER, payload);
  // return this._httplayer.get('assets/jsons/delete_user.json', payload);
}

fetchUser(payload: any): Observable<any> {
  return this._httplayer.post(Config.API.FETCH_USER, payload);
  // return this._httplayer.get('assets/jsons/fetch_user.json', payload);
}

createUser(payload: any): Observable<any> {
  return this._httplayer.post(Config.API.CREATE_USER, payload);
  // return this._httplayer.get('assets/jsons/save_user.json', payload);
}

updateUser(payload: any): Observable<any> {
  return this._httplayer.post(Config.API.UPDATE_USER, payload);
  // return this._httplayer.get('assets/jsons/save_user.json', payload);
}

fetchUserRolesDropdown(payload: any): Observable<any> {
  return this._httplayer.post(Config.API.FETCH_USER_ROLES_DROPDOWN, payload);
}

getUserRoleDetails(payload?: any): Observable<any> {
  // return this._httplayer.post(Config.API.FETCH_USER_ROLES, payload);
  return this._httplayer.get('assets/jsons/get_user_role_details.json', payload);
}

deleteUserRole(payload: any): Observable<any> {
  return this._httplayer.post(Config.API.DELETE_USER_ROLE, payload);
  // return this._httplayer.get('assets/jsons/delete_user_role.json', payload);
}

fetchUserAccessPermissions(payload: any): Observable<any> {
  return this._httplayer.post(Config.API.FETCH_USER_ACCESS_PERMISSIONS, payload);
  // return this._httplayer.get('assets/jsons/fetch_user_access_permissions.json');
}

fetchUserRole(payload: any): Observable<any> {
  return this._httplayer.post(Config.API.FETCH_USER_ROLE, payload);
  // return this._httplayer.get('assets/jsons/fetch_user_role.json', payload);
}

createUserRole(payload: any): Observable<any> {
  return this._httplayer.post(Config.API.CREATE_USER_ROLE, payload);
  // return this._httplayer.get('assets/jsons/save_user_role.json', payload);
}

updateUserRole(payload: any): Observable<any> {
  return this._httplayer.post(Config.API.UPDATE_USER_ROLE, payload);
  // return this._httplayer.get('assets/jsons/save_user_role.json', payload);
}

// Projects
loadProjects(payload: any): Observable<any> {
  return this._httplayer.post(Config.API.FETCH_PROJECTS, payload);
  // return this._httplayer.get('assets/jsons/save_user_role.json', payload);
}

// Asset Dashboard

getHierarchyTree(payload: any): Observable<any> {
  return this._httplayer.get('assets/jsons/hierarchy-tree.json', payload);
  // return this._httplayer.post(Config.API.GET_HIERARCHY_TREE, payload);
}




























  // ----------------------------App Component-------------------------------------------//
  getConfigurationJSON() {
    return this._httplayer.get('assets/jsons/configuration.json');
  }
  getTokenInfo(query = ''): Observable<any> {
    return this._httplayer.get(Config.API.GET_TOKEN + query);
  }

  // -----------------------------Modal Component-----------------------------------------//
  // userLogin(data: any): Observable<any> {
  //   return this.postService(Config.API.GET_AD_TOKEN, data);
  // }

  // ------------------------------Login Component---------------------------------------//
  loginUser(data: any): Observable<any> {
    return this.postService(Config.API.LOGIN_USER, data);
  }
  // getCaptcha(data: any): Observable<any> {
  //   return this.postService(Config.API.GET_CAPTCHA, data);
  // }
  // forgotPassword(data: any): Observable<any> {
  //   return this.postService(Config.API.FORGOT_PASSWORD, data);
  // }
  // resetPassword(data: any): Observable<any> {
  //   return this.postService(Config.API.RESET_PASSWORD, data);
  // }
  getBaseProject(data: any): Observable<any> {
    return this.getService(Config.API.GET_BASE_PROJECT);
  }

  //------------------------------------Log Out--------------------------//
  logoutUser(data: any): Observable<any> {
    return this.postService(Config.API.LOGOUT_USER, data);
  }

  //------------------------------------Tags--------------------------------//
  fetchTags(): Observable<any> {
    return this._httplayer.get('assets/jsons/tags.json');
  }

  createTag(payload: any): Observable<any> {
    return this._httplayer.get('assets/jsons/create_tag.json', payload);
  }

  deleteTags(payload: any): Observable<any> {
    return this._httplayer.get('assets/jsons/delete_tags.json', payload);
  }

  // header

  getProfileImage(): Observable<any> {
    return this.getService(Config.API.GET_PROFILE_IMAGE);
  }

  fetchProjects(): Observable<any> {
    return this.getService(Config.API.FETCH_PROJECT_LIST);
    // return this.getService('assets/jsons/view-all-projects.json');
  }

  updatePassword(data): Observable<any> {
    return this.postService(Config.API.UPDATE_PASSWORD, data);
  }

  saveUser(data): Observable<any> {
    return this.postService(Config.API.CREATE_USER, data);
  }

  saveProfileImage(data): Observable<any> {
    return this.postService(Config.API.SAVE_PROFILE_IMAGE, data);
  }


  // to be deleted
  getSites(): Observable<any> {
    return this._httplayer.get('assets/jsons/delete_user.json');
  }

  deleteSite(payload: any): Observable<any> {
    return this._httplayer.get('assets/jsons/delete_user.json', payload);
  }

  getLines(payload?: any): Observable<any> {
    return this._httplayer.get('assets/jsons/lines.json', payload);
  }

  deleteLine(payload: any): Observable<any> {
    return this._httplayer.get('assets/jsons/delete_user.json', payload);
  }

  getEquipments(payload?: any): Observable<any> {
    return this._httplayer.get('assets/jsons/equipments.json', payload);
  }

  deleteEquipment(payload: any): Observable<any> {
    return this._httplayer.get('assets/jsons/delete_user.json', payload);
  }

  getAssets(payload?: any): Observable<any> {
    return this._httplayer.get('assets/jsons/equipments.json', payload);
  }

  deleteAsset(payload: any): Observable<any> {
    return this._httplayer.get('assets/jsons/delete_user.json', payload);
  }

  getTemplate(id): Observable<any> {
    return this._httplayer.get(`assets/jsons/level${id}_template.json`);
  }

  // Device Param Components
  getDeviceParamChartData(payload?: any): Observable<any> {
    return this._httplayer.get(`assets/jsons/device-param-chart${payload['chNo']}.json`, payload);
  }
}