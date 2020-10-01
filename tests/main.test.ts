import { render, convertToString } from '../src/main'

describe('sort function', () => {
	it('is empty', () => {
		expect(convertToString([''])).toEqual([])
	})

	it('is faulty', () => {
		expect(convertToString(['a,4'])).toEqual([])
	})

	it('is simple', () => {
		expect(convertToString(['0,0   '])).toEqual([[0, 0]])
	})

	it('is duplicated', () => {
		expect(convertToString(['2, 2', '1,1', '2, 0', '2, 0'])).toEqual([
			[2, 2],
			[1, 1],
			[2, 0],
		])
	})
})

describe('render function', () => {
	it('is empty', () => {
		expect(render([''])).toEqual([])
	})

	it('is faulty', () => {
		expect(render(['a,4'])).toEqual([])
	})

	it('is simple', () => {
		expect(render(['0,0'])).toEqual([4])
	})

	it('is a square shape with duplicates', () => {
		expect(
			render(['2, 2', '1,1', '2, 0', '2, 0', '2, 1', '0,0', '1, 2', '0, 1', '0,2', '1,0'])
		).toEqual([12])
	})

	it('is a triangle shape', () => {
		expect(render(['2, 2', '1,1', '2, 0', '2, 1', '0,0', '1,0'])).toEqual([12])
	})

	it('is a column shape', () => {
		expect(render(['0, 2', '0, 3', '0,0', '0,1'])).toEqual([10])
	})

	it('is 2 shapes', () => {
		expect(render(['0, 2', '0, 3', '0,0', '0,1', '3, 3', '4, 3', '3,4', '4,4'])).toEqual([
			10,
			8,
		])
	})
})
