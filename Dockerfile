FROM quay.io/loki-xer/jarvis-md:latest
RUN git clone https://github.com/Kiranxer/X-Asena2
WORKDIR /xasena
RUN npm install
CMD ["node", "index.js"]
