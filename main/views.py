from django.shortcuts import render
from main.models import SchoolCurriculum, SubjectSchoolCurriculum, ThemeSchoolSubjects
from main.services import *
from review.forms import ReviewForm



def home(request):
    return render(request, 'home.html', {'form': ReviewForm})

def school_curriculums(request):
    dict_school_curriculums_subjects = create_dict_school_curriculums_subjects()
    types_school_class = get_first_elements_of_tuples(SubjectSchoolCurriculum.types_school_class) 
    return render(request, 'school_curriculums.html', locals())

def subject_school_curriculums(request, id_subject):
    subject = get_subject_by_id(id_subject)[0]
    themes = get_themes_by_subject(subject)
    return render(request, 'subject_school_curriculum.html', locals())