FROM node:20.9.0-alpine AS client
EXPOSE 4200 49153
USER node

RUN mkdir /home/node/.npm-global
ENV PATH=/home/node/.npm-global/bin:$PATH
ENV NPM_CONFIG_PREFIX=/home/node/.npm-global

# RUN npm config set registry https://registry.npmjs.org/
RUN npm install -g @angular/cli@17.0.2

WORKDIR /app
CMD ["ng", "serve", "--port", "4200", "--host", "0.0.0.0", "--disable-host-check", "--poll", "2000"]
