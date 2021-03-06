from flask import Flask, request, render_template
from base import Base
import json
import hashlib
from flask_cors import CORS

def hash_string(string):
	return hashlib.sha256(string.encode('utf-8')).hexdigest()

app = Flask(__name__)
CORS(app)
database = Base()

#handlers
@app.route("/get_points")
def get_points():
	points = database.get("points", default=[])
	result = {}

	for point in points:
		info = database.get("hash:%s" % point)

		if info is  not None:
			result[point] = {"x":info["x"], "y":info["y"], "is_valid":info.get("is_valid", True)}

	return json.dumps(result), 200


@app.route("/get_info")
def get_info():
	photo_hash = request.args.get("hash")
	if not photo_hash: return "not hash", 500

	info = database.get("hash:%s" % photo_hash)

	return json.dumps(info), 200

@app.route("/add_info", methods = ["POST"])
def add_info():
	data = json.loads(request.data.decode("utf-8"))

	base64_image = data.get("image")
	x, y =  data.get("x"), data.get("y")
	date = data.get("date")
	is_valid = data.get("is_valid", True)
	points = database.get("points", default=[])

	h = hash_string(base64_image+str(x)+str(y)+str(date))

	info = {
		"image": base64_image,
		"x": float(x),
		"y": float(y),
		"is_valid": is_valid,
		"date": int(date)
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
