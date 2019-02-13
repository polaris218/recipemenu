import { Ajax } from '../../shared/ajax.utils';

import { Mapping } from  '../../shared/mapping.utils';
import { StorageManagerInstance } from  '../../shared/storage.utils';


export function getLanguages () {
    return Ajax().get('/language', {
        headers: {
            "content-type": "application/json",
            "cache-control": "no-cache",
            "x-access-token": StorageManagerInstance.read('token')
        }
    }).then(res => {
    	console.log(res);
        if (!res || !res.success) {
            return Promise.reject(res);
        }

        let languages = res.obj;

        return languages;
    });
}

export function getFlags () {
	return Ajax().get('/flag', {
        headers: {
            "content-type": "application/json",
            "cache-control": "no-cache",
            "x-access-token": StorageManagerInstance.read('token')
        }
    }).then(res => {
    	console.log(res);
        if (!res || !res.success) {
            return Promise.reject(res);
        }

        let flags = res.obj;

        return flags;
    });
}