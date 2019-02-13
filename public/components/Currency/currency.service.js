import { Ajax } from '../../shared/ajax.utils';

import { Mapping } from  '../../shared/mapping.utils';
import { StorageManagerInstance } from  '../../shared/storage.utils';


export function getCurrencies () {
    return Ajax().get('/currency', {
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

        let currencies = res.obj;

        return currencies;
    });
}