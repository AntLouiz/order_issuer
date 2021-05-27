define step
	@echo -e "\x1b[34;01m>>> $(1)\x1b[0m"
endef

install-requirements:
	# Install requirements for a local development environment
	$(call step,Installing npm...)
	pip install npm
	$(call step,Installing packages from package.lock...)
	npm install
	pip install -r requirements.txt

update-requirements:
	$(call step,Upgrading local packages in package.lock...)
	npm update

setup-frontend:
	npm install
	npm run start
	python manage.py collectstatic

setup-data:
	$(call step,Exporting the initial data...)
	python manage.py migrate
	python manage.py loaddata fixtures/products.json
	python manage.py loaddata fixtures/clients.json

test:
	$(call step,Running all tests under tests/...)
	pytest
