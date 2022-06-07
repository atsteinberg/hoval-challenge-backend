# Hoval Challenge backend

## Preparation

### Node
Make sure Node v17.4.0 is installed. Install otherwise

### Docker
Make sure Docker command line tool is available. Install otherwise

### SSL Certificates

create ssl certificate and key for localhost and copy to `src/common/config/localhost-cert-key.pem` and `src/common/config/localhost-cert.pem`, e.g. by using `mkcert`:

```bash
mkcert -install
mkcert -key-file localhost-cert-key.pem -cert-file localhost-cert.pem localhost
```

## Run

in dev mode: `npm run start:dev` (watching changes in the code)

in normal mode: `npm run start`


