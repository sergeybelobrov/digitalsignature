"""untitled URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.11/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
import private_storage.urls
from django.conf.urls import url, include
from django.contrib import admin
from rest_framework import routers
from rest_framework_jwt.views import obtain_jwt_token
from rest_framework_swagger.views import get_swagger_view
from .upload import UploadPDFView
import digitalsignature.views as views
from django.conf import settings
from django.views.static import serve


API_PREFIX = r'^v(?P<version>[0-9]+\.[0-9]+)'

schema_view = get_swagger_view(title='Digital Signature Api')


router = routers.DefaultRouter()
router.register(r'pdf', views.PDFViewSet, 'PDF')
router.register(r'page', views.PageViewSet, 'Page')
router.register(r'document', views.DocumentViewSet, 'Document')
router.register(r'template', views.TemplateViewSet, 'Template')
router.register(r'party', views.PartyViewSet, 'Party')
router.register(r'abstractParty', views.AbstractPartyViewSet, 'AbstractParty')
router.register(r'abstractSignature', views.AbstractSignatureViewSet, 'AbstractSignature')
router.register(r'signature', views.SignatureViewSet, 'Signature')


urlpatterns = [
    url(r'^media/(?P<path>.*)$', serve, {'document_root': settings.MEDIA_ROOT}),
    url(r'^admin/', admin.site.urls),
    url(r'^', include(router.urls)),
    url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    url(r'^api-token-auth/', obtain_jwt_token),
    url('^upload-pdf/', UploadPDFView.as_view()),
    url(f'{API_PREFIX}/', include('rest_framework.urls', namespace='api')),
    url(f'{API_PREFIX}/', include(router.urls)),
    url(f'{API_PREFIX}/', include('drf_openapi.urls')),

]

