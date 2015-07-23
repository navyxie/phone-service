test:
	./node_modules/.bin/istanbul cover ./node_modules/mocha/bin/_mocha  --report lcovonly -- --timeout 50000 --recursive test/ && cat ./coverage/lcov.info | ./node_modules/coveralls/bin/coveralls.js && rm -rf ./coverage

.PHONY: test