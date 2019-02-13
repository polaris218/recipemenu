import * as Auth from './auth.reducer';
import * as Menu from './menu.reducer';
import * as Profile from './profile.reducer';
import * as Image from './image.reducer';
import * as Languages from './languages.reducer';
import * as CurrentLanguage from './current-language.reducer';
import * as Cuisines from './cuisines.reducer';
import * as Currencies from './currencies.reducer';
import * as Categories from './categories.reducer';
import * as Branches from './branches.reducer';
import * as Popup from './popup.reducer';
import * as Analytics from './analytics.reducer';

const _auth = Auth._auth;
const _menu = Menu._menu;
const _profile = Profile._profile;
const _image = Image._image;
const _languages = Languages._languages;
const _currentLanguage = CurrentLanguage._currentLanguage;
const _cuisines = Cuisines._cuisines;
const _currencies = Currencies._currencies;
const _categories = Categories._categories;
const _branches = Branches._branches;
const _popup = Popup._popup;
const _analytics = Analytics._analytics;

export {
    _auth,
    _menu,
    _profile,
    _image,
    _languages,
    _currentLanguage,
    _cuisines,
    _currencies,
    _categories,
    _branches,
    _popup,
    _analytics
}