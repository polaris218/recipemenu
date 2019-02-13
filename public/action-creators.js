// Our action creator just gets the current time in a delayed fashion to illustrate the use of the promise
// middleware.

// The promise middleware works by waiting for either:
// 1) an action with this format:
//    {
//      types: [REQUEST, SUCCESS, FAILURE], // actions types given in this specific order
//      promise: function() {
//        // return a promise
//      }
//    }
// 2) or anything else what would be passed to the next middleware or to Redux (actually, with this
//    implementation of the promise middleware, the "anything else" has to NOT contain a promise
//    property to be passed to the next middleware or Redux)

// When the promise middleware receives this action, it will create 2 actions from this one:
// 1 action for the REQUEST and later 1 action for the SUCCESS or the FAILURE of the action creator.

// Again, the code for the promise middleware is not complicated and it is worth having a look
// at it (./promise-middleware.js)

// The action is delayed by "delay" ms passed as a parameter of the action creator. Try to change
// this value to verify that the delay correctly impacts our UI.

import * as AuthService from './components/Auth/auth.service';
import * as AnalyticsService from './components/Analytics/analytics.service';
import * as MenuService from './components/Menu/menu.service';
import * as ImageService from './components/Image/image.service';
import * as ProfileService from './components/Profile/profile.service';
import * as LanguageService from './components/Language/language.service';
import * as CuisineService from './components/Cuisine/cuisine.service';
import * as CurrencyService from './components/Currency/currency.service';
import * as BranchService from './components/Profile/branch.service';
import * as MenuCategoryService from './components/Menu/menu-category.service';

import { StorageManagerInstance } from './shared/storage.utils';

export function getTime (delay) {
  return {
    types: ['GET_TIME_REQUEST', 'GET_TIME_SUCCESS', 'GET_TIME_FAILURE'],
    promise: () => {
      return new Promise((resolve, reject) => {
        // Just simulating an async request to a server via a setTimeout
        setTimeout(() => {
          const d = new Date()
          const ms = ('000' + d.getMilliseconds()).slice(-3)
          resolve({
            time: `${d.toString().match(/\d{2}:\d{2}:\d{2}/)[0]}.${ms}`
          })
        }, delay)
      })
    }
  }
};

export function getAnalytics (cb) {
  return {
    types: ['GET_ANALYTICS_REQUEST', 'GET_ANALYTICS_SUCCESS', 'GET_ANALYTICS_FAILURE'],
    promise: () => {
      return new Promise((resolve, reject) => {
        AnalyticsService.getAnalytics().then((res) => {
          console.log('request succeeded with JSON response', res);

          if (res && typeof cb === 'function') {
            cb(res);
          }

          resolve(res);
        });
      });
    }
  }
};

export function getMenu (data) {
  return {
    types: ['GET_MENU_REQUEST', 'GET_MENU_SUCCESS', 'GET_MENU_FAILURE'],
    promise: () => {
      return new Promise((resolve, reject) => {
        console.log(data);
        resolve(data);
      });
    }
  }
};

export function saveMenu (data, cb) {
  console.log(data);
  return {
    types: ['SAVE_MENU_REQUEST', 'SAVE_MENU_SUCCESSS', 'SAVE_MENU_FAILURE'],
    promise: () => {
      return new Promise((resolve, reject) => {

        MenuService.updateMenu(data).then((res) => {
          console.log('request succeeded with JSON response', res);

          if (res && typeof cb === 'function') {
            data.MenuID = data.MenuID ?  data.MenuID : res;
            cb(data);
          }
        }).catch(err => {
          console.log(err);
        });
      });
    }
  }
};

export function translateMenu (data, cb) {
  return {
    types: ['TRANSLATE_MENU_REQUEST', 'TRANSLATE_MENU_SUCCESS', 'TRANSLATE_MENU_FAILURE'],
    promise: () => {
      return new Promise((resolve, reject) => {
        MenuService.translateMenu(data, 'text').then((res) => {
          console.log('request succeeded with JSON response', res);

          if (res && typeof cb === 'function') {
            cb(data);
          }
        });
      });
    }
  }
};

export function getMenus (cb) {
  return {
    types: ['GET_MENUS_REQUEST', 'GET_MENUS_SUCCESS', 'GET_MENUS_FAILURE'],
    promise: () => {
      return new Promise((resolve, reject) => {
        MenuService.getMenus().then((res) => {
          console.log('request succeeded with JSON response', res);

          if (res && typeof cb === 'function') {
            cb(res);
          }
        });
      });
    }
  }
};

