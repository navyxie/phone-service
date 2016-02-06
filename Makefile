TESTS = $(shell find test -type f -name "*.js")

test:
	./node_modules/mocha/bin/_mocha  --timeout 50000 --recursive test/

.PHONY: test
