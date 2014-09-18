
GENERATOR_URL = http://framergenerator-update.s3-website-us-east-1.amazonaws.com
GENERATOR_LATEST_PATH = $(shell curl $(GENERATOR_URL)/latest.txt)

update:
	rm -Rf build
	mkdir -p build
	 
	# Download the Framer lib
	wget -O build/Framer.zip http://builds.framerjs.com/latest/Framer.zip
	cd build; unzip Framer.zip

	# Download the Generator
	@echo $(GENERATOR_LATEST_PATH)
	wget -O build/FramerGenerator.tar.gz "$(GENERATOR_URL)/$(GENERATOR_LATEST_PATH)"
	cd build; tar -zxvf FramerGenerator.tar.gz
	cd build; spctl -a -vvvvvvv "Framer Generator.app" 
	cd build; mv "Framer Generator.app" "Framer/Framer Generator.app"

	# Create the Framer zip
	cd build; zip -r --symlinks Framer.zip Framer
	# cd build; tar -cvzf Framer.tar.gz Framer

	# Test if the zipped app is still code signed
	cd build; mv Framer Framer.bak
	# cd build; tar -zxvf Framer.tar.gz
	cd build; unzip Framer.zip
	cd build; spctl -a -vvvvvv "Framer/Framer Generator.app"

	# Move it to the download dir
	# cp build/Framer.tar.gz static/downloads/Framer.tar.gz
	# rm static/downloads/Framer.zip
	cp build/Framer.zip static/downloads/Framer.zip

upload:
	cactus deploy

optimize:
	cd Examples; find ./static -name "*.png" -exec optipng -o3 {} \;

sprites:

	python sprites/export.py

	PYTHONPATH="${PYTHONPATH}:./vendor/glue/package/lib/python2.7/site-packages/" ./vendor/glue/package/bin/glue \
		 --algorithm=square --cachebuster --crop --css-template=./vendor/glue/css-1x.template \
		./sprites/sprite1x ./static/images/sprites/
	mv ./static/images/sprites/sprite1x.css ./static/css/sprites/sprite1x.scss

	PYTHONPATH="${PYTHONPATH}:./vendor/glue/package/lib/python2.7/site-packages/" ./vendor/glue/package/bin/glue \
		 --algorithm=square --cachebuster --crop --css-template=./vendor/glue/css-2x.template \
		./sprites/sprite2x ./static/images/sprites/
	mv ./static/images/sprites/sprite2x.css ./static/css/sprites/sprite2x.scss

.PHONY: sprites update upload optimize