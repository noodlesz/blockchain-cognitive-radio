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
router.register(r'lease', ChannelLeaseViewSet, base_name='lease')
router.register(r'allocate', ChannelAllocationViewSet, base_name='allocate')

urlpatterns = router.urls
