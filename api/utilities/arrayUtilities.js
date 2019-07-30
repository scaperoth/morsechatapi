// api/utilities/arrayUtilities.js

/**
 * removes an item from an array based on given key and returns
 * copied array with item removed
 * @param {Array} arr array to remove item from
 * @param {T} i   item to remove of generic type in array
 * @param {String} key   key to compare in array items
 */
const RemoveItemFromArrayByKey = (arr, i, key) => {
	const idx = arr.findIndex(c => c[key] === i[key]);
	if (idx > -1 && key !== undefined) {
		return [
			...arr.slice(0, idx),
			...arr.slice(idx + 1)
		];
	} else {
		return [
			...arr
		];
	}
};

module.exports = {
	RemoveItemFromArrayByKey
};
