class Car:
    def __init__(self, colour: str, wheel: str, seat: int):
        self.__colour = colour
        self.__wheel = wheel
        self.__seat = seat

    @property
    def colour(self):
        return self.__colour
    
    @property
    def wheel(self):
        return self.__wheel
    
    @wheel.setter
    def set_wheel_number(self, value: int):
        self.__wheel = value
    
    
    def colour_reverse(self):

