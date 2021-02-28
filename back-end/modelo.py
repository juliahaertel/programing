from config import *

class Girassol(db.Model):
    
    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(100))
    dataplantio = db.Column(db.String(10))
    diametroflor = db.Column(db.String(5))

    def __str__(self):
        return str(self.id)+") "+ self.nome + ", " + self.dataplantio + ", " + self.diametroflor
    
    def json(self):
        return {
            "id": self.id,
            "nome": self.nome,
            "data de plantio": self.dataplantio,
            "diâmetro da flor": self.diametroflor
        }


if __name__ == "__main__":

    if os.path.exists(arquivobd):
        os.remove(arquivobd)


    db.create_all()


    girassolum = Girassol(nome = "Roseta", dataplantio = "14/5/2020" , diametroflor = "4,7 cm")
    girassoldois = Girassol(nome = "Margadarida", dataplantio = "14/11/2020" , diametroflor = "1,7 cm")
    

    db.session.add(girassolum)
    db.session.add(girassoldois)
    db.session.commit()
    

    print(girassolum)
    print(girassoldois)

    
    print(girassolum.json())
    print(girassoldois.json())