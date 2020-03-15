clean:
	./manage.py clean_pyc

setup: requirements-dev create-local-settings migrate

requirements-dev:
	pip install -r requirements/develop.txt

runserver:
	./manage.py runserver 0.0.0.0:8000

runreact:
	npm run --prefix front start

build-react:
	npm run --prefix front build

migrate:
	./manage.py migrate

migrations:
	./manage.py makemigrations

showmigrations:
	./manage.py showmigrations

urls:
	./manage.py show_urls

shell:
	./manage.py shell_plus

shell-sql:
	./manage.py shell_plus --print-sql

collectstatic:
	./manage.py collectstatic

test:
	./manage.py test

local-settings:
	cp saori/local_settings.example.py saori/local_settings.py

update-local-settings:
	cp saori/local_settings.py saori/local_settings.example.py

fixtures:
	./manage.py loaddata killchain

superuser:
	./manage.py createsuperuser