export function getMenuTranslations (cb) {
  return {
    types: ['GET_MENU_TRANSLATIONS_REQUEST', 'GET_MENU_TRANSLATIONS_SUCCESS', 'GET_MENU_TRANSLATIONS_FAILURE'],
    promise: () => {
      return new Promise((resolve, reject) => {
        MenuService.getMenuTranslations().then((res) => {
          console.log('request succeeded with JSON response', res);

          if (res && typeof cb === 'function') {
            cb(res);
          }
        });
      });
    }
  }
};

export function setMenu (menu, data) {
  let finalMenu;

  if (!data || data.length <= 0) {
    finalMenu = menu;
  } else {
    finalMenu = Object.assign({}, menu);
    let dataKey = Object.keys(data)[0];
    let isValid = Object.keys(finalMenu).filter((key) => {
      return key === Object.keys(data)[0];
    }).length > 0;

    finalMenu[dataKey] = data[dataKey];
  }

  console.log(finalMenu, 'finalMenu');

  return {
    types: ['SET_MENU_REQUEST', 'SET_MENU_SUCCESS', 'SET_MENU_FAILURE'],
    promise: () => {
      return new Promise((resolve, reject) => {
        resolve(
          finalMenu
        );
      });
    }
  };
};

export function setBranches (branches, data, branchId) {
  console.log(branches);
  let returnResult = (res) => {
    return {
      types: ['SET_BRANCHES_REQUEST', 'SET_BRANCHES_SUCCESS', 'SET_BRANCHES_FAILURE'],
      promise: () => {
        return new Promise((resolve, reject) => {
          resolve(
            res
          );
        });
      }
    };
  };

  let formatImages = (images, id) => {
    if (!images || images.length <= 0) {
      return images || [];
    }

    return images.map(image => {
      let newImage = image;
      if (!newImage.branchId) {
        newImage.branchId = id || 0;
      }

      return newImage;
    });
  };

  let getFinalBranches = (branches, newData) => {
    let finalBranches = [Object.assign({}, ...branches)];
    let newBranch = addNewBranch(finalBranches, newData);
    console.log(newBranch);
    finalBranches.push(newBranch);
    console.log(finalBranches);
    return finalBranches;
  };

  let addNewBranch = (branches, data) => {
    let newBranch = Object.keys(data).reduce((acc, key) => {
      acc[key] = data[key];
      return acc;
    }, {});

    return newBranch;
  };

  let dataKey = Object.keys(data)[0];
  data.images = formatImages(data.images, branchId);

  if (!branchId) {
    return returnResult(getFinalBranches(branches, data));
  }

  const targetBranch = branches.find(branch => branch.BranchID === branchId);
  let newBranch = targetBranch;

  targetBranch[dataKey] = data[dataKey];
  Object.assign(targetBranch, newBranch);

  console.log(branches);

  return returnResult(branches);
};

export function saveBranches (branches, cb) {
  console.log(branches);
  return {
    types: ['SAVE_BRANCHES_REQUEST', 'SAVE_BRANCHES_SUCCESS', 'SAVE_BRANCHES_FAILURE'],
    promise: () => {
      return new Promise((resolve, reject) => {
        Promise.all(branches.map(branch => {
          return BranchService.updateBranch(branch).then((res) => {
            console.log('request succeeded with JSON response', res);
            return res;
          });
        })).then(res => {
          console.log(res);

          if (res && typeof cb === 'function') {
            cb(res);
          }

          resolve(res);
        });
      });
    }
  };
};

export function saveBranch (branch, cb) {
  console.log(branch);
  return {
    types: ['SAVE_BRANCH_REQUEST', 'SAVE_BRANCH_SUCCESS', 'SAVE_BRANCH_FAILURE'],
    promise: () => {
      return new Promise((resolve, reject) => {
        BranchService.updateBranch(branch).then((res) => {
          console.log('request succeeded with JSON response', res);

          if (res && typeof cb === 'function') {
            cb(res);
          }

          resolve(res);
        });
      });
    }
    /*
    types: ['SAVE_BRANCHES_REQUEST', 'SAVE_BRANCHES_SUCCESS', 'SAVE_BRANCHES_FAILURE'],
    promise: () => {
      return new Promise((resolve, reject) => {
        BranchService.updateBranches(branches).then((res) => {
          console.log('request succeeded with JSON response', res);

          if (res && typeof cb === 'function') {
            cb(res);
          }

          resolve(res);
        }).catch(err => {
          console.error(err);
          reject(err);
        });
      });
    }
    */
  }
};

