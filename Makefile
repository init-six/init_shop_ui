VERSION := $(shell git describe --tags --always --dirty)
REGISTRY := evanfordocker/init_front

image:
	docker build -t $(REGISTRY):$(VERSION) .

push:
	docker image push $(REGISTRY):$(VERSION)
