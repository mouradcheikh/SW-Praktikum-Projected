#!/usr/bin/python
#-*- coding: utf-8 -*-

from server.db.Mapper import Mapper
from server.bo.Student import Student

class StudentMapper(Mapper):
    def __init__(self):
        super().__init__()

    def find_all(self, ):
        result = []
        cursor = self._cnx.cursor()
        command = "SELECT * from prochecked.student"
        cursor.execute(command)
        tuples = cursor.fetchall()

        result = Student.from_tuples(tuples)

        self._cnx.commit()
        cursor.close()
        return result

    def find_by_id(self, id):
        """Suchen eines Studentens mit vorgegebener ID. Da diese eindeutig ist,
        wird genau ein Objekt zurückgegeben.

        :param key Primärschlüsselattribut (->DB)
        :return Customer-Objekt, das dem übergebenen Schlüssel entspricht, None bei
            nicht vorhandenem DB-Tupel.
        """
        result = None

        cursor = self._cnx.cursor()
        command = "SELECT id, creation_date, matr_nr, studiengang, person_id FROM student WHERE id={}".format(id)
        cursor.execute(command)
        tuples = cursor.fetchall()

        try:
            (id, creation_date, matr_nr, studiengang, person_id) = tuples[0]
            student = Student()
            student.set_id(id)
            student.set_creation_date(creation_date)
            student.set_matr_nr(matr_nr)
            student.set_studiengang(studiengang)
            student.set_person(person_id)
            result = student
        except IndexError:
            """Der IndexError wird oben beim Zugriff auf tuples[0] auftreten, wenn der vorherige SELECT-Aufruf
            keine Tupel liefert, sondern tuples = cursor.fetchall() eine leere Sequenz zurück gibt."""
            result = None

        self._cnx.commit()
        cursor.close()

        return result

    
    def find_by_matr_nr(self, matr_nr):
        """Suchen eines Studentens mit vorgegebener matr_nr. Da diese eindeutig ist,
        wird genau ein Objekt zurückgegeben.

        :param matr_nr Primärschlüsselattribut (->DB)
        :return Student-Objekt, das dem übergebenen Schlüssel entspricht, None bei
            nicht vorhandenem DB-Tupel.
        """
        result = None

        cursor = self._cnx.cursor()
        command = "SELECT id, creation_date, matr_nr, studiengang, person_id FROM student WHERE matr_nr={}".format(matr_nr)
        cursor.execute(command)
        tuples = cursor.fetchall()

        try:
            (id, creation_date, matr_nr, studiengang, person_id) = tuples[0]
            student = Student()
            student.set_id(id)
            student.set_creation_date(creation_date)
            student.set_matr_nr(matr_nr)
            student.set_studiengang(studiengang)
            student.set_person(person_id)
            result = student
        except IndexError:
            """Der IndexError wird oben beim Zugriff auf tuples[0] auftreten, wenn der vorherige SELECT-Aufruf
            keine Tupel liefert, sondern tuples = cursor.fetchall() eine leere Sequenz zurück gibt."""
            result = None

        self._cnx.commit()
        cursor.close()

        return result    
        
if __name__ == '__main__':



      '''with StudentMapper() as mapper:
        result = mapper.find_by_id(1)
        print(result.get_id(), result.get_name())'''

