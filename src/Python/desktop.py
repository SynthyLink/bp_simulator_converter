from typing import List
from category_object import CategoryObject
from category_arrow import CategoryArrow

class Desktop: 
    def __init__(self):
        self._category_objects: List[CategoryObject]  = []
        self._category_arrows: List["CategoryArrow"] = []

    