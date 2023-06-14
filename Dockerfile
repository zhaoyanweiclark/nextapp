FROM node:16.20.0-alpine3.17 as builder

WORKDIR /srv

ADD package-lock.json package-lock.json
ADD package.json package.json

RUN npm install

ADD app app
ADD database database
ADD public public
ADD .eslintrc.json .eslintrc.json
ADD next.config.js next.config.js
ADD postcss.config.js postcss.config.js
ADD tailwind.config.js tailwind.config.js
ADD tsconfig.json tsconfig.json

RUN npm run build

FROM node:16.20.0-alpine3.17

WORKDIR /srv

COPY --from=builder /srv/node_modules node_modules
COPY --from=builder /srv/public public
COPY --from=builder /srv/package.json package.json
COPY --from=builder /srv/.next .next
COPY --from=builder /srv/next.config.js next.config.js

# CMD ["npm", "run", "start"]

RUN npm install -g pm2
CMD ["pm2-runtime", "start", "npm", "--", "run", "start"]
