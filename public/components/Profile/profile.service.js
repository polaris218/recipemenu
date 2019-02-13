import { Ajax } from '../../shared/ajax.utils';

import { Mapping } from  '../../shared/mapping.utils';
import { StorageManagerInstance } from  '../../shared/storage.utils';

import * as ImageService from '../Image/image.service';

export function updateProfile (opts) {
    if (opts.email) {
        return (!opts.image) ? Ajax().put('/profile', {
            body: JSON.stringify(convertOpts(opts, true)),
            headers: {
                "content-type": "application/json",
                "cache-control": "no-cache",
                "x-access-token": StorageManagerInstance.read('token')
            }
        }) : ImageService.uploadImage(opts.image).then((res) => {
            console.log(res);

            if (!res || !res.success) {
                return Promise.reject(res);
            }


            let imageRes = res.obj;
            console.log(imageRes);

            let finalOpts = opts;
            finalOpts.imgPath = imageRes.secure_url || imageRes.url;

            return Ajax().put('/profile', {
                body: JSON.stringify(convertOpts(finalOpts, true)),
                headers: {
                    "content-type": "application/json",
                    "cache-control": "no-cache",
                    "x-access-token": StorageManagerInstance.read('token')
                }
            });
        });
    } else {
        const err = 'No email specified for profile update!';
        console.error(err);
        return Promise.reject(err);
    }
}

export function getProfile () {
    return Ajax().get('/profile', {
        headers: {
            "content-type": "application/json",
            "cache-control": "no-cache",
            "x-access-token": StorageManagerInstance.read('token')
        }
    }).then((res) => {
        if (!res || !res.success) {
            return Promise.reject(res);
        }

        let profile = res.obj;

        return profile;
    });
}

function convertOpts (opts, isUpdate) {
    console.log(opts);

    let email = opts.email;
    let obj = Object.keys(opts).reduce((acc, current) => {
        let matchingKeys = [];
        for (let key of Mapping.getTableMap('profile').keys()) {
            if (current === key) {
                matchingKeys.push(key);
            }
        }

        if (matchingKeys.length > 0) {
            acc[Mapping.getDBString('profile', current)] = opts[current];
        }
        return acc;
    }, {});

    console.log({email: email, updates: obj});

    return (isUpdate) ? {
        email: email,
        updates: obj
    } : {
        obj: obj
    };
}


