from django.utils.deprecation import MiddlewareMixin


# TODO: Please remove this in the future
# it was creater for bootstrap the application easily
class DisableCSRF(MiddlewareMixin):
    def process_request(self, request):
        setattr(request, '_dont_enforce_csrf_checks', True)
