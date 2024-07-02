#Importar o app, Builder (GUI - Interface do usuario)
#Criar aplicação 
#Criar a função build

from kivy.app import App
from kivy.lang import Builder
from kivy.uix.slider import Slider
from kivy.uix.widget import Widget


# Carrega a interface do usuário do arquivo KV
GUI = Builder.load_file("home.kv")

class Mylayot(Widget):
    def slide_it(self, *args):
        print(args[1])
        

class MeuPrimeiroApp(App):
    
    def build(self):
        return GUI


# Executa o aplicativo
if __name__ == '__main__':
    MeuPrimeiroApp().run()
