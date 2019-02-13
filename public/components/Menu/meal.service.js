import { Ajax } from '../../shared/ajax.utils';

import { Mapping } from '../../shared/mapping.utils';
import { StorageManagerInstance } from '../../shared/storage.utils';

const SANDBOX_TOKEN = 'ACE563CA-FF89-4C7D-8DDF-35B5F11CFA21';
const TRANSLATION_ENV = 'sandbox';
const TRANSLATION_URL = 'https://' + TRANSLATION_ENV + '.strakertranslations.com/v3/translate';

//
// POST
//
export function postMeals(meals, newCatId) {
    if (meals.length <= 0) {
        return  Promise.resolve({});;
    }
    // Compare meals in the object to the meals in the DB
    let ids = meals.map(c => c.id);
    return Promise.all(meals.map((meal) => {
        return postMeal(meal, newCatId);
    }));
}

export function postMeal(meal, newCatId) {
    console.log(meal);

    if (!meal.Price && !meal.price) {
        meal.Price = 0;
        meal.price = 0;
    }

    if (meal.id) {
        delete meal.id;
    }

    if (meal.MealID) {
        delete meal.MealID;
    }

    meal.menuCategoryId = newCatId;

    return Ajax().post('/meal', {
        body: JSON.stringify(convertOpts(meal, false)),
        headers: {
            "content-type": "application/json",
            "cache-control": "no-cache",
            "x-access-token": StorageManagerInstance.read('token')
        }
    });
}


//
// UPDATE
//
export function updateMeals(meals, catId) {
    if (meals.length <= 0) {
        return removeMeals([], catId);
    }
    // Compare meals in the object to the meals in the DB
    let ids = meals.map(c => c.id);
    return Promise.all(meals.map((meal) => {
        if (!meal.MenuCategoryID) {
            return postMeal(meal, catId);
        }
        return updateMeal(meal);
    }));
}

export function removeMeals(meals, catId) {
    return Ajax().put('/meal-remove', {
        body: JSON.stringify({
            MenuCategoryID: catId,
            meals: meals
        }),
        headers: {
            "content-type": "application/json",
            "cache-control": "no-cache",
            "x-access-token": StorageManagerInstance.read('token')
        }
    }).then(res => {
        return Promise.resolve(res);
    });
}

export function updateMeal(meal) {
    if (!meal.id && !meal.MealID) {
        console.error('meal id is not specified!');
        return;
    }

    if (!meal.Price && !meal.price) {
        meal.Price = 0;
        meal.price = 0;
    }
    console.log(meal, 'hhhhh meal')
    return Ajax().put('/meal', {
        body: JSON.stringify(convertOpts(meal, true)),
        headers: {
            "content-type": "application/json",
            "cache-control": "no-cache",
            "x-access-token": StorageManagerInstance.read('token')
        }
    });
}

function getMeals(ids) {
    return Ajax().get('/meal', {
        headers: {
            "content-type": "application/json",
            "cache-control": "no-cache",
            "x-access-token": StorageManagerInstance.read('token')
        }
    }).then((cats) => {
        if (ids.length <= 0) {
            return cats;
        }

        return cats.filter((cat, index) => {
            return cat.MenuCategoryID === ids[index];
        });
    });
}


//
// TRANSLATE
//


export function getMealTranslations(ids) {
    return Ajax().get('/translate-meal', {
        headers: {
            "content-type": "application/json",
            "cache-control": "no-cache",
            "x-access-token": StorageManagerInstance.read('token')
        }
    }).then((res) => {
        if (!res || !res.success) {
            return Promise.reject(res);
        }

        let mealTranslations = res.obj;

        let mealIds = res.obj.map(meal => meal.MealID);

        // Get menu categories macthing menu id
        return Ajax().get('/meal', {
            headers: {
                "content-type": "application/json",
                "cache-control": "no-cache",
                "x-access-token": StorageManagerInstance.read('token')
            }
        }).then((res) => {
            if (!res || !res.success) {
                return Promise.reject(res);
            }

            let meals = ids.reduce((acc, current) => {
                return acc.concat(res.obj.filter((meal) => {
                    return meal.MenuCategoryID === current;
                }));
            }, []);

            console.log(meals);

            let meals2 = meals.reduce((acc, current) => {
                return acc.concat(mealTranslations.reduce((acc_translation, curr_translation) => {
                    let t = curr_translation;
                    t.MenuCategoryID = current.MenuCategoryID;
                    return (curr_translation.MealID === current.MealID)
                        ? acc_translation.concat(t)
                        : acc_translation;
                }, []));
            }, []);

            console.log(meals2);

            return meals2;
        });
    });
}

