"use strict";

const DEFAULT_VALUE = {};

export let StorageManager = class {

    //
    /** Init storage provider depending on client's browser capabilities */
    //
    constructor (storageKey, isCachedForever) {
    	this.storageKey = storageKey;
    	this.isCachedForever = isCachedForever;
    }

    //
    /** Store the value associated to a given key using an appropriate Storage Provider */
    //
    save(key, value) {
    	let cache = this.getStorageCache(this.storageKey);

		if (cache && key !== undefined) {
			cache[key] = value !== undefined ? value : DEFAULT_VALUE;
		} else {
			cache = value !== undefined ? value : DEFAULT_VALUE;
		}

		this.saveCache(cache);
    }

    //
    /** Read the value associated to a given key using an appropriate Storage Provider */
    //
    read(key) {
    	let cache = this.getStorageCache(this.storageKey);

		return key !== undefined
			? (typeof(cache) === 'object'
				&& key in cache
					? cache[key]
					: null)
			: cache;
    }

    //
    /** Remove key using an appropriate Storage Provider */
    //
    remove(key) {
    	if (!key) {
    		return;
    	}

    	let cache = null;

    	if (typeof(Storage) !== 'undefined') {
			cache = this.getWebStorage()[storageKey];
		}

		if (cache) {
			// In case an attempt to delete an undeletable property is made, let's
			// handle the TypeError exception thrown
			try {
				cache = JSON.parse(cache);
				delete cache[key];
				this.saveCache(cache);
			} catch (e) {

			}
		}
    }

    //
    /** Nuke the entire Storage Container */
    //
    purge() {
    	this.initStorageCache(this.storageKey);
    }

    //
    /** Choose Persistency mode over Storage Providers */
    //
    getWebStorage() {
		return this.isCachedForever ? localStorage : sessionStorage;
	}

    initStorageCache(storageKey) {
    	let cache = null;

    	if (typeof(Storage) !== 'undefined') {
			cache = this.getWebStorage()[storageKey];

			if (!cache) {
				cache = DEFAULT_VALUE;
				this.getWebStorage()[storageKey] = JSON.stringify(cache);
			}
		}
    }

	getStorageCache(storageKey) {
		let cache = null;

		if (typeof(Storage) !== 'undefined') {
			cache = this.getWebStorage()[storageKey];
		}

		if (!cache) {
			this.initStorageCache(storageKey);
			cache = JSON.stringify(this.getStorageCache(storageKey));
		}

		return JSON.parse(cache);
	}

	saveCache(cache) {
		let serializedCache = JSON.stringify(cache);

		if (typeof(Storage) !== 'undefined') {
			this.getWebStorage()[this.storageKey] = serializedCache;
		}
	}
};

export const StorageManagerInstance = new StorageManager('local', false);