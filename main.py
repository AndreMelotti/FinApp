#Importar o app, Builder (GUI - Interface do usuario)
#Criar aplicação 
#Criar a função build

from kivy.app import App
from kivy.lang import Builder
import requests

GUI = Builder.load_file("tela.kv")

class MeuPrimeiroApp(App):
    def build(self):
        return GUI
    
    def on_start(self):

        self.root.ids["moeda1"].text = f"Dolar R$: {self.pegarCotacao('USD')}"
        self.root.ids["moeda2"].text = f"BTC R$:{self.pegarCotacao('BTC')}"
        self.root.ids["moeda3"].text = f"ETH R$:{self.pegarCotacao('ETH')}"
        self.root.ids["moeda4"].text = f"Euro R$:{self.pegarCotacao('EUR')}"

    def pegarCotacao(self, moeda):
        link = F"https://economia.awesomeapi.com.br/last/{moeda}-BRL"
        requisicao = requests.get(link)
        dicRequisicao = requisicao.json()
        cotacao = dicRequisicao[f"{moeda}BRL"]["bid"]
        return cotacao
       
    
MeuPrimeiroApp().run()