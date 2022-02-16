from django.db import models


class School_curriculum(models.Model):
    id = models.AutoField(primary_key=True)
    title = models.CharField(verbose_name=u"Название", max_length=200)
    description = models.TextField(verbose_name=u"Описание", blank=True)

    def __str__(self):
        return self.title

    class Meta:
        verbose_name = "Школьная программа"
        verbose_name_plural = "Школьные программы"


class Subject_school_curriculum(models.Model):
    id = models.AutoField(primary_key=True)
    title = models.CharField(verbose_name=u"Название", max_length=200)
    description = models.TextField(verbose_name=u"Описание", blank=True)
    school_curriculum  = models.ForeignKey(School_curriculum, verbose_name=u"Школьная программа", on_delete=models.CASCADE)

    def __str__(self):
        return self.title

    class Meta:
        verbose_name = "Предмет школьной программы"
        verbose_name_plural = "Предмет школьной программы"