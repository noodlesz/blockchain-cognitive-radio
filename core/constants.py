from django.utils.translation import gettext_lazy as _

INACTIVE_STATUS = 0
ACTIVE_STATUS = 1

STATUS_CHOICES = (
    (INACTIVE_STATUS, _('Inactive')),
    (ACTIVE_STATUS, _('Active')),
)
