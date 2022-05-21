module.exports = {
	"env": {
		"browser": true,
		"commonjs": true,
		"es2021": true,
		"node": true
	},
	"extends": [`eslint:recommended`,`plugin:eqeqeq-fix/recommended`],
	"parserOptions": {
		"ecmaVersion": `latest`
	},
	"rules": {
		"indent": [
			`error`,
			`tab`
		],
		"linebreak-style": [
			`error`,
			`windows`
		],
		"quotes": [
			`error`,
			`backtick`
		],
		"semi": [
			`error`,
			`always`
		],
		"brace-style": [`error`, `allman`, { "allowSingleLine": true }],
		"eqeqeq-fix/eqeqeq": [`error`, `smart`],
		"no-constant-condition": [`off`],
		"newline-before-return": [`error`],
		"newline-after-var": [`error`],
		
	}
};
