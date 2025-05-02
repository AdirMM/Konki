from rest_framework.routers import DefaultRouter
from .views import *

# Creamos router
router = DefaultRouter()
router.register(r'categories', CategoryViewSet, basename='categories')
router.register(r'notes', NoteViewSet, basename='notes')

# Incluimos las generadas automaticamente
urlpatterns = router.urls