#!/bin/sh
sed -i "s/NGINX_PORT/${NGINX_FRONT_PORT}/g" /etc/nginx/conf.d/default.conf
exec nginx -g 'daemon off;'