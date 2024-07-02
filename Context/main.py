#Importar o app, Builder (GUI - Interface do usuario)
#Criar aplicação 
#Criar a função build

from kivy.app import App
from kivy.lang import Builder
from kivy.clock import Clock
import requests

# Carrega a interface do usuário do arquivo KV
GUI = Builder.load_file("tela.kv")

class MeuPrimeiroApp(App):
    
    def build(self):
        return GUI
    
    def on_start(self):
        # Atualiza as cotações logo no início
        self.atualizar_cotacoes()
        
        # Agenda a atualização das cotações a cada 60 segundos (1 minuto)
        Clock.schedule_interval(self.atualizar_cotacoes, 60)
    
    def atualizar_cotacoes(self):
        # Atualiza os textos dos widgets com as novas cotações
        self.root.ids["moeda1"].text = f"Dolar R$: {self.pegarCotacao('USD')}"
        self.root.ids["moeda2"].text = f"BTC R$: {self.pegarCotacao('BTC')}"
        self.root.ids["moeda3"].text = f"ETH R$: {self.pegarCotacao('ETH')}"
        self.root.ids["moeda4"].text = f"Euro R$: {self.pegarCotacao('EUR')}"
        
    def pegarCotacao(self, moeda):
        # Faz a requisição HTTP para obter a cotação da moeda
        link = f"https://economia.awesomeapi.com.br/last/{moeda}-BRL"
        requisicao = requests.get(link)
        dicRequisicao = requisicao.json()
        cotacao = dicRequisicao[f"{moeda}BRL"]["bid"]
        return cotacao

# Executa o aplicativo
if __name__ == '__main__':
    MeuPrimeiroApp().run()
