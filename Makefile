sprites:
	PYTHONPATH="${PYTHONPATH}:./vendor/glue/package/lib/python2.7/site-packages/" ./vendor/glue/package/bin/glue \
		 --project --cachebuster --crop --css-template=./vendor/glue/css.template \
		./sprites ./static/images/sprites
	mv ./static/images/sprites/*.scss ./static/css/sprites/
.PHONY: sprites