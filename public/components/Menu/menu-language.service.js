import { Ajax } from '../../shared/ajax.utils';

import { Mapping } from  '../../shared/mapping.utils';
import { StorageManagerInstance } from  '../../shared/storage.utils';

//
// POST
//

export function postMenuLanguages (nextId, langs) {
    // Compare menu categories in the object to the categories in the DB
    let convertedLangs = langs.map(lang => {
        return {
            code: lang.Code,
            codeFull: lang.CodeFull,
            date: lang.Date,
            dateUpdated: lang.DateUpdated,
            flagId: lang.FlagID,
            id: lang.LanguageID,
            name: lang.Name,
            title: lang.Title
        };
    });
    //let languages = getMenuLanguages(ids);
    return Promise.all(convertedLangs.map((lang) => {
        return postMenuLanguage(nextId, lang);
    }));
}

export function postMenuLanguage (nextId, lang) {
    let id = (lang.Language) ? lang.Language.LanguageID : (lang.id || lang.LanguageID);
    if (!id) {
        console.error('Menu language id is not specified!');
        return;
    }

    return Ajax().post('/menu-language', {
        body: JSON.stringify({
            obj: {
                MenuID: nextId,
                BranchLanguageID: id,
            }
        }),
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
export function updateMenuLanguages (menuId, langs) {
    /*
    if (!langs || langs.length <= 0) {
        return Promise.resolve();
    }
    */

    // Compare menu categories in the object to the categories in the DB
    //let ids = langs.map(c => c.id)
    //let languages = getMenuLanguages(ids);
    return Promise.resolve();
    /*
    return Promise.all(langs.map((lang) => {
        return updateMenuLanguage(lang);
    }));
*/
}

export function updateMenuLanguage (lang) {
    let id = (lang.Language) ? lang.Language.LanguageID : (lang.id || lang.LanguageID);
    if (!id) {
        console.error('Menu language id is not specified!');
        return;
    }

    // Get the branchlanguage ID then
    return getMenuLanguage(id).then((menuLanguage) => {
        console.log(menuLanguage);
        if (!menuLanguage) {
            return Promise.resolve([]);
        }

        return Ajax().put('/menu-language', {
            body: JSON.stringify({
                id: id,
                updates: {
                    BranchLanguageID: menuLanguage.BranchLanguageID
                }
            }),
            headers: {
                "content-type": "application/json",
                "cache-control": "no-cache",
                "x-access-token": StorageManagerInstance.read('token')
            }
        });
    });
}

function getMenuLanguage (id) {
    if (!id) {
        return Promise.resolve();
    }

    return new Promise(resolve => {
        console.log(StorageManagerInstance.read('token'));
        Ajax().get('/menu-language', {
            headers: {
                "content-type": "application/json",
                "cache-control": "no-cache",
                "x-access-token": StorageManagerInstance.read('token')
            }
        }).then((languages) => {
            console.log(languages);
            if (languages.obj && languages.obj.length > 0) {
                resolve(languages.obj.find((lang) => {
                    const finalLang = (lang.Language) ? lang.Language : lang;
                    return finalLang.MenuLanguageID === id;
                }));
            }
        }).catch((err) => {
            console.error(err);
        });
    });
}


//
// REMOVE
//
export function removeMenuLanguages () {

}

export function removeMenuLanguage () {

}



function convertOpts (opts, isUpdate) {
    console.log(opts);

/*
    if (!opts.id) {
        console.error('The menu id to update is not specified!');
        return;
    }
    */

    let id = (opts.Language) ? opts.Language.LanguageID : (opts.id || opts.LanguageID);
    let obj = Object.keys(opts).reduce((acc, current) => {
        let matchingKeys = [];
        for (let key of Mapping.getTableMap('Language', true).keys()) {
            if (current === key) {
                matchingKeys.push(key);
            }
        }

        if (matchingKeys.length > 0) {
            acc[Mapping.getDBString('menu', current)] = opts[current];
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
