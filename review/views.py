from django.shortcuts import  render
from django.http import HttpResponseRedirect, HttpResponse
from django.contrib import messages


from .models import *

from .forms import ReviewForm


def review_add(request):
    error = ''
    if request.method == 'POST':
        form = ReviewForm(request.POST)
        if form.is_valid():
            form.save() 
            return HttpResponseRedirect('/')
    else:
        form = ReviewForm
    
    return render(request, 'home.html', {'form':form})