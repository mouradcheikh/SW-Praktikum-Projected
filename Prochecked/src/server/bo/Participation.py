#!/usr/bin/python
#-*- coding: utf-8 -*-

from BusinessObjects import BusinessObjects
from datetime import datetime

class Participation(BusinessObjects):
    def __init__(self):
        super().__init__()
       

    @staticmethod
    def from_dict(dictionary=dict()):
        """Umwandeln eines Python dict() in einen Participation()."""
        obj = Participation()
        obj.set_id(dictionary["id"])  # eigentlich Teil von BusinessObject !
        
        return obj

    # def __str__(self, ):
    #     pass

if __name__ == "__main__":
    pass
