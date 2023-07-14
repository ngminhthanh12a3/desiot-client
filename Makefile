build:
	sudo npm run build
	sudo rm -rf /var/www/desiot-client/*
	sudo cp -r ./dist/* /var/www/desiot-client
	sudo systemctl reload nginx