export function translateMeals(langs, meals) {
    return Promise.all(meals.map((meal) => {
        return translateMeal(langs, meal);
    }));
}

export function translateMeal(langs, meal) {
    return Ajax().get('/meal', {
        headers: {
            "content-type": "application/json",
            "cache-control": "no-cache",
            "x-access-token": StorageManagerInstance.read('token')
        }
    }).then((res) => {
        if (!res || !res.success) {
            return Promise.reject(res);
        }

        let meals = res.obj;

        return meals.find((m) => {
            return (m.Description === meal.description || m.Description === meal.Description) && (m.Title === meal.title || m.Title === meal.Title) && (m.MenuCategoryID === meal.menuCategoryId || m.MenuCategoryID === meal.MenuCategoryID);
        }).MealID;
    }).then((id) => {
        console.log(id);
        if (!id) {
            console.error('Meal id is not specified!');
            return;
        }

        let propsToTranslate = Object.keys(meal).filter((key) => {
            return ((key === 'title' ||  key === 'Title') || (key === 'description' || key === 'Description')) && (meal[key] && meal[key].length > 0);
        }).map((key) => {
            return {
                key: key,
                value: meal[key]
            };
        });

        console.log('props to translate!!');
        console.log(propsToTranslate);

        return Promise.all(langs.map((lang) => {
            console.log(lang);
            const translateLangs = (language, props, id) => {
                return props.map((prop) => {
                    return Ajax().post('/translate-meal', {
                        body: JSON.stringify(convertForTranslation(language, { type: 'meal', id: id, prop: prop })),
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
                    return translateLangs(finalLang, propsToTranslate, id);
                });
            } else {
                return translateLangs(lang, propsToTranslate, id);
            }
        }));
    });
}


function convertForTranslation(lang, obj) {
    let id = obj.id || obj.MealID;
    console.log(lang, obj);
    switch (obj.type) {
        case 'meal':
            console.log({
                obj: {
                    mealId: id,
                    key: obj.prop.key,
                    title: 'Meal ' + id + ', translation: ' + obj.prop.key,
                    sl: 'English',
                    tl: lang.title || lang.name,
                    payload: obj.prop.value
                }
            });
            return {
                obj: {
                    mealId: id,
                    key: obj.prop.key,
                    title: 'Meal ' + id + ', translation: ' + obj.prop.key,
                    sl: 'English',
                    tl: lang.title || lang.name,
                    payload: obj.prop.value
                }
            };
    }
}


//
// REMOVE
//

export function removeMeal() {

}


function convertOpts(meal, isUpdate) {
    console.log(meal);
    /*
        if (!meal.id) {
            console.error('The menu id to update is not specified!');
            return;
        }
    */
    let id = meal.id || meal.MealID;
    let obj = Object.keys(meal).reduce((acc, current) => {
        let matchingKeys = [];
        for (let key of Mapping.getTableMap('meal').keys()) {
            if (current === key) {
                matchingKeys.push(key);
            }
        }

        console.log(Mapping.getTableMap('meal').keys());
        console.log(matchingKeys);
        console.log(current);

        if (matchingKeys.length > 0) {
            acc[Mapping.getDBString('meal', current)] = meal[current];
        }
        return acc;
    }, {});
    //

    console.log({ id: id, updates: obj });

    return (isUpdate) ? {
        id: id,
        updates: obj
    } : {
            obj: obj
        };
}


