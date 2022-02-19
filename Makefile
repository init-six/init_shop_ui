VERSION := $(shell git describe --always)
REGISTRY := evanfordocker/init-web-server

image:
	rm -r dist
	npm run prod
	docker build -t $(REGISTRY):$(VERSION) -t $(REGISTRY):latest .

push:
	docker image push $(REGISTRY):$(VERSION)
