# Tiny static site: serves the Austin → Sydney move-inventory app.
# No build step — it's plain HTML/CSS/JS.
FROM nginx:1.27-alpine

# App files (index.html, data/, csv, md, readme)
COPY . /usr/share/nginx/html/
# Don't serve the Dockerfile/compose into the web root
RUN rm -f /usr/share/nginx/html/Dockerfile \
          /usr/share/nginx/html/docker-compose.yml \
          /usr/share/nginx/html/nginx.conf

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
HEALTHCHECK --interval=30s --timeout=3s --retries=3 \
  CMD wget -qO- http://localhost/ >/dev/null 2>&1 || exit 1
