import lodash from 'lodash'

export type Point = [x: number, y: number]

function compare(a: Point, b: Point): boolean {
	return a[0] === b[0] && a[1] === b[1]
}

/**
 * Takes the `points` and returns an array of parcels of land, with their perimeters.
 *
 * @param {string[]} points
 * @returns {number[]}
 */
export function render(points: string[]): number[] {
	let ps = convertToString(points)

	if (!ps.length) {
		return []
	}

	let parcels = new Array<Point[]>()
	let parcel = new Array<Point>()

	// Find the neighbours of each point
	for (let i = 0; i < ps.length; i++) {
		const point = ps[i]

		if (parcels.flat().filter((a) => compare(a, point)).length) {
			continue
		}

		let neighbours = ps.filter(
			(i) =>
				(i[0] === point[0] && i[1] === point[1] + 1) ||
				(i[0] === point[0] && i[1] === point[1] - 1) ||
				(i[0] === point[0] + 1 && i[1] === point[1]) ||
				(i[0] === point[0] - 1 && i[1] === point[1])
		)
		neighbours.push(point)

		if (neighbours.length) {
			// Contiguous neighbours, add it to an existing parcel, or create a new one.
			let found = parcels.filter((pa) => lodash.intersection(pa, neighbours).length)[0]

			if (found) {
				// This creates dupes, for efficiency we deal with that later on.
				found.push(...neighbours)
			} else {
				parcel = new Array<Point>()
				parcel.push(...neighbours)
				parcels.push(parcel)
			}
		}
	}

	let res = new Array<number>()

	// Work out the perimeter
	for (let parcel of parcels) {
		// Remove dupes
		parcel = lodash.uniqWith(parcel, (a, b) => compare(a, b))

		let sides = parcel.length * 4

		// Remove the count of sides which are inside the perimeter.
		for (const range of [
			lodash.groupBy(parcel, (p) => p[0]),
			lodash.groupBy(parcel, (p) => p[1]),
		]) {
			for (const key in range) {
				if (Object.prototype.hasOwnProperty.call(range, key)) {
					sides -= (range[key].length - 1) * 2
				}
			}
		}

		res.push(sides)
	}

	return res
}

/**
 * Converts the string array to a Point (tuple) array, and then returns a unique list.
 *
 * @export
 * @param {string[]} points
 * @returns {Point[]}
 */
export function convertToString(points: string[]): Point[] {
	let ps = new Array<Point>()

	// Convert strings to numbers
	for (const point of points) {
		const pos = point.indexOf(',')

		if (pos < 0) {
			continue
		}

		const x = Number.parseInt(point.substr(0, pos).trim())
		const y = Number.parseInt(point.substr(pos + 1).trim())

		if (Number.isNaN(x) || Number.isNaN(y)) {
			continue
		}

		if (!ps.includes([x, y])) {
			ps.push([x, y])
		}
	}

	return lodash.uniqWith(ps, (a, b) => compare(a, b))
}
