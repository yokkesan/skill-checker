FROM php:8.3-cli

RUN sed -i 's|http://deb.debian.org|https://deb.debian.org|g' /etc/apt/sources.list.d/debian.sources \
    && apt-get update \
    && apt-get install -y \
    zip \
    unzip \
    git \
    curl \
    vim \
    libzip-dev \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    sqlite3 \
    default-mysql-client \
    && docker-php-ext-install \
    pdo_mysql \
    mbstring \
    bcmath \
    exif \
    pcntl \
    zip \
    && apt-get clean

COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

WORKDIR /var/www/html