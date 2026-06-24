#!/bin/bash

docker exec -it "skill-checker-$1" bash 2>/dev/null \
|| docker exec -it "skill-checker-$1" sh

# ./dc.sh frontend
# ./dc.sh backend
# ./dc.sh db