sprites:

	PYTHONPATH="${PYTHONPATH}:./vendor/glue/package/lib/python2.7/site-packages/" ./vendor/glue/package/bin/glue \
		 --algorithm=square --cachebuster --crop --css-template=./vendor/glue/css-1x.template \
		./sprites/sprite1x ./static/images/sprites/
	mv ./static/images/sprites/sprite1x.css ./static/css/sprites/sprite1x.scss

	PYTHONPATH="${PYTHONPATH}:./vendor/glue/package/lib/python2.7/site-packages/" ./vendor/glue/package/bin/glue \
		 --algorithm=square --cachebuster --crop --css-template=./vendor/glue/css-2x.template \
		./sprites/sprite2x ./static/images/sprites/
	mv ./static/images/sprites/sprite2x.css ./static/css/sprites/sprite2x.scss

.PHONY: sprites