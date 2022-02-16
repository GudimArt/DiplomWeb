from django.forms import ModelForm

from review.models import *


class ReviewForm(ModelForm):
    def __init__(self, *args, **kwargs):
        kwargs.setdefault('label_suffix', '')
        super(ReviewForm, self).__init__(*args, **kwargs)
    class Meta():
        model = Review
        fields = ('name', 'phone', 'city', 'comment')
        labels = {'name':'Ваше имя:', 'phone':'Ваш телефон:','city':'Ваш город:','comment':'Комментарий'}