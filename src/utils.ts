/**
 * Clamps a value between a minimum and maximum value. If the value is less than the minimum, the
 * minimum is returned. If the value is greater than the maximum, the maximum is returned.
 * Otherwise, the value is returned.
 * @param min The minimum value.
 * @param value The value to clamp.
 * @param max The maximum value.
 */
export function clamp(min: number, value: number, max: number) {
	return Math.min(Math.max(value, min), max);
}

export function openConnection(db_name: string, store_name: string, version: number): Promise<IDBDatabase> {
	return new Promise((resolve, reject) => {
		const request = indexedDB.open(db_name, version);

		request.onerror = () => reject(request.error);

		request.onsuccess = () => resolve(request.result);

		request.onupgradeneeded = () => {
			const db = request.result;
			db.createObjectStore(store_name, { keyPath: "id", autoIncrement: true });
		};
	});
};

export function getAll(store: IDBObjectStore): Promise<any[]> {
	return new Promise((resolve, reject) => {
		const records = store.getAll();
		records.onsuccess = (e) => {
			resolve(records.result);
		};
		records.onerror = () => reject(records.error);
	});
}