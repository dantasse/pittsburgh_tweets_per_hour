Animated map of tweets in Pittsburgh over the last year. Output is in 500px.gif.

To run this:
pip install -r requirements.txt
(maybe install more requirements, not sure if I froze it at the right time)
./main.py
then go to localhost:5000 in a browser.

To see some data, fill in the Radius, Hour (0-23), and Maximum boxes. 15 for
radius and 500-700 for maximum seems to work pretty well. 

Styling help from:
http://gmaps-samples-v3.googlecode.com/svn/trunk/styledmaps/wizard/index.html

Screengrab it like so in a terminal:
screencapture -R100,100,500,500 ~/Desktop/screen.png
Those parameters are x, y, width, height.
Then turn those into a GIF like so:
http://www.briandalessandro.com/blog/create-an-animated-gif-in-photoshop-cs5/
or use gifmaker.me or something.

Props to http://guides.macrumors.com/Taking_Screenshots_in_Mac_OS_X for telling
me about the screencapture command-line tool. Awesome.

