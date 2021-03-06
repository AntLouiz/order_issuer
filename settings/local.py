import socket

from .base import *

DEBUG = True

INTERNAL_IPS = ['127.0.0.1', '10.0.2.2', '::1', 'localhost']

# get ip address for docker host
hostname, _, ips = socket.gethostbyname_ex(socket.gethostname())
for ip in ips:
    # replace last octet in IP with .1
    ip = '{}.1'.format(ip.rsplit('.', 1)[0])
    INTERNAL_IPS.append(ip)

INSTALLED_APPS += [
	'django_extensions',
    'backend.clients',
    'backend.products',
    'backend.orders'
]
