"use strict";

export let MAP_CONSTANTS = {
    DEFAULT_LANGUAGE_SYMBOL: '₱',
};

//
// from DB to js
//
const MAP_TABLE_DB = [
    {
        key: 'Profile',
        table: new Map([
            ['BranchID', 'branchId'],
            ['CompanyID', 'companyId'],
            ['Name', 'name'],
            ['Address', 'address'],
            ['Latitude', 'latitude'],
            ['Longitude', 'longitude'],
            ['City', 'city'],
            ['Country', 'country'],
            ['Email', 'email'],
            ['Tel', 'tel'],
            ['HasHeadquarters', 'isRoot'],
            ['Date', 'date'],
            ['DateUpdated', 'dateUpdated']
        ])
    },
    {
        key: 'Cuisine',
        table: new Map([
            ['BranchCuisineID', 'branchCuisineId'],
            ['BranchID', 'branchId'],
            ['CuisineID', 'cuisineId'],
            ['Title', 'title'],
            ['Description', 'description'],
            ['Date', 'date'],
            ['DateUpdated', 'dateUpdated']
        ])
    },
    {
        key: 'Currency',
        table: new Map([
            ['BranchCurrencyID', 'branchCurrencyId'],
            ['BranchID', 'branchId'],
            ['CurrencyID', 'currencyId'],
            ['Name', 'name'],
            ['NameShort', 'nameShort'],
            ['Symbol', 'symbol'],
            ['Description', 'description'],
            ['Date', 'date'],
            ['DateUpdated', 'dateUpdated']
        ])
    },
    {
        key: 'Language',
        table: new Map([
            ['BranchLanguageID', 'branchLanguageId'],
            ['BranchID', 'branchId'],
            ['LanguageID', 'languageId'],
            ['FlagID', 'flagId'],
            ['Code', 'code'],
            ['CodeFull', 'codeFull'],
            ['Title', 'title'],
            ['Name', 'name'],
            ['Description', 'description'],
            ['Date', 'date'],
            ['DateUpdated', 'dateUpdated']
        ])
    }
];

//
// from js to DB
//
const MAP_TABLE = [
    {
        key: 'company',
        table: new Map([
            ['name', 'Name'],
            ['website', 'Website'],
            ['tel', 'Tel'],
            ['description', 'Description'],
            ['logoPath', 'LogoPath'],
            ['altDesc', 'LogoAltDesc'],
            ['twitter', 'Twitter'],
            ['facebook', 'Facebook'],
            ['youtube', 'Youtube'],
            ['instagram', 'Instagram']
        ])
    },
    {
        key: 'profile',
        table: new Map([
            ['name', 'Name'],
            ['website', 'Website'],
            ['tel', 'Tel'],
            ['description', 'Description'],
            ['imgPath', 'LogoPath'],
            ['altDesc', 'LogoAltDesc'],
            ['twitter', 'Twitter'],
            ['facebook', 'Facebook'],
            ['youtube', 'Youtube'],
            ['instagram', 'Instagram']
        ])
    },
    {
        key: 'menu',
        table: new Map([
            ['id', 'MenuID'],
            ['MenuID', 'MenuID'],
            ['branchId', 'BranchID'],
            ['BranchID', 'BranchID'],
            ['title', 'Title'],
            ['Title', 'Title'],
            ['description', 'Description'],
            ['Description', 'Description'],
            ['price', 'Price'],
            ['Price', 'Price']
        ])
    },
    {
        key: 'meal',
        table: new Map([
            ['id', 'MealID'],
            ['MealID', 'MealID'],
            ['menuCategoryId', 'MenuCategoryID'],
            ['MenuCategoryID', 'MenuCategoryID'],
            ['title', 'Title'],
            ['Title', 'Title'],
            ['description', 'Description'],
            ['Description', 'Description'],
            ['price', 'Price'],
            ['Price', 'Price'],
            ['enableDetails', 'EnableDetails'],
            ['EnableDetails', 'EnableDetails']
        ])
    },
    {
        key: 'language',
        table: new Map([
            ['id', 'LanguageID'],
            ['flagId', 'FlagID'],
            ['code', 'Code'],
            ['codeFull', 'CodeFull'],
            ['title', 'Title'],
            ['name', 'Name']
        ])
    },
    {
        key: 'menucategory',
        table: new Map([
            ['id', 'CategoryID'],
            ['CategoryID', 'CategoryID'],
            ['CategoryStandardID', 'CategoryID'],
            ['Title', 'Title'],
            ['Description', 'Description'],
            ['categoryId', 'CategoryID'],
            ['catId', 'CategoryID'],
            ['menuId', 'MenuID'],
            ['MenuID', 'MenuID']
        ])
    },
    {
        key: 'menulanguage',
        table: new Map([
            ['id', 'MenuLanguageID'],
            ['branchLanguageId', 'BranchLanguageID'],
            ['languageId', 'BranchLanguageID'],
            ['menuId', 'MenuID']
        ])
    },
    {
        key: 'menutranslation',
        table: new Map([
            ['id', 'MenuTranslationID'],
            ['menuId', 'MenuID'],
            ['languageId', 'BranchLanguageID'],
            ['languageName', 'BranchLanguageName'],
            ['jobnumber', 'JobNumber'],
            ['status', 'Status'],
            ['title', 'Title'],
            ['tl', 'BranchLanguageName'],
            ['payload', 'text'],
            ['url', 'Url'],
            ['callback_uri', 'Url']
        ])
    },
    {
        key: 'mealtranslation',
        table: new Map([
            ['id', 'MealTranslationID'],
            ['mealId', 'MealID'],
            ['languageId', 'BranchLanguageID'],
            ['languageName', 'BranchLanguageName'],
            ['jobnumber', 'JobNumber'],
            ['status', 'Status'],
            ['title', 'Title'],
            ['tl', 'BranchLanguageName'],
            ['payload', 'text'],
            ['url', 'Url'],
            ['callback_uri', 'Url']
        ])
    },
    {
        key: 'menucategorytranslation',
        table: new Map([
            ['id', 'MenuCategoryTranslationID'],
            ['menuCategoryId', 'MenuCategoryID'],
            ['languageId', 'BranchLanguageID'],
            ['languageName', 'BranchLanguageName'],
            ['jobnumber', 'JobNumber'],
            ['status', 'Status'],
            ['title', 'Title'],
            ['tl', 'BranchLanguageName'],
            ['description', 'Description'],
            ['payload', 'text'],
            ['url', 'Url'],
            ['callback_uri', 'Url']
        ])
    },
    {
        key: 'imageupload',
        table: new Map([
            ['altDesc', 'AltDesc'],
            ['branchId', 'BranchID'],
            ['caption', 'Caption'],
            ['imgPath', 'Path']
        ])
    }
];

export let Mapping = {

    //
    /** Map props strings we use in the front-end to the DB's */
    //
    getDBString: function (type, str, fromDB) {
        if (!type || !str) {
            console.error('no string or type specified!');
            return;
        }

        let tableMap = this.getTableMap(type, fromDB);

        if (!tableMap) {
            console.error('The type specified could not be found in the tablemap!');
            return;
        }

        return tableMap.get(str);
    },

    getKeyFromValue: function (table, value) {
        return Array.from(table.keys()).find((key) => {
            return key === value;
        });
    },

    getTableMap: function (type, fromDB) {
        let t = (!fromDB) ? MAP_TABLE.find((entity) => {
            return entity.key === type;
        }) : MAP_TABLE_DB.find((entity) => {
            return entity.key === type;
        });

        if (!t || t.length <= 0) {
            return;
        }

        return t.table;
    }
};