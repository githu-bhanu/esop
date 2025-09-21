import { environment } from './../../environments/environment';

const domain = window.location.href.split('#')[0].split('://')[0];
const host_domain = window.location.host;
export class Config {
    public static get BASE_API(): string { return environment.BASE_API; }
    public static get COLOR_LIST(): any { return this.ColorCodesList; }
    public static API: any = {

      // LEFT_SIDE_BAR
      LEFT_SIDE_BAR:  Config.BASE_API + 'projects/fetch_sidebar',

      // Hierarchy
      FETCH_LEVELS: Config.BASE_API + 'projects/fetch_levels',
      FETCH_LEVEL_TABLE: Config.BASE_API + 'levels/fetch_level',
      FETCH_LEVEL_TEMPLATE: Config.BASE_API + 'projects/fetch_level_template',
      CREATE_HIERARCHY_ITEM: Config.BASE_API + 'levels/create_level',
      UPDATE_HIERARCHY_ITEM: Config.BASE_API + 'levels/update_level',
      FETCH_HIEARARCHY_LEVEL: Config.BASE_API + 'levels/edit_fetch_level',
      DELETE_HIERARCHY_ITEM: Config.BASE_API + 'levels/delete_level',

      // Parameter
      FETCH_PARAMETERS: Config.BASE_API + 'levels/fetch_parameters',
      CREATE_PARAMETER: Config.BASE_API + 'levels/create_parameter',
      UPDATE_PARAMETER: Config.BASE_API + 'levels/update_parameter',
      DELETE_PARAMETER: Config.BASE_API + 'levels/delete_parameter',

      // Users
      FETCH_USERS: Config.BASE_API + 'users/fetch_users',
      CREATE_USER: Config.BASE_API + 'users/create_user',
      UPDATE_USER: Config.BASE_API + 'users/update_user',
      FETCH_USER: Config.BASE_API + 'users/edit_fetch_user',
      DELETE_USER: Config.BASE_API + 'users/delete_user',
      
      // User Roles
      FETCH_USER_ROLES_DROPDOWN : Config.BASE_API + 'users/user_role_dropdown',
      FETCH_USER_ROLES: Config.BASE_API + 'users/fetch_user_roles',
      CREATE_USER_ROLE: Config.BASE_API + 'users/create_user_role',
      UPDATE_USER_ROLE: Config.BASE_API + 'users/update_user_role',
      FETCH_USER_ROLE: Config.BASE_API + 'users/edit_fetch_user_roles',
      DELETE_USER_ROLE: Config.BASE_API + 'users/delete_user_role',
      FETCH_USER_ACCESS_PERMISSIONS: Config.BASE_API + 'users/user_modules_json',

      // Project
      FETCH_PROJECTS: Config.BASE_API + 'projects/fetch_project_dropdown',

      // Asset Dashboard
      GET_HIERARCHY_TREE: Config.BASE_API + 'levels/fetch_hierarchy'

         // App Component
        //  GET_TOKEN: Config.BASE_API + 'get_token',

         // Login Component
        //  LOGIN_USER: Config.BASE_API + 'login',
        //  GET_CAPTCHA: Config.BASE_API + 'get_captcha_image',
        //  FORGOT_PASSWORD: Config.BASE_API + 'user/forgot_password',
        //  RESET_PASSWORD: Config.BASE_API + 'user/reset_password',

         //Log Out
        //  LOGOUT_USER: Config.BASE_API + 'logout',

    }
    public static getRandomColor() {
        return Math.floor(Math.random() * 16777215).toString(16);
    }
    public static CONSTANTS: any = {
        timeoutSec: 20,
        debounceTime: 1500,
        BYPASS_SIGNATURE_LIST: [],
        MQTT: {
          ip: host_domain,
          port: domain === 'http' ? '8982' : '8982',
          ws: domain === 'http' ? 'ws://' : 'wss://'
        },
        userLabels: {
          users: {
              label: 'Users',
              configRoute: 'app/user-mt/user-table/users',
              messageLabel: 'User',
              errorLabel: 'user',
              permissionKey: 'users',
              titleKey: 'username',
          },
          'user-roles': {
              label: 'User Roles',
              configRoute: 'app/user-mt/user-table/user-roles',
              messageLabel: 'User Role',
              errorLabel: 'user role',
              permissionKey: 'user_roles',
              titleKey: 'role',
          }
        },
        headerTabs: []
      }
      public static PROJECTCONSTANTS: any = {
        
      };
      public static HEADERCOMPCONSTANTS = {
        THEMES: {
          "dark-blue": {
            bgColor: "#001d6c",
          },
          // 'light': {
          //   "bgColor":"#DFE1E6"
          // },
          "high-contrast-dark": {
            bgColor: "#000000",
          },
        },
        SUBMENUTHEMES: {
          "dark-blue": {
            bgColor: "#002d9c",
          },
          // 'light': {
          //   "bgColor":'#f0f0f0'
          // },
          "high-contrast-dark": {
            bgColor: "#000000",
          },
        },
        projectThemes: [
          {
            theme: 'default-skin',
            tableClass: 'ag-theme-alphine',
            label: 'Default'
          },
          {
            theme: 'flourish-theme',
            tableClass: 'ag-theme-flourish',
            label: 'Flourish'
          },
          {
            theme: 'indigo-theme',
            tableClass: 'ag-theme-indigo',
            label: 'Indigo Blue'
          }
        ],
        defaultTheme: {
          theme: 'flourish-theme',
          tableClass: 'ag-theme-flourish',
          label: 'Flourish'
        },
        CLASSNAMES: ["app-header", "mini-sidebar-menu"],
        SUBCLASSNAMES: ["text-white", "indication", "each-item"],
      };
      public static ALERT_MESSAGES: any = {
        CONFIRM_ALART_MESSAGE: 'Are you sure do you want to cancel? Any changes made cannot be saved.'
      }
      public static ColorCodesList: any = [];  // color list valiable
      public static setColorCodes() {
        if (this.ColorCodesList.length > 0) {
          return;
        }
        this.ColorCodesList = [];
        while (this.ColorCodesList.length <= 1000) {
          let color = this.getRandomColor();
          while (this.ColorCodesList.indexOf(color) > 0 || color.toString().length !== 6) {
            color = this.getRandomColor();
          }
          this.ColorCodesList.push(color);
        }
      }
}
