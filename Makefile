.PHONY: theme-update
theme-update:
	git submodule update --remote --rebase

.PHONY: serve
serve:
	hugo serve --disableFastRender

.PHONY: build
build:
	yarn run webpack
	hugo
	# hugo does something weird where it causes exa to fail, touching that dir fixes the problem
	touch docs
