# Containerized Repo App

## Getting Started
* Install your favorite IDE or TextEditor
* Install Docker Desktop
* `docker compose --env-file ./conf/dev.env up --build`
* Visit http://localhost:8080/tasks

## Security Check
* `docker scout cves`
* `docker scout sbom`

## Live Rebuild
* `docker compose --env-file ./conf/dev.env alpha watch`

## Speed
* `docker login`
* `docker buildx create --driver cloud --name cloud-build docker/devrel`
* `docker buildx use cloud-build --global`
* `docker buildx ls`

## Back To Defaults
* `docker context use default`
* `docker buildx use default --global`