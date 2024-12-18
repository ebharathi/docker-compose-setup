#!/bin/sh
sed -i "s|__REACT_APP_BACKEND_API__|$REACT_APP_BACKEND_API|g" /usr/share/nginx/html/assets/*.js