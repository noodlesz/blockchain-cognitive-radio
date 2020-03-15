from django.utils.translation import ugettext as _

CHANNEL_WIFI = 1
CHANNEL_BLUETOOTH = 2
CHANNEL_ZIGBEE = 3

CHANNEL_TYPES = (
    (CHANNEL_WIFI, _('Wi-Fi')),
    (CHANNEL_BLUETOOTH, _('Bluetooth')),
    (CHANNEL_ZIGBEE, _('Zigbee')),
)
