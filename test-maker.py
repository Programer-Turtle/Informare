import json

index = 3

with open(input("File: "), "r", encoding="utf-8") as file:
    global test_data 
    test_data = file.readlines()

name = test_data[0].rstrip("\n")
time = int(test_data[1])
final_data = {"name":name, "time":time, "answers":[], "questions":[]}

#Modes 1=question read, 2=option read 
mode = 1
current_data = {"question": "", "options": []}
while index < len(test_data):
    current_line = test_data[index].rstrip("\n")
    if current_line == "":
        mode+=1
        if mode > 2:
            print(current_data)
            final_data["questions"].append(current_data)
            current_data = {"question": "", "options": []}
            mode = 1
    elif mode == 1:
        current_data["question"] = current_line
    elif mode == 2:
        current_data["options"].append(current_line)


    index+=1

if current_data["question"] or current_data["options"]:
    final_data["questions"].append(current_data)

with open(f"{name.replace(" ", "")}.json", "w") as file:
    json.dump(final_data, file, indent=2)
