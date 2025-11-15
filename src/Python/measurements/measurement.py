from typing import Any

class Measurement:
    
    def __init__():
        pass

    @property
    def measurement_name(self) -> str:
        raise NotImplemented()
    
    @property
    def measurement_type(self) -> Any:
        raise NotImplemented()
    
    @property
    def measurement_value(self) -> Any:
        raise NotImplemented()
    