#!/usr/bin/python
#-*- coding: utf-8 -*-

from server.db.Mapper import Mapper
from server.bo.Grading import Grading
from server.bo.Participation import Participation


class GradingMapper(Mapper):
    def __init__(self):
        super().__init__()

    def insert(self, grading):
        """Einfügen eines Grading-Objekts in die Datenbank.

        Dabei wird auch der Primärschlüssel des übergebenen Objekts geprüft und ggf.
        berichtigt.

        :param grading das zu speichernde Objekt
        :return das bereits übergebene Objekt, jedoch mit ggf. korrigierter ID.
        """
        cursor = self._cnx.cursor()
        cursor.execute("SELECT MAX(id) AS maxid FROM grading ")
        tuples = cursor.fetchall()

        for (maxid) in tuples:
            if maxid[0] is not None:
                """Wenn wir eine maximale ID festellen konnten, zählen wir diese
                um 1 hoch und weisen diesen Wert als ID dem Grading-Objekt zu."""
                grading.set_id(maxid[0] + 1)
            else:
                """Wenn wir KEINE maximale ID feststellen konnten, dann gehen wir
                davon aus, dass die Tabelle leer ist und wir mit der ID 1 beginnen können."""
                grading.set_id(1)

        command = "INSERT INTO grading (id, creation_date, grade, passed, participation_id) VALUES (%s,%s,%s,%s,%s)"

        data = (
                grading.get_id(), 
                grading.get_creation_date(), 
                grading.get_grade(), 
                grading.get_passed(),
                grading.get_participation()
                )
        

        cursor.execute(command, data)

        self._cnx.commit()
        cursor.close()

        return grading#stimmt das hier ?

    def find_all(self, ):
        pass

    def find_by_id(self):
        pass

if (__name__ == "__main__"):

    def find_by_participation_id(self, participation_id):
        """Auslesen aller Projekte eines durch Fremdschlüssel (DozentID bzw. PersonID?.) gegebenen Kunden.

        :param person_id Schlüssel des zugehörigen Dozenten.
        :return Eine Sammlung mit Projekte-Objekten, die sämtliche Projekte des
                betreffenden Dozenten repräsentieren.
        """
        result = None
        cursor = self._cnx.cursor()
        command = "SELECT id from grading WHERE participation_id={}".format(participation_id) #zweiter befehl für filtern der Projekte deren projektstateID 2(genehmigt) entspricht
        cursor.execute(command)
        tuples = cursor.fetchall()

        for (id) in tuples:
            p = Participation()
            p.set_id(id)
            result = p
        #hier fehlen warscheinlich noch die anderen attribute
        self._cnx.commit()
        cursor.close()

        return result

    def update(self, grading):
        """Wiederholtes Schreiben eines Objekts in die Datenbank.

        :param grading das Objekt, das in die DB geschrieben werden soll
        """
        cursor = self._cnx.cursor()

        command = "UPDATE grading " + "SET creation_date=%s, grade=%s, passed=%s, participation_id=%s WHERE id=%s"
        data = grading.get_creation_date(), grading.get_grade(), grading.get_passed(), grading.get_participation()
        cursor.execute(command, data)

        self._cnx.commit()
        cursor.close()


