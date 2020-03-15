# Standard imports
from rest_framework import viewsets, views
from rest_framework.decorators import action

# Local imports
from .models import (
    Channel,
    ChannelLease,
    ChannelAllocation
)

from .serializers import (
    ChannelSerializer,
    ChannelLeaseSerializer,
    ChannelAllocationSerializer
)


class ChannelViewSet(viewsets.ModelViewSet):
    queryset = Channel.objects.all()
    serializer_class = ChannelSerializer


class ChannelLeaseViewSet(viewsets.ModelViewSet):
    queryset = ChannelLease.objects.all()
    serializer_class = ChannelLeaseSerializer


class ChannelAllocationViewSet(viewsets.ModelViewSet):
    queryset = ChannelAllocation.objects.all()
    serializer_class = ChannelAllocationSerializer

    def get_queryset(self):
        queryset = super().get_queryset()
        return queryset.active().order_by('-created')

    def get_serializer_class(self):
        return self.serializer_class

    @action(detail=False, methods=['GET'], url_path='available_channels')
    def available_channels(self, request, *args, **kwargs):
        return views.Response('List of Available Channels')

    @action(detail=False, methods=['POST'], url_path='allocate_band')
    def allocate_band(self, request, *args, **kwargs):
        return views.Response('Allocate Band')
