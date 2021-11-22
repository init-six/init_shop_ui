VERSION := $(shell git describe --tags --always --dirty)
REGISTRY := evanfordocker/init-web-server

image:
	docker build -t $(REGISTRY):$(VERSION) -t $(REGISTRY):latest .

push:
	docker image push $(REGISTRY):$(VERSION)
