define step
	@echo -e "\x1b[34;01m>>> $(1)\x1b[0m"
endef


update-requirements:
	$(call step,Upgrading local packages in package.lock...)
	npm update

install-requirements:
	# Install requirements for a local development environment
	$(call step,Installing npm...)
	pip install npm
	$(call step,Installing packages from package.lock...)
	npm install

setup-data:
	$(call step,Exporting the initial data...)
	python manage.py loaddata fixtures/products.json
	python manage.py loaddata fixtures/clients.json

setup-frontend:
	npm install

test:
	$(call step,Running all tests under tests/...)
	pytest
