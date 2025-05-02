from django.db import models

class Category(models.Model):
    pk_category = models.AutoField(primary_key=True)  # INT, PK
    name = models.CharField(max_length=50, null=False)  # VARCHAR(50), NOT NULL
    color = models.CharField(max_length=7, null=False)  # VARCHAR(7), NOT NULL (ej. '#FFFFFF')
    icon = models.CharField(max_length=50, null=False)  # VARCHAR(50), NOT NULL (ej. 'fa-solid fa-book')
    created_at = models.DateTimeField(auto_now_add=True)  # DATETIME, NOT NULL
    updated_at = models.DateTimeField(auto_now=True)  # DATETIME, NOT NULL

    def __str__(self):
        return self.name

    class Meta:
        db_table = 'category'  # Nombre de la tabla en la base de datos

class Note(models.Model):
    pk_note = models.AutoField(primary_key=True)  # INT, PK
    name = models.CharField(max_length=100, null=False)  # VARCHAR(100), NOT NULL
    created_at = models.DateTimeField(auto_now_add=True)  # DATETIME, NOT NULL
    updated_at = models.DateTimeField(auto_now=True)  # DATETIME, NOT NULL
    is_active = models.BooleanField(default=True)  # BOOLEAN, NOT NULL
    fk_category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name='notes')  # FK a Category

    def __str__(self):
        return self.title

    class Meta:
        db_table = 'note'  # Nombre de la tabla en la base de datos
