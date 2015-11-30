usage:
	@echo "usage: make {init|install|start|dev-init|dev-start}"

init:
	npm install

start:
	/etc/init.d/ginst start

install:
	ln -sf /srv/ginst/misc/ginst-vhost /etc/nginx/sites-enabled/
	ln -sf /srv/ginst/misc/ginst /etc/init.d/

dev-init: init
	npm install supervisor -g

dev-start:
	supervisor app.js

