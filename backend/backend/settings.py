import os
from pathlib import Path
from dotenv import load_dotenv
from decouple import config, Csv
from datetime import timedelta

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent
load_dotenv(BASE_DIR / '.env')

# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/5.2/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = config('SECRET_KEY')

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = config('DEBUG', default=False, cast=bool)

ALLOWED_HOSTS = config('ALLOWED_HOSTS', cast=Csv())


# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'rest_framework',
    'rest_framework_simplejwt',
    'corsheaders',
    'api',
    # optional: django-storages for S3/MinIO backends
    'storages',
]

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    ),
    'DEFAULT_PERMISSION_CLASSES': (
        'rest_framework.permissions.IsAuthenticatedOrReadOnly',
    ),
}

SIMPLE_JWT = {
    'ACCESS_TOKEN_LIFETIME': timedelta(minutes=config('JWT_ACCESS_TOKEN_LIFETIME', default=30, cast=int)),
    'REFRESH_TOKEN_LIFETIME': timedelta(days=config('JWT_REFRESH_TOKEN_LIFETIME', default=7, cast=int)),
    'AUTH_HEADER_TYPES': (config('JWT_AUTH_HEADER_TYPE', default='Bearer'),),
    'AUTH_TOKEN_CLASSES': ('rest_framework_simplejwt.tokens.AccessToken',),
    'USER_ID_FIELD': 'id_usuario',
    'USER_ID_CLAIM': 'user_id',
}

CORS_ORIGIN_ALLOW_ALL = config('CORS_ALLOW_ALL', default=True, cast=bool)

CORS_ALLOW_ORIGINS = config('CORS_ALLOWED_ORIGINS', default='', cast=Csv())

ROOT_URLCONF = 'backend.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'backend.wsgi.application'


# Database
# https://docs.djangoproject.com/en/5.2/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': config('DB_ENGINE', default='django.db.backends.postgresql'),
        'NAME': config('DB_NAME'),
        'USER': config('DB_USER'),
        'PASSWORD': config('DB_PASSWORD'),
        'HOST': config('DB_HOST'),
        'PORT': config('DB_PORT'),
    }
}

# Email settings via environment variables.
# Default: use Mailhog (local SMTP) in development when USE_MAILHOG=True (recommended).
# You can also configure SendGrid SMTP by setting SENDGRID_API_KEY in env.
DEFAULT_FROM_EMAIL = config('DEFAULT_FROM_EMAIL', default='no-reply@example.com')

# Toggle using Mailhog locally (recommended for dev). If True, Mailhog host/port will be used.
USE_MAILHOG = config('USE_MAILHOG', default=True, cast=bool)
if USE_MAILHOG:
    EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
    EMAIL_HOST = config('MAILHOG_HOST', default='localhost')
    EMAIL_PORT = config('MAILHOG_PORT', default=1025, cast=int)
    EMAIL_USE_TLS = config('MAILHOG_USE_TLS', default=False, cast=bool)
    EMAIL_USE_SSL = config('MAILHOG_USE_SSL', default=False, cast=bool)
    EMAIL_HOST_USER = config('MAILHOG_HOST_USER', default='')
    EMAIL_HOST_PASSWORD = config('MAILHOG_HOST_PASSWORD', default='')
else:
    # If SENDGRID_API_KEY is present, configure SendGrid SMTP (smtp.sendgrid.net)
    SENDGRID_API_KEY = config('SENDGRID_API_KEY', default='')
    if SENDGRID_API_KEY:
        EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
        EMAIL_HOST = 'smtp.sendgrid.net'
        EMAIL_PORT = 587
        EMAIL_USE_TLS = True
        EMAIL_HOST_USER = 'apikey'  # SendGrid username when using API key via SMTP
        EMAIL_HOST_PASSWORD = SENDGRID_API_KEY
    else:
        # Fallback: read explicit EMAIL_* env vars or use console backend
        EMAIL_BACKEND = config('EMAIL_BACKEND', default='django.core.mail.backends.console.EmailBackend')
        EMAIL_HOST = config('EMAIL_HOST', default='')
        EMAIL_PORT = config('EMAIL_PORT', default=0, cast=int)
        EMAIL_USE_TLS = config('EMAIL_USE_TLS', default=False, cast=bool)
        EMAIL_USE_SSL = config('EMAIL_USE_SSL', default=False, cast=bool)
        EMAIL_HOST_USER = config('EMAIL_HOST_USER', default='')
        EMAIL_HOST_PASSWORD = config('EMAIL_HOST_PASSWORD', default='')


# Password validation
# https://docs.djangoproject.com/en/5.2/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/5.2/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/5.2/howto/static-files/

STATIC_URL = 'static/'

# Media / file storage
# By default, store uploaded files locally under `media/` (for development).
# To use MinIO (S3-compatible), set MINIO_ENABLED=True and provide the MINIO_* env vars.
MINIO_ENABLED = config('MINIO_ENABLED', default=False, cast=bool)
if MINIO_ENABLED:
    # Use django-storages S3 backend pointed to MinIO
    DEFAULT_FILE_STORAGE = 'storages.backends.s3boto3.S3Boto3Storage'
    AWS_S3_ENDPOINT_URL = config('MINIO_ENDPOINT', default='')  # e.g. http://127.0.0.1:9000
    AWS_ACCESS_KEY_ID = config('MINIO_ACCESS_KEY', default='')
    AWS_SECRET_ACCESS_KEY = config('MINIO_SECRET_KEY', default='')
    AWS_STORAGE_BUCKET_NAME = config('MINIO_BUCKET_NAME', default='media')
    AWS_S3_REGION_NAME = config('MINIO_REGION', default='us-east-1')
    AWS_S3_SIGNATURE_VERSION = 's3v4'
    # Use path-style addressing for MinIO; some setups may prefer 'path' or 'virtual'
    AWS_S3_ADDRESSING_STYLE = config('MINIO_ADDRESSING_STYLE', default='path')
    # Optional: make media url point directly to MinIO endpoint/bucket
    if AWS_S3_ENDPOINT_URL:
        MEDIA_URL = f"{AWS_S3_ENDPOINT_URL.rstrip('/')}/{AWS_STORAGE_BUCKET_NAME}/"
    else:
        MEDIA_URL = f"/media/"
else:
    MEDIA_ROOT = BASE_DIR / 'media'
    MEDIA_URL = '/media/'

# Default primary key field type
# https://docs.djangoproject.com/en/5.2/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'
