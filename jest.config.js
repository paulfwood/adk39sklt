module.exports = {
	testEnvironment: 'node',
	transform: {
		'^.+\\.tsx?$': 'ts-jest',
	},
	transformIgnorePatterns: ['/node_modules/'],
	moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
	testRegex: '(/tests/.*|(\\.|/)(test|spec))\\.(ts)x?$',
	coverageDirectory: 'coverage',
	collectCoverageFrom: ['src/**/*.{ts,tsx,js,jsx}', '!src/**/*.d.ts'],
}
