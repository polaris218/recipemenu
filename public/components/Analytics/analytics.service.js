import { Ajax } from '../../shared/ajax.utils';
import { StorageManagerInstance } from  '../../shared/storage.utils';

export function getAnalytics () {
    return Ajax().get('/analytics', {
        headers: {
            "content-type": "application/json",
            "cache-control": "no-cache",
            "x-access-token": StorageManagerInstance.read('token')
        }
    }).then((res) => {
        if (!res || !res.success) {
            return Promise.reject(res);
        }

        let analytics = res.obj;

        return analytics;
    });
}