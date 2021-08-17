#!/bin/sh
echo "enter commit message"
read commitMsg
git add . && git commit -m "$commitMsg" && git push -u origin main