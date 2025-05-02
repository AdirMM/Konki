from rest_framework import serializers
from apps.konki.models import *

class CategoriesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'
        
class NotesSerializer(serializers.ModelSerializer):    
    category_name = serializers.CharField(source='fk_category.name', read_only=True)

    class Meta:
        model = Note
        fields = '__all__'