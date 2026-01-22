1) Run from this dir: `docker compose up -d --build`

2) To update nginx: `docker compose restart nginx`

3) To create `ssl-dhparams.pem`

```bash
curl https://raw.githubusercontent.com/certbot/certbot/master/certbot/certbot/ssl-dhparams.pem \
  -o ../../certbot/conf/ssl-dhparams.pem
```

4) To create `options-ssl-nginx.conf`

```bash
curl https://raw.githubusercontent.com/certbot/certbot/master/certbot-nginx/certbot_nginx/_internal/tls_configs/options-ssl-nginx.conf \
  -o ../../certbot/conf/options-ssl-nginx.conf
```

##Note don't forget to make shared network

`docker network create nymb_shared_network`

4) to renew certificate 

```bash
docker compose run --rm --entrypoint "" certbot certbot certonly --webroot \
  --webroot-path=/var/www/certbot \
  -d api.nymb-test.icu \
  --email nymb.social@gmail.com \
  --agree-tos \
  --no-eff-email
```