export function deleteBranch (branch, cb) {
  console.log(branch);
  return {
    types: ['DELETE_BRANCH_REQUEST', 'DELETE_BRANCH_SUCCESS', 'DELETE_BRANCH_FAILURE'],
    promise: () => {
      return new Promise((resolve, reject) => {
        console.log('SHOULD DELETE BRANCH HERE');

        BranchService.deleteBranch(branch).then((res) => {
          console.log('request succeeded with JSON response', res);

          if (res && typeof cb === 'function') {
            cb(res);
          }

          resolve(res);
        });
      });
    }
  }
};


export function deleteMenu (menu, cb) {
  console.log(menu);
  return {
    types: ['DELETE_MENU_REQUEST', 'DELETE_MENU_SUCCESS', 'DELETE_MENU_FAILURE'],
    promise: () => {
      return new Promise((resolve, reject) => {
        console.log('WHY DOES IT DELETE DIRECTLY???');

        MenuService.deleteMenu(menu).then((res) => {
          console.log('request succeeded with JSON response', res);

          if (res && typeof cb === 'function') {
            cb(res);
          }

          resolve(res);
        });
      });
    }
  }
};


export function setPopup (data, cb) {
  return {
    types: ['SET_POPUP_REQUEST', 'SET_POPUP_SUCCESS', 'SET_POPUP_FAILURE'],
    promise: () => {
      return new Promise((resolve, reject) => {
        console.log(data);

        if (typeof cb === 'function') {
          cb(data);
        }

        resolve(data);
      });
    }
  }
};

export function getCategories (type, cb) {
  return {
    types: ['GET_CATEGORIES_REQUEST', 'GET_CATEGORIES_SUCCESS', 'GET_CATEGORIES_FAILURE'],
    promise: () => {
      return new Promise((resolve, reject) => {
        MenuCategoryService.getCategories(type).then((res) => {
          console.log('request succeeded with JSON response', res);

          if (res && typeof cb === 'function') {
            cb(res);
          }

          resolve(res);
        });
      });
    }
  }
};

export function getLanguages (cb) {
  return {
    types: ['GET_LANGUAGES_REQUEST', 'GET_LANGUAGES_SUCCESS', 'GET_LANGUAGES_FAILURE'],
    promise: () => {
      return new Promise((resolve, reject) => {
        LanguageService.getLanguages().then((res) => {
          console.log('request succeeded with JSON response', res);

          if (res && typeof cb === 'function') {
            cb(res);
          }

          resolve(res);
        });
      });
    }
  }
};

/*
export function getCurrentLanguage (nav, location, cb) {
  return {
    types: ['GET_CURRENT_LANGUAGE_REQUEST', 'GET_CURRENT_LANGUAGE_SUCCESS', 'GET_CURRENT_LANGUAGE_FAILURE'],
    promise: () => {
      return new Promise((resolve, reject) => {
        LanguageService.getCurrentLanguage(nav, location).then((res) => {
          console.log('Language successfully retrieved', res);

          if (res && typeof cb === 'function') {
            cb(res);
          }

          resolve(res);
        });
      });
    }
  }
};
*/

export function setCurrentLanguage (lang, cb) {
  return {
    types: ['SET_CURRENT_LANGUAGE_REQUEST', 'SET_CURRENT_LANGUAGE_SUCCESS', 'SET_CURRENT_LANGUAGE_FAILURE'],
    promise: () => {
      return new Promise((resolve, reject) => {
        console.log(lang);

        if (typeof cb === 'function') {
          cb(lang);
        }

        resolve(lang);
      });
    }
  }
};



export function getCuisines (cb) {
  return {
    types: ['GET_CUISINES_REQUEST', 'GET_CUISINES_SUCCESS', 'GET_CUISINES_FAILURE'],
    promise: () => {
      return new Promise((resolve, reject) => {
        CuisineService.getCuisines().then((res) => {
          console.log('request succeeded with JSON response', res);

          if (res && typeof cb === 'function') {
            cb(res);
          }

          resolve(res);
        });
      });
    }
  }
};

