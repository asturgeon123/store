from flask import Flask, jsonify, request, render_template, make_response, Response
from flask_cors import CORS
import json
from collections import Counter
import stripe
import ast
import urllib

app = Flask(__name__, static_folder="static")
CORS(app)

def most_common():
	word_list = []
	for product in database_load()['data']:
		try:
			for i in product['tags']:
				word_list.append(i)
		except KeyError:
			pass
	return [word for word, word_count in Counter(word_list).most_common(7)]

def database_load(file='product_info.txt'):
	try:
		with open(file,'r') as f:
			data = json.load(f)
	except FileNotFoundError:
		print("[!] Datebase File Missing [!]")
		pass
	f.close()
	return data

def sku_search(product_sku,key='sku', file= "product_info.txt"):
	for i in database_load(file)['data']:
		print(i[key])
		if int(i[key]) == int(product_sku):
			#print(i)
			return i
	print('-----[!] SKU NOT FOUND [!]-----')
	return False

def add_review(sku123,rating,review,name,email):
	print(sku123,rating,review,name)
	file = "product_reviews.txt"
	sku_location = sku_search(sku123,file)
	index = 0
	try:
		with open(file,'r') as f:
			database123 = json.load(f)
			if sku_location == False:
				database123['data'].append({"sku":sku123, "reviews":[{"name":name,"rating":rating,"review":review,"email":email}]})
			else:
				for i in database123['data']:
					
					if i['sku'] == sku123:
						print(i['reviews'])
						print(index)
						addon = {"name":name,"rating":rating,"review":review,"email":email}
						for previous_sub in database123['data'][index]['reviews']:
							if previous_sub == addon:
								submit = False
							else:
								submit = True
						if submit:
							database123['data'][index]['reviews'].append(addon)
					index += 1
			#database['data'].append(product_json)
			print(database123)
	except FileNotFoundError:
		print("[!] Datebase File Missing [!]")
		pass

	with open(file,'w') as f:
			json.dump(database123, f)
			f.close()




@app.route('/load_products', methods=['GET'])
def load_products():
	#return json file of database
	response = jsonify(database_load())
	return response

#Load Product Page
@app.route('/product-detail/<data>')
def show_product(data):
	rating = request.args.get('rating')
	review = request.args.get('review')
	name = request.args.get('name')
	email = request.args.get('email')
	print('email',review)
	if review != None and name != None:
		add_review(data,rating,review,name,email)

	print(data)
	review_stack = sku_search(data, file="product_reviews.txt")
	if review_stack == False:
		review_stack = {"sku": "33039059312","reviews": [{"name": "","rating": "5","review": "Be the FIRST to write a review!!","email": ""}]}
	item_stack = sku_search(data)
	json = database_load()
	#print(item_stack)
	url = []
	for i in item_stack["Images"]:
		url.append(i)

	#print(item_stack["Size"])
	print(review_stack)
	# show the user profile for that user
	return render_template('product_detail.html',products = json['data'],sku = data, Image_Url1 = url[0], Image_Url2 = url[1], Image_Url3=url[2], colors = item_stack["Color"],price = item_stack["price"],title=item_stack["title"],description=item_stack["description"], reviews = review_stack["reviews"],tags2=item_stack["tags"],tags = most_common())

@app.route('/')
def home():
	json = database_load()
	return render_template('index.html',products = json['data'])

@app.route('/shopping-cart/')
def shop_cart():
	return render_template('shoping-cart.html')

@app.route('/static/<filename>')
def product(filename):

	json = database_load()
	if filename.find('product-detail') == -1 or filename == "#":
		return render_template(filename,products = json['data'],tags = most_common())

@app.route('/thank-you/', methods=["GET","POST"])
def confirm_order():
	if request.method == 'POST':
		file = "orders.txt"
		order = str(request.get_json()).replace('%20',' ')
		order = order.replace("%22", "\"")
		data = database_load(file=file)
		data['data'].append(order)
		with open(file,'w') as f:
			json.dump(data, f)
			f.close()
		return json.dumps({'success':True}), 200, {'ContentType':'application/json'}
	else:
		return render_template('thankyou.html')


@app.route('/charge/<details>')
def checkout(details):
	details = json.loads(details)
	#print(details)
	a2 = details['total']
	b = details['total'].find('.')
	if len(a2[b+1:]) < 2:
		a2 = a2+"0"
	elif len(a2[b+1:]) > 2:
		a2 = round(float(a2),2)

	price = str(a2).replace('.','')
	url_ending = json.dumps(details)
	stripe.api_key = 'sk_test_51HI3pfLOw0BgohiPlfqVDarZXOX21Isj4e8oGJTr0c3hlks8uXoJmkHEdcBHZEVs0dCCgDkzBGp9PxFjsKrR8sLQ003GxQjuib'
	session = stripe.checkout.Session.create(
  payment_method_types=['card'],
  line_items=[{
	'price_data': {
	  'currency': 'usd',
	  'product_data': {
		'name': 'THE MASK STORE',
	  },
	  'unit_amount': int(price),},'quantity': 1,}],mode='payment',success_url='http://localhost:8989/thank-you/?'+url_ending,cancel_url='http://localhost:8989/static/shoping-cart.html')
	return jsonify(session_id=session.id)

@app.route('/741852963',methods=["GET","POST"])
def editor():
	print('Editing')
	if request.method == 'POST':
		file = "product_info.txt"
		database = database_load()
		data = request.get_json()
		print(data)
		if data['index'] == -2:
			database.append(data)
			print('Product ADDED')
		elif data['index'] == -1:
			print(data['del'])
			del database['data'][int(data['del'])-1]
			print('Product DELETED')
		else:
			database['data'][int(data['index'])-1] = data
			print('Product EDITED')

		with open(file,'w') as f:
			json.dump(database, f)
			f.close()
		return json.dumps({'success':True}), 200, {'ContentType':'application/json'} 
	else:
		return render_template('editor.html',products=database_load()['data'])



if __name__ == '__main__':
	app.run(host='localhost', port=8989)