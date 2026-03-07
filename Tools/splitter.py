index = 0
letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
current_question = 1
current_letter = 0

with open(input("File: "), "r", encoding="utf-8") as file:
    global test_data 
    test_data = file.readlines()

for i, data in enumerate(test_data):
    test_data[i] = data.rstrip("\n")

new_text = ""

mode = 1
while index < len(test_data):
    current_line = test_data[index]
    if current_line.startswith(f"{current_question}."):
        mode = 1
        new_text+= f"\n\n{current_line.replace(f"{current_question}. ", "")}"
        current_question+=1
        current_letter = 0
    elif current_line.startswith(f"{letters[current_letter]}.") or current_line.startswith(f"{letters[current_letter].lower()}."):
        if current_line.startswith(f"A.") or current_line.startswith(f"a."):
            new_text+="\n"
        new_text+= f"\n{current_line.replace(f"{letters[current_letter]}. ", "").replace(f"{letters[current_letter].lower()}. ", "")}"
        mode = 2
        current_letter += 1
    else:
        new_text+=f"\\n{current_line}"
    index += 1
    
with open("test.txt", "w", encoding="utf-8") as file:
    file.write(f"{new_text}")