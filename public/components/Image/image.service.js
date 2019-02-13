import { Ajax } from '../../shared/ajax.utils';

import { Mapping } from '../../shared/mapping.utils';
import { StorageManagerInstance } from '../../shared/storage.utils';


export function uploadImage(data) {
    console.log(data);
    return Ajax().post('/image-upload', {
        body: JSON.stringify({ obj: data }), // data: {file: file, url: url}
        headers: {
            "content-type": "application/json",
            "cache-control": "no-cache",
            "x-access-token": StorageManagerInstance.read('token')
        }
    });
}

export function updateBranchImages(images) {
    console.log(images);
    return Promise.all(images.map(image => {
        return uploadImage(image).then(res => {
            console.log(res);
            if (!res || !res.success) {
                return Promise.reject(res);
            }

            return Promise.resolve(res.obj);
        });
    }));
}

export function updateContactImages(images) {
    console.log(images);
    return Promise.all(images.map(image => {
        return uploadImage(image).then(res => {
            console.log(res);
            if (!res || !res.success) {
                return Promise.reject(res);
            }

            return Promise.resolve(res.obj);
        });
    }));
}

export function updateMealImages(images) {
    console.log(images);
    return Promise.all(images.map(image => {
        return uploadImage(image).then(res => {
            console.log(res);
            if (!res || !res.success) {
                return Promise.reject(res);
            }

            return Promise.resolve(res.obj);
        });
    }));
}