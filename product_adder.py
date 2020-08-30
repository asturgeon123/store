import requests
import json
import re

target = ["title", "itemDetailUrl", "imagePath"]

def Convert(string): 
    li = list(string.split(" ")) 
    return li 

def get_data(url):
    r = requests.get(url)
    match = re.search(r'data: ({.+})', r.text).group(1)
    data = json.loads(match)
    #goal = [data['pageModule'][x] for x in target] + \
        #[data['imageModule']['imagePathList']]



    product_detail = {}

    product_detail.update({'title':input('Enter Product Name:')})
    product_detail.update({'description':input('Enter Description:')})
    product_detail.update({'tags':Convert(input('Enter Tags:'))})

    product_detail.update({'sku':data['commonModule']['productId']})
    for properties in data['skuModule']['productSKUPropertyList']:
        options = []
        for option in properties['skuPropertyValues']:
            options.append(option['propertyValueDisplayName'])
            #print(properties['skuPropertyName'],option['propertyValueDisplayName'])
        product_detail.update({properties['skuPropertyName']:options})

    product_detail.update({'price':data['priceModule']['maxAmount']['value']})
    product_detail.update({'Images':data['imageModule']['imagePathList']})
    product_detail.update({'Url':url})
    
    return product_detail

    #print(data)

def add_product(product_json,file='C:\\cozastore-master\\cozastore-master\\product_info.txt'):
    try:
        with open(file,'r') as f:
            database = json.load(f)
            database['data'].append(product_json)
    except FileNotFoundError:
        print("[!] Datebase File Missing [!]")
        pass

    with open(file,'w') as f:
            json.dump(database, f)
            f.close()
url = "https://www.aliexpress.com/item/32993248292.html?spm=a2g0o.productlist.0.0.59054319NUp3Oz&algo_pvid=567de81f-5fd7-4765-b5f9-049d730cd2e9&algo_expid=567de81f-5fd7-4765-b5f9-049d730cd2e9-33&btsid=0ab6f83115966850456934256e43f2&ws_ab_test=searchweb0_0,searchweb201602_,searchweb201603_"
url = input("Enter URL")
add_product(get_data(url))
print('Product Added')