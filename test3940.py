file = "C:\\cozastore-master\\cozastore-master\\orders.txt"
import json
import ast
count = 0
try:
    with open(file,'r') as f:
        database = json.load(f)
        for i in database['data']:
        	count += 1
        	print("Order "+str(count)+": ===================================================================================")
        	data = ast.literal_eval(i)
        	for a in data:
        		print(data[a])
        	print("============================================================================================")
        	#for product in i:
        	#	print(product)
        		#print(product['title'],product['count'])
except FileNotFoundError:
    print("[!] Datebase File Missing [!]")
    pass

with open(file,'w') as f:
        json.dump(database, f)
        f.close()