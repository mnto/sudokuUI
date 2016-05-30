import random

class point:
    def __init__(self, x, y):
        self.x = x
        self.y = y

    def getX(self):
        return self.x

    def getY(self):
        return self.y

pt = point(4.3, 1.9)
print(pt.getX())
print(pt.getY())

print(random.randint(1,6))
