DEST = ubuntu@poyu.xyz:~/poyu.xyz/

build: node_modules
	node index.js

dev: node_modules
	node dev.js

node_modules: package.json
	npm install

clean: 
	rm -r build

deploy: clean build
	rsync -azPI build/ $(DEST)

.PHONY: build dev clean deploy
