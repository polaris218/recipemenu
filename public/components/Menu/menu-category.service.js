import { Ajax } from '../../shared/ajax.utils';

import { Mapping } from  '../../shared/mapping.utils';
import { StorageManagerInstance } from  '../../shared/storage.utils';

import * as Meal from './meal.service';

//
// POST
//


export function postMenuCategories (nextId, cats) {
    return Promise.all(cats.map((cat) => {
        return postMenuCategory(nextId, cat).then((newCatId) => {
            return Meal.postMeals(cat.meals, newCatId);
        })
    }));
}


export function postMenuCategory (nextId, cat) {
    console.log(cat);

    cat.menuId = nextId;

    if (cat.MenuCategoryID) {
        delete cat.MenuCategoryID;
    }

    return Ajax().post('/menu-category', {
        body: JSON.stringify(convertOpts(cat, false)),
        headers: {
            "content-type": "application/json",
            "cache-control": "no-cache",
            "x-access-token": StorageManagerInstance.read('token')
        }
    }).then(res => {
        if (!res || !res.success) {
            return Promise.reject(res);
        }

        let id = res.obj[0];

        return Promise.resolve(id);
    });
}

//
// UPDATE
//
export function updateMenuCategories (menuId, cats) {
    if (cats.length <= 0) {
        return removeMenuCategories();
    }
    return Promise.all(cats.map((cat) => {
        let catId = cat.MenuCategoryID || cat.menuCategoryId;
        if (catId) {
            console.log(cat)
            return updateMenuCategory(cat).then((newCatId) => {
                console.log(newCatId, 'test')
                return Meal.removeMeals(cat.meals, catId).then((newCatId) => {
                    return Meal.updateMeals(cat.meals, catId);
                });
            });
        }

        return postMenuCategory(menuId, cat).then((newCatId) => {
            return Meal.updateMeals(cat.meals, newCatId);
        });
    }));
}

export function updateMenuCategory (cat) {
    if (!cat.id && !cat.MenuCategoryID) {
        console.error('Category id is not specified!');
        return;
    }
    console.log(JSON.stringify(convertOpts(cat, true)), 'jjjjjjj')
    return Ajax().put('/menu-category', {
        body: JSON.stringify(convertOpts(cat, true)),
        headers: {
            "content-type": "application/json",
            "cache-control": "no-cache",
            "x-access-token": StorageManagerInstance.read('token')
        }
    });
}

export function removeSelectedMenuCategory (menu) {
    return Ajax().put('/menu-category-remove', {
        body: JSON.stringify(menu),
        headers: {
            "content-type": "application/json",
            "cache-control": "no-cache",
            "x-access-token": StorageManagerInstance.read('token')
        }
    });
}

function getMenuCategories (ids) {
    return Ajax().get('/menu-category', {
        headers: {
            "content-type": "application/json",
            "cache-control": "no-cache",
            "x-access-token": StorageManagerInstance.read('token')
        }
    }).then((res) => {
        if (!res || !res.success) {
            return Promise.reject(res);
        }

        let cats = res.obj;

        if (ids.length <= 0) {
            return cats;
        }

        return cats.filter((cat, index) => {
            return cat.MenuCategoryID === ids[index];
        });
    });
}

function _getCategories (type) {
    if (type !== 'standard') {
        return Promise.reject();
    }

    return Ajax().get('/category-standard', {
        headers: {
            "content-type": "application/json",
            "cache-control": "no-cache",
            "x-access-token": StorageManagerInstance.read('token')
        }
    });
}

export function getCategories (type) {
    return _getCategories(type).then(res => {
        if (!res || !res.success) {
            return Promise.reject(res);
        }

        return res.obj;
    });
}

