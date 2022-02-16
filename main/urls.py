from django.urls import path
from . import views



urlpatterns = [
    path('', views.home, name='home'),
    path('school_curriculums', views.school_curriculums, name='school_curriculums'),
    path('subject_<int:id_subject>', views.subject_school_curriculums, name='subject_school_curriculum')
]