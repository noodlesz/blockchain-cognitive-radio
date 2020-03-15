import os


# See https://docs.djangoproject.com/en/2.2/ref/settings/#admins
ADMINS = [
    ('NAME', 'EMAIL')
]


# Build paths inside the project like this: os.path.join(BASE_DIR, ...)
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

LOGS_DIR = 'logs'
PID_DIR = 'pid'
PROJECT_NAME = 'PROJECT_NAME'
REPOSITORY = 'REPOSITORY'
VENV_NAME = 'venv'

DOMAIN = 'DOMAIN'
GROUP = 'GROUP'
HOME = os.path.expanduser('~')
HOST = 'HOST'
USER = 'USER'

# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/2.2/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'SECRET_KEY'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = False

ALLOWED_HOSTS = [HOST, DOMAIN]
INTERNAL_IPS = [HOST]

# https://docs.djangoproject.com/pt-br/2.2/ref/settings/#secure-proxy-ssl-header
SECURE_PROXY_SSL_HEADER = ('HTTP_X_FORWARDED_PROTO', 'https')

# https://docs.djangoproject.com/en/2.2/ref/settings/#use-x-forwarded-host
USE_X_FORWARDED_HOST = True

# https://docs.djangoproject.com/en/2.2/ref/settings/#use-x-forwarded-port
USE_X_FORWARDED_PORT = True

# https://docs.djangoproject.com/pt-br/2.2/ref/settings/#session-cookie-secure
# SESSION_COOKIE_SECURE = True

# https://docs.djangoproject.com/pt-br/2.2/ref/settings/#session-expire-at-browser-close
SESSION_EXPIRE_AT_BROWSER_CLOSE = True


# Database
# See https://docs.djangoproject.com/en/2.2/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'DBNAME',
        'USER': 'USER',
        'PASSWORD': 'PASSWORD',
        'HOST': '127.0.0.1',
        'PORT': '5432'
    }
}


# ### EMAIL ###

# https://docs.djangoproject.com/pt-br/2.2/ref/settings/#default-from-email
DEFAULT_FROM_EMAIL = 'DEFAULT_EMAIL'

# https://docs.djangoproject.com/pt-br/2.2/ref/settings/#std:setting-SERVER_EMAIL
SERVER_EMAIL = DEFAULT_FROM_EMAIL

# https://docs.djangoproject.com/pt-br/2.2/ref/settings/#email-host
EMAIL_HOST = 'EMAIL_HOST'


# Static files (CSS, JavaScript, Images)
# See https://docs.djangoproject.com/en/2.2/howto/static-files/

STATICFILES_DIRS = [
    os.path.join(BASE_DIR, 'front', 'dist')
]
STATIC_ROOT = os.path.join(HOME, 'static')

# Media files
# https://docs.djangoproject.com/en/2.2/ref/settings/#file-uploads

MEDIA_ROOT = os.path.join(HOME, 'media')


# ### LOGGING ###
# https://docs.djangoproject.com/pt-br/2.2/topics/logging/

LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'formatters': {
        'syslog': {
            'format': '%(process)d %(thread)d %(name)s %(levelname)s %(message)s'
        },
        'verbose': {
            'format': '%(levelname)s %(asctime)s %(module)s %(process)d %(thread)d %(message)s'
        }
    },
    'handlers': {
        'django_file': {
            'level': 'INFO',
            'class': 'logging.handlers.RotatingFileHandler',
            'filename': os.path.join(HOME, 'logs/blockchain.log'),
            'formatter': 'verbose',
            'maxBytes': 10 * 1024 * 1024,  # 10 MB
            'backupCount': 24
        },
        'mail_admins': {
            'level': 'ERROR',
            'class': 'django.utils.log.AdminEmailHandler',
            'include_html': True
        }
    },
    'loggers': {
        'django.request': {
            'handlers': ['django_file', 'mail_admins'],
            'level': 'ERROR',
            'propagate': False
        }
    }
}


# Webpack loader
# https://github.com/owais/django-webpack-loader

WEBPACK_LOADER = {
    'DEFAULT': {
        'BUNDLE_DIR_NAME': 'dist/',
        'STATS_FILE': os.path.join(BASE_DIR, 'front', 'config', 'webpack-stats-prod.json'),
    }
}