export function getCurrencies (cb) {
  return {
    types: ['GET_CURRENCIES_REQUEST', 'GET_CURRENCIES_SUCCESS', 'GET_CURRENCIES_FAILURE'],
    promise: () => {
      return new Promise((resolve, reject) => {
        CurrencyService.getCurrencies().then((res) => {
          console.log('request succeeded with JSON response', res);

          if (res && typeof cb === 'function') {
            cb(res);
          }

          resolve(res);
        });
      });
    }
  }
};

export function getProfile (cb) {
  return {
    types: ['GET_PROFILE_REQUEST', 'GET_PROFILE_SUCCESS', 'GET_PROFILE_FAILURE'],
    promise: () => {
      return new Promise((resolve, reject) => {
        ProfileService.getProfile().then((res) => {
          console.log('request succeeded with JSON response', res);

          if (res && typeof cb === 'function') {
            cb(res);
          }

          resolve(res);
        });
      });
    }
  }
};

export function saveProfile (data, cb) {
  console.log(data);
  return {
    types: ['SAVE_PROFILE_REQUEST', 'SAVE_PROFILE_SUCCESS', 'SAVE_PROFILE_FAILURE'],
    promise: () => {
      return new Promise((resolve, reject) => {
        ProfileService.updateProfile(data).then((res) => {
          console.log('request succeeded with JSON response', res);

          if (res && typeof cb === 'function') {
            cb(res.obj);
          }

          resolve(res.obj);
        });
      });
    }
  }
};

// TO SAVE
export function uploadImage (data, cb) {
  return {
    types: ['UPLOAD_IMAGE_REQUEST', 'UPLOAD_IMAGE_SUCCESSS', 'UPLOAD_IMAGE_FAILURE'],
    promise: () => {
      return new Promise((resolve, reject) => {
        ImageService.uploadImage(data).then((res) => {
          console.log('request succeeded with JSON response', res);

          if (res && typeof cb === 'function') {
            cb(res);
          }

          resolve(res);
        })
      });
    }
  }
};

export function setProfile (profile, data) {
  let finalProfile = Object.assign({}, profile);
  let dataKey = Object.keys(data)[0];
  let isValid = Object.keys(finalProfile).filter((key) => {
    return key === Object.keys(data)[0];
  }).length > 0;


  finalProfile[dataKey] = data[dataKey];

  console.log(profile);
  console.log(finalProfile);

  return {
    types: ['SET_PROFILE_REQUEST', 'SET_PROFILE_SUCCESS', 'SET_PROFILE_FAILURE'],
    promise: () => {
      return new Promise((resolve, reject) => {
        resolve(
          finalProfile
        );
      });
    }
  };
};

export function getAuth (data, cb) {
  return {
    types: ['AUTH_REQUEST', 'AUTH_SUCCESS', 'AUTH_FAILURE'],
    promise: () => {
      return new Promise((resolve, reject) => {
        // If the token is already stored in localstorage, resolve
        let token = AuthService.isAuthenticated();
        console.log(data);
        console.log(token);
        if (token) {
          resolve(AuthService.getAuth());
          return;
        }

        // No data is specified, first time visit with no state
        if (Object.keys(data).length <= 0) {
          resolve({
            authenticated: false,
            completed: true
          });
          return;
        }

        AuthService.auth(data, {
          body: JSON.stringify(data),
          headers: {
            "content-type": "application/json",
            "cache-control": "no-cache"
          }
        }).then((res) => {
          console.log('request succeeded with JSON response', res);

          // If user is successfully logged in, Store the auth token in localStorage for further usage
          if (res.token && res.success) {
            StorageManagerInstance.save('token', res.token);
            if (typeof cb === 'function') {
              cb({
                authenticated: true,
                completed: true,
                token: res.token
              });
            }
            resolve({
              authenticated: true,
              completed: true,
              token: res.token
            });
          } else {
            reject({
              error: res.error,
              authenticated: false,
              completed: true
            });
          }
        }).catch((err) => {
          console.log('request failed', err);

          let error = err.error;

          if (err.error && err.error.response && err.error.response.status === 400) {
            error = 'Invalid credentials';
          }
          if (typeof cb === 'function') {
            cb({
              authenticated: false,
              completed: true,
              error: error
            });
          }

          reject({
            error: error,
            authenticated: false,
            completed: true
          })
        });
      });
    }
  }
};


