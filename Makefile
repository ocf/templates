BIN := venv/bin

DOCKER_REVISION ?= testing-$(USER)
DOCKER_TAG = harbor.ocf.berkeley.edu/library/templates:$(DOCKER_REVISION)
RANDOM_PORT := $(shell expr $$(( 8000 + (`id -u` % 1000) + 1 )))


.PHONY: dev
dev: cook-image
	@echo "Will be accessible at http://$(shell hostname -f ):$(RANDOM_PORT)/"
	docker run --rm -p "$(RANDOM_PORT):8000" "$(DOCKER_TAG)"

.PHONY: cook-image
cook-image:
	docker build --pull -t $(DOCKER_TAG) .

.PHONY: push-image
push-image:
	docker push $(DOCKER_TAG)

venv: requirements.txt requirements-dev.txt
	vendor/venv-update \
			venv= $@ -ppython3 \
			install= -r requirements.txt -r requirements-dev.txt

.PHONY: install-hooks
install-hooks: venv
	$(BIN)/pre-commit install -f --install-hooks

.PHONY: test
test: venv
	$(BIN)/pre-commit run --all-files

.PHONY: clean
clean:
	rm -rf venv

.PHONY: update-requirements
update-requirements: venv
	$(BIN)/upgrade-requirements
