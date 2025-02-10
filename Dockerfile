FROM php:8.2-fpm
RUN apt-get update && apt-get install -y libpng-dev libjpeg-dev libfreetype6-dev zip git && \
    docker-php-ext-configure gd --with-freetype --with-jpeg && \
    docker-php-ext-install gd
WORKDIR /var/www
COPY . .
RUN composer install
EXPOSE 8000
CMD ["php-fpm"]