TESTS = $(shell find test -type f -name "*.js")

test:
	node ./node_modules/.bin/istanbul cover ./node_modules/mocha/bin/_mocha  -- --timeout 50000 --recursive test/ --report lcovonly

.PHONY: test
