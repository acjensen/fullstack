while [[ "$(curl -s -o /dev/null -w ''%{http_code}'' localhost:3010)" != "200" ]]; do sleep 2; done