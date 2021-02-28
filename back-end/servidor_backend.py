from config import *
from modelo import Girassol

@app.route("/")
def inicio():
    return 'Sistema de cadastro de girassóis. '+\
        '<a href="/listar_girassol">Cheque aqui os listados</a>'

@app.route("/listar_girassol")
def listar_girassol():
   
    girassol = db.session.query(girassol).all()
 
    girassol_em_json = [ x.json() for x in girassol ]
 
    resposta = jsonify(girassol_em_json)
 
    resposta.headers.add("Access-Control-Allow-Origin", "*")
    return resposta 


@app.route("/incluir_girassol", methods=['post'])
def incluir_girassol():

    resposta = jsonify({"resultado": "ok", "detalhes": "ok"})

    dados = request.get_json() 

    try: 
      nova = girassol(**dados)
      db.session.add(nova) 
      db.session.commit() 
      
    except Exception as e: 
      
      resposta = jsonify({"resultado":"erro", "detalhes":str(e)})
    
    resposta.headers.add("Access-Control-Allow-Origin", "*")
    return resposta

app.run(debug=True)