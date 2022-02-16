from django.contrib.admin.utils import label_for_field
from django.db import models
from phonenumber_field.modelfields import PhoneNumberField

class Review(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(verbose_name=u"Имя", null=False, blank=False, max_length=200)
    phone = PhoneNumberField(verbose_name=u"Телефон", null=False, blank=False)
    city = models.CharField(verbose_name='Город', null=False, blank=False, max_length=150)
    comment = models.TextField(verbose_name='Комментарий', null=False, blank=False)

    class Meta:
        verbose_name = "Отзыв"
        verbose_name_plural = "Отзывы"