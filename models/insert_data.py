import pymongo
from pymongo import MongoClient

# 连接MongoDB Atlas，并选择要使用的数据库和集合
client = MongoClient("mongodb+srv://jyeho:123456123456@cluster0.30kp0cf.mongodb.net/?retryWrites=true&w=majority")
db = client["blogLst"]
col = db["blogs"]

# 插入一个文档
mydict = { "name": "John", "address": "Highway 37" }
col.insert_one(mydict)

# 插入多个文档
mylist = [
  { "name": "Amy", "address": "Apple st 652" },
  { "name": "Hannah", "address": "Mountain 21" },
  { "name": "Michael", "address": "Valley 345" },
  { "name": "Sandy", "address": "Ocean blvd 2" },
  { "name": "Betty", "address": "Green Grass 1" },
  { "name": "Richard", "address": "Sky st 331" },
  { "name": "Susan", "address": "One way 98" },
  { "name": "Vicky", "address": "Yellow Garden 2" },
  { "name": "Ben", "address": "Park Lane 38" },
  { "name": "William", "address": "Central st 954" },
  { "name": "Chuck", "address": "Main Road 989" },
  { "name": "Viola", "address": "Sideway 1633" }
]
col.insert_many(mylist)

# 查找第一个文档
x = col.find_one()
print(x)

# 查找所有文档
for x in col.find():
  print(x)

# # 根据条件查找文档
# myquery = { "address": "Park Lane 38" }
# mydoc = col.find(myquery)
# for x in mydoc:
#   print(x)

# # 更新文档
# myquery = { "address": "Valley 345" }
# newvalues = { "$set": { "address": "Canyon 123" } }
# col.update_one(myquery, newvalues)

# # 删除文档
# myquery = { "address": "Yellow Garden 2" }
# col.delete_one(myquery)

# # 删除所有文档
# col.delete_many({})