export function getMenuCategory (id) {
    let categories;
    let meals;

    return Ajax().get('/menu-category', {
        headers: {
            "content-type": "application/json",
            "cache-control": "no-cache",
            "x-access-token": StorageManagerInstance.read('token')
        }
    }).then((res) => {
        if (!res || !res.success) {
            return Promise.reject(res);
        }

        let cats = res.obj;
        console.log(res.obj);

        return cats.filter((cat, index) => {
            return cat.MenuID === id;
        });
    }).then((res) => {
        console.log(res);
        console.log(id);

        categories = res;

        return Ajax().get('/meal', {
            headers: {
                "content-type": "application/json",
                "cache-control": "no-cache",
                "x-access-token": StorageManagerInstance.read('token')
            }
        });
    }).then((res) => {
        if (!res || !res.success) {
            return Promise.reject(res);
        }

        meals = res.obj;

        return _getCategories('standard');
    }).then((res) => {
        if (!res || !res.success) {
            return Promise.reject(res);
        }

        console.log(res.obj);

        let cats = categories.reduce((acc, menucat) => {
            let tmp = res.obj.filter(cat => {
                return parseInt(cat.CategoryStandardID, 10) === parseInt(menucat.CategoryID, 10);
            }).map(cat => {
                let newCat = cat;
                newCat.MenuCategoryID = menucat.MenuCategoryID;
                return newCat;
            });
            return (tmp && tmp.length > 0) ? acc.concat(tmp) : acc;
        }, []);

        console.log(categories); // menu categories
        console.log(cats);
        console.log(meals);


        let returns = (cats && cats.length > 0) ? cats.map((cat) => {
            let tmpcat = {
                catId: cat.MenuCategoryID,
                id: cat.CategoryStandardID,
                isCustom: false,
                title: cat.Title,
                description: cat.Description,
            };
            tmpcat.meals = meals.filter((meal) => {
                return parseInt(cat.MenuCategoryID, 10) === parseInt(meal.MenuCategoryID, 10);
            }).map((meal) => {
                return {
                    id: meal.MealID,
                    title: meal.Title,
                    description: meal.Description,
                    price: parseFloat(meal.Price) || null,
                    enableDetails: meal.enableDetails,
                    detail: {}
                };
            });
            return tmpcat;
        }) : null;

        console.log(returns);
        return Promise.resolve({
            id: id,
            categories: returns
        });
    });
}


//
// TRANSLATE
//

export function getMenuCategoryTranslations (ids) {
    return Ajax().get('/translate-menu-category', {
        headers: {
            "content-type": "application/json",
            "cache-control": "no-cache",
            "x-access-token": StorageManagerInstance.read('token')
        }
    }).then((res) => {
        if (!res || !res.success) {
            return Promise.reject(res);
        }

        let menuCategoryTranslations = res.obj;

        let menuCategoriesIds = res.obj.map(menu => menu.MenuCategoryID);

        // Get menu categories macthing menu id
        return Ajax().get('/menu-category', {
            headers: {
                "content-type": "application/json",
                "cache-control": "no-cache",
                "x-access-token": StorageManagerInstance.read('token')
            }
        }).then((res) => {
            if (!res || !res.success) {
                return Promise.reject(res);
            }

            let menucats = res.obj;

            let menuCategories = ids.reduce((acc, current) => {
                return acc.concat(res.obj.filter((cat) => {
                    return cat.MenuID === current;
                }));
            }, []);

            console.log(menuCategories);

            let menuCategories2 = menuCategories.reduce((acc, current) => {
                return acc.concat(menuCategoryTranslations.reduce((acc_translation, curr_translation) => {
                    let t = curr_translation;
                    t.MenuID = current.MenuID;
                    return (curr_translation.MenuCategoryID === current.MenuCategoryID)
                        ? acc_translation.concat(t)
                        : acc_translation;
                }, []));
            }, []);

            console.log(menuCategories2);

            

            return menuCategories2;
        });
    });
}

export function translateMenuCategories (menuId, langs, categories) {
    return Promise.all(categories.map((cat) => {
        return Meal.translateMeals(langs, cat.meals).then((res) => {
            return translateMenuCategory(menuId, langs, cat);
        });
    }));
}

