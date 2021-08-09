#!/bin/bash
#
#
gunicorn -w 1 --worker-class eventlet -b 0.0.0.0:5000 --log-level=debug wsgi:app