export function signupUser (data, cb) {
  return {
    types: ['SIGNUP_REQUEST', 'SIGNUP_SUCCESS', 'SIGNUP_FAILURE'],
    promise: () => {
      return new Promise((resolve, reject) => {

        AuthService.signup(data, {
          body: JSON.stringify(data),
          headers: {
            "content-type": "application/json",
            "cache-control": "no-cache"
          }
        }).then((res) => {
          console.log('request succeeded with JSON response', res);
          // If user is successfully logged in, Store the auth token in localStorage for further usage
          if (res.token && res.success) {
            StorageManagerInstance.save('token', res.token);
            if (typeof cb === 'function') {
              cb({
                authenticated: true,
                completed: true,
                token: res.token
              });
            }
            resolve({
              authenticated: true,
              completed: true,
              token: res.token
            });
          } else {
            reject({
              error: res.error,
              authenticated: false,
              completed: true
            });
          }
        }).catch((err) => {
          console.log('request failed', err);

          let error = err.error;
          
          if (typeof cb === 'function') {
            cb({
              authenticated: false,
              completed: true,
              error: error
            });
          }

          reject({
            error: error,
            authenticated: false,
            completed: true
          })
        });
      });
    }
  }
};

export function forgotPassword (data, cb) {
  return {
    types: ['FORGOT_REQUEST', 'FORGOT_SUCCESS', 'FORGOT_FAILURE'],
    promise: () => {
      return new Promise((resolve, reject) => {
        AuthService.forgotPassword(data, {
          body: JSON.stringify(data),
          headers: {
            "content-type": "application/json",
            "cache-control": "no-cache"
          }
        }).then((res) => {
          console.log(res);
          // If user is successfully logged in, Store the auth token in localStorage for further usage
          if (res.success) {
            if (typeof cb === 'function') {
              cb({
                completed: true,
                message: res.message
              });
            }

            resolve({
              completed: true,
              message: res.message
            });
          } else {
            reject({
              error: res.error,
              completed: true
            });
          }
        }).catch((err) => {
          console.log('request failed', err);
          if (typeof cb === 'function') {
            cb({
              error: err.error,
              authenticated: false,
              completed: true
            });
          }
          reject({
            error: err.error,
            authenticated: false,
            completed: true
          })
        });
      });
    }
  }
};

export function checkResetCode(data, cb) {
  return {
    types: ['CHECK_RESET_CODE_REQUEST', 'CHECK_RESET_CODE_SUCCESS', 'CHECK_RESET_CODE_FAILURE'],
    promise: () => {
      return new Promise((resolve, reject) => {
        AuthService.checkResetCode(data, {
          body: JSON.stringify(data),
          headers: {
            "content-type": "application/json",
            "cache-control": "no-cache"
          }
        }).then((res) => {
          console.log(res);
          // If user is successfully logged in, Store the auth token in localStorage for further usage
          if (res.success) {
            if (typeof cb === 'function') {
              cb({
                completed: true,
                message: res.message
              });
            }

            resolve({
              completed: true,
              message: res.message
            });
          } else {
            reject({
              error: res.error,
              completed: true
            });
          }
        }).catch((err) => {
          console.log('request failed', err);
          if (typeof cb === 'function') {
            cb({
              error: err.error,
              authenticated: false,
              completed: true
            });
          }
          reject({
            error: err.error,
            authenticated: false,
            completed: true
          })
        });
      });
    }
  }
};

export function updatePassword(data, cb) {
  return {
    types: ['UPDATE_PASSWORD_REQUEST', 'UPDATE_PASSWORD_SUCCESS', 'UPDATE_PASSWORD_FAILURE'],
    promise: () => {
      return new Promise((resolve, reject) => {
        AuthService.updatePassword(data, {
          body: JSON.stringify(data),
          headers: {
            "content-type": "application/json",
            "cache-control": "no-cache"
          }
        }).then((res) => {
          console.log(res);
          // If user is successfully logged in, Store the auth token in localStorage for further usage
          if (res.success) {
            if (typeof cb === 'function') {
              cb({
                completed: true,
                message: res.message
              });
            }

            resolve({
              completed: true,
              message: res.message
            });
          } else {
            reject({
              error: res.error,
              completed: true
            });
          }
        }).catch((err) => {
          console.log('request failed', err);
          if (typeof cb === 'function') {
            cb({
              error: err.error,
              authenticated: false,
              completed: true
            });
          }
          reject({
            error: err.error,
            authenticated: false,
            completed: true
          })
        });
      });
    }
  }
};