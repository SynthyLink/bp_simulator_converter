from ..category_object import CategoryObject
from ..category_arrow import CategoryArrow
from ..desktop import Desktop
from ..measurements.measurements import Measurements
from ..measurements.measurement import Measurement

class DataLink(CategoryArrow):

    def __init__(self, name, desktop):
        super().__init__(name, desktop)
    
    @property
    def name(self):
        return self._name
    
    @property
    def source(self):
        return self._source
    
    @source.setter
    def source(self, source: CategoryObject):
        self._source = source

    @property
    def target(self):
        return self._source
    
    @target.setter
    def source(self, target: CategoryObject):
        self._target = target
