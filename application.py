import requests, datetime
from flask import Flask, request, render_template, url_for

app=Flask(__name__)


@app.route("/")
def map():
    return render_template("search.html", geocode="", date_value="", initial_page=True)

@app.route("/search", methods=["POST","GET"]) 
def search():
    daterange=""
    data=""
    if request.method=="POST":
        daterange=request.form.get("daterange")
        date=daterange.split("-")
        startDate=date[0].strip()
        endDate=date[1].strip()
        startdatetime="'"+str(datetime.datetime.strptime(startDate, '%m/%d/%Y').date())+"'"
        enddatetime="'"+str(datetime.datetime.strptime(endDate, '%m/%d/%Y').date())+"'"
        res=requests.get("https://data.calgary.ca/resource/c2es-76ed.geojson", params={"$where": "issueddate > "+startdatetime+" and issueddate < "+enddatetime})
        
        if res.status_code==200:
            data=res.json()
        else:
            data=""
    
    return render_template("search.html", geocode=data, date_value=daterange, initial_page=False)

if __name__== "__main__" :
    app.run()