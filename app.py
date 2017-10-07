from flask import Flask, request, render_template
from base import Base
import json
import hashlib

def hash_string(string):
	return hashlib.sha256(string.encode('utf-8')).hexdigest()

app = Flask(__name__)
database = Base()

#handlers
@app.route("/get_points")
def get_points():
	points = database.get("points", default=[])
	points = dict(zip(list(range(len(points))), points))


	return json.dumps(points), 200


@app.route("/get_info")
def get_info():
	photo_hash = request.args.get("hash")
	if not photo_hash: return "not hash", 500

	info = database.get("hash:%s" % photo_hash)

	return json.dumps(info), 200

@app.route("/add_info", methods = ["POST"])
def add_info():
	base64_image = request.form.get("image")
	x, y =  request.form.get("x"), request.form.get("y")
	date = request.form.get("image")
	points = database.get("points", default=[])

	h = hash_string(base64_image+x+y+date)

	info = {
		"image": base64_image,
		"x": int(x),
		"y": int(y),
		"date": date
	}

	points.append(h)
	database.set("hash:%s" % h, info)
	database.set("points", points)

	return "ok", 200


@app.route("/")
def index():
	return render_template('index.html')


if __name__ == "__main__":
	app.run()
