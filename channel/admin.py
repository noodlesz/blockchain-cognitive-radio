# Django Imports
from django.contrib import admin

# Local Imports
from .models import (
    Channel,
    ChannelLease,
    ChannelAllocation
)
from .constants import CHANNEL_TYPES


class ChannelAdmin(admin.ModelAdmin):
    list_display = (
        'technology',
        'band'
    )

    def technology(self, channel):
        technology = channel.channel_type
        return CHANNEL_TYPES[int(technology) - 1][1]


class ChannelLeaseAdmin(admin.ModelAdmin):
    list_display = (
        'ssid',
        'channel',
        'owner'
    )


class ChannelAllocationAdmin(admin.ModelAdmin):
    list_display = (
        'channel_leased',
        'power',
        'user',
        'duration'
    )


admin.site.register(Channel, ChannelAdmin)
admin.site.register(ChannelLease, ChannelLeaseAdmin)
admin.site.register(ChannelAllocation, ChannelAllocationAdmin)
