FROM node:14.16
RUN mkdir -p /home/Service
WORKDIR /home/Service    # Bundle app source
COPY ./server/dist /home/Service
RUN  npm install -g forever
EXPOSE 3000
# RUN forever start  /home/Service/main.js
CMD ["forever","start","/home/Service/main.js"]