FROM jod-bullseye

RUN apt-get update && apt-get install -y make ocaml opam && rm -rf /var/lib/apt/lists/*

WORKDIR /src

COPY . .

RUN opam init -y --disable-sandboxing && \
    opam install -y ocamlfind ounit2 && \
    . /root/.opam/opam-init/init.sh > /dev/null 2>&1 && \
    make

RUN npm install express

EXPOSE 5000

CMD ["node", "src/index.js"]