from main.models import SubjectSchoolCurriculum,  SchoolCurriculum, ThemeSchoolSubjects


def create_dict_school_curriculums_subjects():
    dict_school_curriculums_subjects = {}
    for school_curriculum in SchoolCurriculum.objects.all():
        dict_school_curriculums_subjects[school_curriculum] = SubjectSchoolCurriculum.objects.filter(school_curriculum = school_curriculum)
    return dict_school_curriculums_subjects

def get_school_curriculum_by_id(id):
    return SchoolCurriculum.objects.filter(id = id)

def get_subject_by_id(id):
    return SubjectSchoolCurriculum.objects.filter(id = id)

def get_themes_by_subject(subject):
    return ThemeSchoolSubjects.objects.filter(subject_school_curriculum = subject)

def get_first_elements_of_tuples(tuples):
    first_elements = []
    for i in tuples:
        first_elements.append(i[0])
    return first_elements
