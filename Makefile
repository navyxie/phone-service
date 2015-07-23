TESTS = $(shell find test -type f -name "*.js")

test:
	./node_modules/.bin/mocha \
		--timeout 20000 \
		$(TESTS)


.PHONY: test