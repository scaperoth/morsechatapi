// api/domain/utilities/arrayUtilities.js

/**
 * removes an item from an array and returning
 * copied array
 * @param {[type]} arr array to remove item from
 * @param {[type]} i   item to remove
 */
const RemoveItemFromArray = (arr, i) => {
	const idx = arr.findIndex(c => c === i);
	if (idx > -1) {
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
	RemoveItemFromArray
}
