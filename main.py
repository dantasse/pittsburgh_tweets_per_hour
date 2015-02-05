#!/usr/bin/env python

from flask import Flask, render_template, request, jsonify, json, url_for, flash, redirect
import csv, time, os
from collections import Counter

SITE_ROOT = os.path.realpath(os.path.dirname(__file__))
app = Flask(__name__)
app.secret_key = 'some_secret'
app.debug = True

bins_tweets_per_hour = {} # int hour -> (string(lat, lon) -> count)
def load_data():
    print "loading data"
    start = time.time()
    
    global bins_tweets_per_hour
    for i in range(24):
        bins_tweets_per_hour[i] = Counter()
    # for line in csv.DictReader(open('bins_num_tweets_by_hour.csv', 'r')):
    # csv.reader takes about half as much time as csv.DictReader
    reader = csv.reader(open('bins_num_tweets_by_hour.csv', 'r'))
    next(reader, None)
    for line in reader:
        lat = float(line[0])
        lon = float(line[1])
        hour = int(line[2])
        count = int(line[3])
        bins_tweets_per_hour[hour][str([lat, lon])] += count
    print "done loading data, total = " + str(time.time() - start)

# This call kicks off all the main page rendering.
@app.route('/')
def index():
    return render_template('main.html')

@app.route('/hour/<hournum>', methods=['GET'])
def get_tweets_for_hour(hournum):
    map = bins_tweets_per_hour[int(hournum)]
    return jsonify(dict(map))

if __name__ == '__main__':
    load_data()
    app.run(host='127.0.0.1')
