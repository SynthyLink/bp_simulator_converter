import desktop

class CategoryObject:
    def __init__(self, name: str, desktop: "desktop.Desktop"):
        self._name = name
        self._dektop = desktop
        pass

    @property
    def name(self):
        return self._name
    