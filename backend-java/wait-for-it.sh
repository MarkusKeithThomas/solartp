#!/usr/bin/env bash
#   Use this script to test if a given TCP host/port are available

set -e

TIMEOUT=15
QUIET=0
HOST=""
PORT=""
CMD=""

print_usage() {
    echo "Usage: $0 host:port [--timeout=seconds] [--quiet] [-- command args]"
    echo
    echo "  --timeout=SECONDS  Timeout in seconds, default is 15"
    echo "  --quiet            Don't output any status messages"
    echo "  --                 Command to run after the host:port is available"
}

while [[ $# -gt 0 ]]
do
    case "$1" in
        *:* )
        HOSTPORT=(${1//:/ })
        HOST=${HOSTPORT[0]}
        PORT=${HOSTPORT[1]}
        shift 1
        ;;
        --timeout=*)
        TIMEOUT="${1#*=}"
        shift 1
        ;;
        --quiet)
        QUIET=1
        shift 1
        ;;
        --)
        shift
        CMD="$@"
        break
        ;;
        *)
        echo "Unknown argument: $1"
        print_usage
        exit 1
        ;;
    esac
done

if [[ "$HOST" == "" || "$PORT" == "" ]]; then
    echo "Error: host and port must be provided"
    print_usage
    exit 1
fi

if [[ "$QUIET" -ne 1 ]]; then
    echo "Waiting for $HOST:$PORT..."
fi

START_TIME=$(date +%s)

while :
do
    (echo > /dev/tcp/$HOST/$PORT) >/dev/null 2>&1 && break

    ELAPSED_TIME=$(($(date +%s) - $START_TIME))

    if [[ "$ELAPSED_TIME" -ge "$TIMEOUT" ]]; then
        echo "Timeout after ${TIMEOUT}s waiting for $HOST:$PORT"
        exit 1
    fi

    sleep 1
done

if [[ "$QUIET" -ne 1 ]]; then
    echo "$HOST:$PORT is available!"
fi

if [[ "$CMD" != "" ]]; then
    exec $CMD
fi