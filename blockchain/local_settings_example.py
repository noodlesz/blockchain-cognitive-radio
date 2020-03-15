LOCAL_APPS = [
    # 'debug_toolbar',
    # 'silk'
]

LOCAL_MIDDLEWARE = [
    # 'debug_toolbar.middleware.DebugToolbarMiddleware',
    # 'silk.middleware.SilkyMiddleware',
]

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        'NAME': 'blockchain_db',
        'USER': 'blockchain_user',
        'PASSWORD': 'blockchain_password',
        'HOST': 'localhost',
        'PORT': '',
    }
}
