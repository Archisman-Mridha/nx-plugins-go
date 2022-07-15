FROM golang:1.18-alpine AS builder

WORKDIR /app

COPY go.mod .
COPY go.sum .

RUN go mod download

COPY . .

RUN go mod build -o ./build

FROM alpine

COPY --from=builder ./build ./build

EXPOSE 4000

ENTRYPOINT [ "./build" ]
