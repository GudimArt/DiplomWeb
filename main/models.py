from msilib import type_binary
from turtle import mode
from django.db import models


class SchoolCurriculum(models.Model):
    id = models.AutoField(primary_key=True)
    title = models.CharField(verbose_name=u"Название", max_length=200)
    description = models.TextField(verbose_name=u"Описание", blank=True)

    def __str__(self):
        return self.title

    class Meta:
        verbose_name = "Школьная программа"
        verbose_name_plural = "Школьные программы"


class SubjectSchoolCurriculum(models.Model):
    id = models.AutoField(primary_key=True)
    title = models.CharField(verbose_name=u"Название", max_length=200)
    description = models.TextField(verbose_name=u"Описание", blank=True)
    school_curriculum  = models.ForeignKey(SchoolCurriculum, verbose_name=u"Школьная программа", on_delete=models.CASCADE)
    types_school_class = (
        ('10', '10 класс'),
        ('11', '11 класс')
    )
    school_class = models.CharField(verbose_name=u"Номер класса", choices=types_school_class, max_length=50, blank=True)

    def __str__(self):
        return self.title + " " + self.school_class + " " + "класс"

    class Meta:
        verbose_name = "Предмет школьной программы"
        verbose_name_plural = "Предметы школьной программы"

class ThemeSchoolSubjects(models.Model):
    id = models.AutoField(primary_key=True)
    title = models.CharField(verbose_name=u"Название", max_length=200)
    description = models.TextField(verbose_name=u"Описание", blank=True)
    subject_school_curriculum  = models.ForeignKey(SubjectSchoolCurriculum, verbose_name=u"Предмет школьной программы программа", on_delete=models.CASCADE)

    def __str__(self):
        return self.title + " " + "-" + " " + str(self.subject_school_curriculum)

    class Meta:
        verbose_name = "Предмет школьной программы"
        verbose_name_plural = "Предметы школьной программы"
    class Meta:
        verbose_name = "Тема школьной программы"
        verbose_name_plural = "Темы школьных программ"