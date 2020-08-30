import urllib.request
import os

tags = ['data-pin=\"','href=\"','src=\"','data-thumb=\"']
directory = 'templates'

for filename in os.listdir(directory):
	print(filename)
	a_file = open('templates\\'+filename, "r")
	list_of_lines = a_file.readlines()

	total = len(list_of_lines)


	for i in tags:
		print(i)
		count = 0
		for url in list_of_lines:

			start = url.find(i)
			middle = 1 + url.find('\"',start)
			end = url.find("\"",middle)

			if start != -1:
				if url[middle-1:end+1].find('#') == -1 and url[middle:end].find("{{") == -1:
					print(url[middle-1:end+1])
					try:
						urllib.request.urlopen(url[middle:end])
					except:
						list_of_lines[count] = url.replace(url[middle:end],"{{ url_for('static',filename='"+url[middle:end]+"') }}")


			#print('Completion:',round((count/total)*100))
			count += 1

	a_file = open("templates/"+filename, "w")
	a_file.writelines(list_of_lines)
	a_file.close()