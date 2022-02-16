from django.contrib import admin
from review.models import *

from django.shortcuts import render

from django.db.models import Count

class ReviewAdmin(admin.ModelAdmin):
    change_list_template = 'admin/reviews.html'
    list_display = ('id', 'name', 'phone', 'city', 'comment')
    search_fields = ('name', 'city')


    def changelist_view(self, request, extra_context=None):
        data = [['Город', "Число людей с этого города"]]
        citys = Review.objects.values_list('city', flat=True).distinct()
        for city in citys:
            data.append([city, Review.objects.filter(city=city).count()])
        


        response = super(ReviewAdmin, self).changelist_view(request, extra_context)
        extra_context = {
            'data': data,
        }
        try:
            response.context_data.update(extra_context)
        except Exception as e:
            pass
        return response
     

admin.site.register(Review, ReviewAdmin)