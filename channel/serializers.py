
# Standard imports
from rest_framework import serializers

# Local imports
from .models import (
    Channel,
    ChannelLease,
    ChannelAllocation
)


class ChannelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Channel
        fields = ['id', 'channel_type', 'band']


class ChannelLeaseSerializer(serializers.ModelSerializer):
    class Meta:
        model = ChannelLease
        fields = ['id', 'ssid', 'channel', 'password', 'owner', 'begin', 'end']


class ChannelAllocationSerializer(serializers.ModelSerializer):
    class Meta:
        model = ChannelAllocation
        fields = ['id', 'channel_leased', 'power', 'user', 'duration']
