# Standard imports
from django.db import models
from django.contrib.auth.models import User
from django_extensions.db.models import TimeStampedModel, ActivatorModel
from django.utils.translation import ugettext as _

# Local imports
from .constants import CHANNEL_TYPES, CHANNEL_WIFI


class Channel(TimeStampedModel):
    channel_type = models.CharField(_('Tipo do Canal'),
        choices=CHANNEL_TYPES, default=CHANNEL_WIFI, max_length=20)

    band = models.IntegerField(_('Número do Canal'))

    def __str__(self):
        channel_type = CHANNEL_TYPES[int(self.channel_type) - 1][1]
        return f'{channel_type} - channel {self.band}'


class ChannelLease(TimeStampedModel, ActivatorModel):
    ssid = models.CharField(max_length=255)

    channel = models.ForeignKey(Channel, on_delete=models.CASCADE)

    password = models.CharField(max_length=255)

    owner = models.ForeignKey(User, on_delete=models.CASCADE)

    begin = models.DateTimeField()

    end = models.DateTimeField()

    def __str__(self):
        return f'{self.ssid} - {self.channel}'


class ChannelAllocation(TimeStampedModel, ActivatorModel):
    channel_leased = models.ForeignKey(ChannelLease, on_delete=models.CASCADE)

    power = models.IntegerField()

    user = models.ForeignKey(User, on_delete=models.CASCADE)

    duration = models.DurationField()

    def __str__(self):
        return self.ssid
