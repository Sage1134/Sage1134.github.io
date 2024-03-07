x = "string"
y = "string"
z = x
print(id(x), id(y), id(z))
print(x == y, x == z)
print(x is y, x is z)