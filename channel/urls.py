# Standard imports
from rest_framework import routers

# Local imports
from .api import (
    ChannelViewSet,
    ChannelLeaseViewSet,
    ChannelAllocationViewSet
)


router = routers.DefaultRouter()
router.register(r'channel', ChannelViewSet, base_name='channel')
router.register(r'channel_lease', ChannelLeaseViewSet, base_name='channel_lease')
router.register(r'channel_allocation', ChannelAllocationViewSet, base_name='channel_allocation')

urlpatterns = router.urls
