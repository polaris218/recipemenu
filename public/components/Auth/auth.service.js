import { Ajax } from '../../shared/ajax.utils';
import { StorageManagerInstance } from '../../shared/storage.utils';

export function auth(data, opts) {
    return new Promise((resolve, reject) => {
        if (!data.auth.Email || !data.auth.Pwd) {
            reject({
                success: false,
                error: 'Please enter a valid Email/Password',
            });

            return;
        }

        Ajax().post('/auth', opts).then(res => {
            if (!res || !res.success) {
                reject({
                    success: false,
                    error: err
                });
            }

            resolve(res);
        }).catch(err => {
            reject({
                success: false,
                error: err
            });
        });
    });
}


export function signup(data, opts) {
    return new Promise((resolve, reject) => {
        if (!data.auth.Name || !data.auth.CompanyName || !data.auth.Surname || !data.auth.Pwd || !data.auth.Email || !data.auth.Country) {
            reject({
                success: false,
                error: 'missingValue',
            });
            return;
        }
        if (data.auth.Country == 'Select Country') {
            reject({
                success: false,
                error: 'Please select the country',
            });
            return;
        }
        if (!data.auth.Agree) {
            reject({
                success: false,
                error: 'Please agree to the terms of conditions.',
            });
            return;
        }

        Ajax().post('/signup', opts).then(res => {
            console.log(res)
            if (!res || !res.success) {
                reject({
                    success: false,
                    error: err
                });
            }

            resolve(res);
        }).catch(err => {
            reject({
                success: false,
                error: "Email already in use."
            });
        });
    });
}

export function forgotPassword(data, opts) {
    return new Promise((resolve, reject) => {
        if (!data.auth.Email) {
            reject({
                success: false,
                error: 'Please enter your email',
            });
            return;
        }
        Ajax().post('/forgotPassword', opts).then(res => {
            console.log(res)
            if (!res || !res.success) {
                reject({
                    success: false,
                    error: err
                });
            }
            resolve(res);
        }).catch(err => {
            reject({
                success: false,
                error: "Error occured while sending reset link."
            });
        });
    });
}

export function checkResetCode(data, opts) {
    return new Promise((resolve, reject) => {
        Ajax().post('/checkResetCode', opts).then(res => {
            console.log(res)
            if (!res || !res.success) {
                reject({
                    success: false,
                    error: err
                });
            }
            resolve(res);
        }).catch(err => {
            reject({
                success: false,
                error: "Error occured while verfying reset link."
            });
        });
    })
}
export function updatePassword(data, opts) {
    console.log(data)
    if (!data.auth.Pwd) {
        reject({
            success: false,
            error: 'Please enter a new password.',
        });
        return;
    }
    if (data.auth.Pwd.length < 8) {
        reject({
            success: false,
            error: 'Password length should be more than 8 characters.',
        });
        return;
    } else {
        return new Promise((resolve, reject) => {
            Ajax().put('/updatePassword', opts).then(res => {
                console.log(res)
                if (!res || !res.success) {
                    reject({
                        success: false,
                        error: err
                    });
                }
                resolve(res);
            }).catch(err => {
                reject({
                    success: false,
                    error: "Error occured while updating your password."
                });
            });
        })
    }

}
export function isAuthenticated() {
    return StorageManagerInstance.read('token');
}

export function getAuth() {
    let token = isAuthenticated();
    if (token) {
        return {
            authenticated: true,
            completed: true,
            token: token
        };
    }

    return {
        authenticated: false,
        completed: true
    };
}