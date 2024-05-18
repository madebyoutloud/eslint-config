#!/bin/bash

for d in packages/* ; do
  (cd $d && npm version $1)
done
