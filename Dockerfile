FROM node:18

RUN npm install -g pnpm

ENV VITE_API_URL /api
ENV VITE_SECRET_KEY_CRYPT nWVbzlUckedfT1eGzJcaJg

WORKDIR /tmp/vue

COPY . .

RUN pnpm install

RUN pnpm run build

RUN mkdir -p /var/www/html
RUN mv dist/* /var/www/html

WORKDIR /

RUN rm -rf /tmp/vue