export function translateMenuCategory (menuId, langs, cat) {
    return Ajax().get('/menu-category', {
        headers: {
            "content-type": "application/json",
            "cache-control": "no-cache",
            "x-access-token": StorageManagerInstance.read('token')
        }
    }).then((res) => {
        if (!res || !res.success) {
            return Promise.reject(res);
        }

        let cats = res.obj;

        return cats.find((c) => {
            return (c.CategoryID === cat.id || c.CategoryID === cat.CategoryID) && c.MenuID === menuId;
        }).MenuCategoryID;
    }).then(id => {
        if (!id) {
            console.error('Category id is not specified!');
            return;
        }

        // Must change to cat.Category
        const finalCat = (cat.Category) ? cat.Category: cat;

        let propsToTranslate = Object.keys(finalCat).filter((key) => {
            return (key === 'title' || key === 'Title') && (finalCat[key] && finalCat[key].length > 0);
        }).map((key) => {
            return {
                key: key,
                value: finalCat[key]
            };
        });

        return Promise.all(langs.map((lang) => {
            console.log(lang);
            const translateLangs = (language, props, id) => {
                return props.map((prop) => {
                    return Ajax().post('/translate-menu-category', {
                        body: JSON.stringify(convertForTranslation(language, {type: 'category', id: id, prop: prop})),
                        headers: {
                            "content-type": "application/json",
                            "cache-control": "no-cache",
                            "x-access-token": StorageManagerInstance.read('token')
                        }
                    });
                });
            };

            let currentBranchLangId;

            if (!lang.name && !lang.title) {
                return Ajax().get('/branch-language', {
                    headers: {
                        "content-type": "application/json",
                        "cache-control": "no-cache",
                        "x-access-token": StorageManagerInstance.read('token')
                    }
                }).then((res) => {
                    if (!res || !res.success) {
                        return Promise.reject(res);
                    }

                    const branchLanguages = res.obj;
                    const currentBranchLang = branchLanguages.find(l => l.BranchLanguageID === lang.branchLanguageId);
                    currentBranchLangId = (currentBranchLang || {}).LanguageID;

                    return Ajax().get('/language', {
                        headers: {
                            "content-type": "application/json",
                            "cache-control": "no-cache",
                            "x-access-token": StorageManagerInstance.read('token')
                        }
                    })
                }).then((res) => {
                    if (!res || !res.success) {
                        return Promise.reject(res);
                    }

                    const languages = res.obj;
                    const currentLanguage = languages.find(l => l.LanguageID === currentBranchLangId);
                    const finalLang = {
                        id: currentLanguage.LanguageID,
                        flagId: currentLanguage.FlagID,
                        code: currentLanguage.Code,
                        codeFull: currentLanguage.CodeFull,
                        name: currentLanguage.Name,
                        title: currentLanguage.Title,
                    };
                    console.log(finalLang);
                    console.log(propsToTranslate);
                    console.log(id);
                    return translateLangs(finalLang, propsToTranslate, id);
                });
            } else {
                return translateLangs(lang, propsToTranslate, id);
            }
        }));
    });
}


//
// REMOVE
//
export function removeMenuCategories () {

}

export function removeMenuCategory () {

}


function convertForTranslation (lang, obj) {
    let id = obj.id || obj.MenuCategoryID;
    console.log(lang);
    switch (obj.type) {
        case 'category':
        console.log({obj: {
                    categoryId: id,
                    key: obj.prop.key,
                    title: 'Menu Category ' + id + ', translation: ' + obj.prop.key,
                    sl: 'English',
                    tl: lang.title || lang.name,
                    payload: obj.prop.value
                }});
            return {
                obj: {
                    categoryId: id,
                    key: obj.prop.key,
                    title: 'Menu Category ' + id + ', translation: ' + obj.prop.key,
                    sl: 'English',
                    tl: lang.title || lang.name,
                    payload: obj.prop.value
                }
            };
    }
}

function convertFromDB (cat) {
    console.log(cat);
    console.log(Mapping.getTableMap('menucategory'));
    return Object.keys(cat).map((key) => {
        let obj = {};
        let newKey = Mapping.getKeyFromValue(Mapping.getTableMap('menucategory'), key);
        console.log(newKey);
        obj[newKey] = cat[key];
        return obj;
    });
}


function convertOpts (cat, isUpdate) {
    console.log(cat);

    /*
    if (!cat.id) {
        console.error('The menu category id to update is not specified!');
        return;
    }
    */

    let id = cat.MenuCategoryID || cat.id;
    let obj = Object.keys(cat).reduce((acc, current) => {
        let matchingKeys = [];
        for (let key of Mapping.getTableMap('menucategory').keys()) {
            if (current === key) {
                matchingKeys.push(key);
            }
        }

        if (matchingKeys.length > 0) {
            acc[Mapping.getDBString('menucategory', current)] = cat[current];
        }
        return acc;
    }, {});
    //

    console.log({id: id, updates: obj});

    return (isUpdate) ? {
        id: id,
        updates: obj
    } : {
        obj: obj
    };
}



