test:
	node ./node_modules/.bin/istanbul cover ./node_modules/mocha/bin/_mocha  -- --timeout 500000 --recursive test/ --report lcovonly

.PHONY: test