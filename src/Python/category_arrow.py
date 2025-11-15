from typing import Any
from category_object import CategoryObject

class CategoryArrow:
    def __init__(self, name: str, desktop: "desktop.Desktop"):
        self._name = name
        self._desktop = desktop
        self._source = None
        self._target = None
        if self._desktop is not None:
            self._desktop += self
            # TODO add checker and error handler

        pass

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

    
    def _check(self, obj: Any) -> bool:
        raise NotImplemented()
    
    def _show(self, message: str) -> None:
        raise NotImplemented()
    
    def _handle(self, exception: Exception) -> None:
        raise NotImplemented
