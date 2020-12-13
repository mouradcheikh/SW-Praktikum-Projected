#!/usr/bin/python
#-*- coding: utf-8 -*-

from server.db.Mapper import Mapper
from server.bo.Project import Project

class ProjectMapper(Mapper):
    def __init__(self):
        super().__init__()


    def find_all(self, ):
        pass

    '''def find_by_id(self, id):
        """Auslesen aller Konten eines durch Fremdschlüssel gegebenen Projekts.
        :param project_id Schlüssel des zugehörigen Projekts.
        :return Eine Sammlung mit Project-Objekten, die sämtliche Konten der
                betreffenden Projects repräsentieren.
        """
        result = []
        cursor = self._cnx.cursor()
        command = "SELECT id, name, creation_date, capacity, external_partners, short_description, weekly_flag, number_bd_b_lecturetime, number_bd_examtime, preferred_bd, special_room, person_id, project_state_id, project_type_id, semester_id, module, person2_id FROM project WHERE id={} ORDER BY id
            project = Project()
            project.set_id(id),
            project.set_name(name),
            project.set_creation_date(creation_date),
            project.set_capacity(capacity),
            project.set_external_partners(external_partners),
            project.set_short_descripton(short_description),
            project.set_weekly_flag(weekly_flag),
            project.set_number_bd_b_lecturetime(number_bd_b_lecturetime),
            project.set_number_bd_examtime(number_bd_examtime),
            project.set_preferred_bd(preferred_bd),
            project.set_special_room(special_room),
            project.set_person_id(person_id),
            project.set_project_state(project_state_id),
            project.set_project_type(project_type_id),
            project.set_semester(semester_id),
            result.append(project)

        self._cnx.commit()
        cursor.close()

        return result'''

    def insert(self, project):
        """Einfügen eines Project-Objekts in die Datenbank.

        Dabei wird auch der Primärschlüssel des übergebenen Objekts geprüft und ggf.
        berichtigt.

        :param project das zu speichernde Objekt
        :return das bereits übergebene Objekt, jedoch mit ggf. korrigierter ID.
        """
        cursor = self._cnx.cursor()
        cursor.execute("SELECT MAX(id) AS maxid FROM project ")
        tuples = cursor.fetchall()

        for (maxid) in tuples:
            project.set_id(maxid[0] + 1)

        command = "INSERT INTO project (id, name, creation_date, capacity, external_partners, short_description, weekly_flag, number_bd_b_lecturetime, number_bd_examtime, preferred_bd, special_room, person_id, project_state_id, project_type_id, semester_id, module, person2_id) VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,)"
        data = (
                project.get_id(id),
                project.get_name(),
                project.get_creation_date(),
                project.get_capacity(),
                project.get_external_partners(),
                project.get_short_descripton(),
                project.get_weekly_flag(),
                project.get_number_bd_b_lecturetime(),
                project.get_number_bd_examtime(),
                project.get_preferred_bd(),
                project.get_special_room(),
                project.get_person_id(),
                project.get_project_state(),
                project.get_project_type(),
                project.get_semester(),)
        cursor.execute(command, data)

        self._cnx.commit()
        cursor.close()

        return project

    def update(self, project):
        """Wiederholtes Schreiben eines Objekts in die Datenbank.

        :param user das Objekt, das in die DB geschrieben werden soll
        """
        cursor = self._cnx.cursor()

        command = "UPDATE project " + "SET name=%s, project_state=%s WHERE id=%s"
        data = (project.get_name(), project.get_project_state())
        cursor.execute(command, data)

        self._cnx.commit()
        cursor.close()
    
    # def find_by_dozent_id(self, person_id):
    #     """Auslesen aller Projekte eines durch Fremdschlüssel (DozentID bzw. PersonID?.) gegebenen Kunden.

    #     :param person_id Schlüssel des zugehörigen Dozenten.
    #     :return Eine Sammlung mit Projekte-Objekten, die sämtliche Projekte des
    #             betreffenden Dozenten repräsentieren.
    #     """
    #     result = []
    #     cursor = self._cnx.cursor()
    #     command = "SELECT id, person_id FROM project WHERE person_id={} ORDER BY id".format(person_id)
    #     cursor.execute(command)
    #     tuples = cursor.fetchall()

    #     for (id, person_id) in tuples:
    #         p = Project()
    #         p.set_id(id)
    #         p.set_dozent_id(person_id)
    #         result.append(p)
    #     #hier fehlen warscheinlich noch die anderen attribute
    #     self._cnx.commit()
    #     cursor.close()

    #     return result

    def find_by_dozent_id(self, person_id):
        """Auslesen aller Projekte eines durch Fremdschlüssel (DozentID bzw. PersonID?.) gegebenen Kunden.

        :param person_id Schlüssel des zugehörigen Dozenten.
        :return Eine Sammlung mit Projekte-Objekten, die sämtliche Projekte des
                betreffenden Dozenten repräsentieren.
        """
        result = []
        cursor = self._cnx.cursor()
        command = "SELECT id, name, person_id FROM project WHERE person_id={} ORDER BY id".format(person_id)
        cursor.execute(command)
        tuples = cursor.fetchall()

        for (id, name, person_id) in tuples:
            p = Project()
            p.set_id(id)
            p.set_name(name)
            p.set_dozent_id(person_id)
            result.append(p)
        #hier fehlen warscheinlich noch die anderen attribute
        self._cnx.commit()
        cursor.close()

        return result


    def delete(self, project):
        """Löschen der Daten eines User-Objekts aus der Datenbank.

        :param user das aus der DB zu löschende "Objekt"
        """
        cursor = self._cnx.cursor()

        command = "DELETE FROM project WHERE id={}".format(project.get_id())
        cursor.execute(command)

        self._cnx.commit()
        cursor.close()


if __name__ == "__main__":

      with ProjectMapper() as mapper:
        result = mapper.find_by_dozent_id(2)
        for p in result:
            print(p.get_id(), p.get_dozent())

