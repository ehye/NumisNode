#!/bin/bash

pnpm --filter ".\frontend\**" install

pnpm --filter ".\frontend\**" run build

pnpm  install

pnpm run start