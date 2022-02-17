from main.models import Subject_school_curriculum,  School_curriculum


def create_dict_school_curriculums_subjects():
    dict_school_curriculums_subjects = {}
    for school_curriculum in School_curriculum.objects.all():
        dict_school_curriculums_subjects[school_curriculum] = Subject_school_curriculum.objects.filter(school_curriculum = school_curriculum)
    return dict_school_curriculums_subjects

def get_subject_by_id(id):
    return Subject_school_curriculum.objects.filter(id = id)

def get_school_curriculum_by_id(id):
    return School_curriculum.objects.filter(id = id)

def get_first_elements_of_tuples(tuples):
    first_elements = []
    for i in tuples:
        first_elements.append(i[0])
    return first_elements
