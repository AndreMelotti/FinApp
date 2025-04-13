"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function PerfilPage() {
  const [informacoesPessoais, setInformacoesPessoais] = useState({
    nome: "João Silva",
    email: "joao.silva@exemplo.com",
    telefone: "(11) 98765-4321",
  })

  const [formSenha, setFormSenha] = useState({
    senhaAtual: "",
    novaSenha: "",
    confirmarSenha: "",
  })

  const handleInformacoesPessoaisChange = (campo: string, valor: string) => {
    setInformacoesPessoais((prev) => ({
      ...prev,
      [campo]: valor,
    }))
  }

  const handleSenhaChange = (campo: string, valor: string) => {
    setFormSenha((prev) => ({
      ...prev,
      [campo]: valor,
    }))
  }

  const handleInformacoesPessoaisSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Lógica de envio aqui
    alert("Informações pessoais atualizadas!")
  }

  const handleSenhaSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (formSenha.novaSenha !== formSenha.confirmarSenha) {
      alert("As novas senhas não coincidem!")
      return
    }

    // Lógica de atualização de senha aqui
    alert("Senha atualizada!")

    setFormSenha({
      senhaAtual: "",
      novaSenha: "",
      confirmarSenha: "",
    })
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-6 text-3xl font-bold">Perfil do Usuário</h1>

      <div className="grid gap-6 md:grid-cols-3">
        <div>
          <Card>
            <CardContent className="flex flex-col items-center justify-center pt-6">
              <Avatar className="h-32 w-32">
                <AvatarImage src="/placeholder.svg?height=128&width=128" alt="Usuário" />
                <AvatarFallback className="text-4xl">JS</AvatarFallback>
              </Avatar>
              <h2 className="mt-4 text-xl font-bold">{informacoesPessoais.nome}</h2>
              <p className="text-muted-foreground">{informacoesPessoais.email}</p>
              <div className="mt-6">
                <Button variant="outline" size="sm">
                  Alterar Avatar
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-2">
          <Tabs defaultValue="pessoal" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="pessoal">Informações Pessoais</TabsTrigger>
              <TabsTrigger value="seguranca">Segurança</TabsTrigger>
            </TabsList>

            <TabsContent value="pessoal">
              <Card>
                <CardHeader>
                  <CardTitle>Informações Pessoais</CardTitle>
                  <CardDescription>Atualize seus dados pessoais aqui.</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleInformacoesPessoaisSubmit} className="space-y-4">
                    <div className="grid gap-2">
                      <Label htmlFor="nome">Nome</Label>
                      <Input
                        id="nome"
                        value={informacoesPessoais.nome}
                        onChange={(e) => handleInformacoesPessoaisChange("nome", e.target.value)}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={informacoesPessoais.email}
                        onChange={(e) => handleInformacoesPessoaisChange("email", e.target.value)}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="telefone">Telefone</Label>
                      <Input
                        id="telefone"
                        type="tel"
                        value={informacoesPessoais.telefone}
                        onChange={(e) => handleInformacoesPessoaisChange("telefone", e.target.value)}
                      />
                    </div>
                    <Button type="submit">Salvar Alterações</Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="seguranca">
              <Card>
                <CardHeader>
                  <CardTitle>Alterar Senha</CardTitle>
                  <CardDescription>Atualize sua senha aqui.</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSenhaSubmit} className="space-y-4">
                    <div className="grid gap-2">
                      <Label htmlFor="senha-atual">Senha Atual</Label>
                      <Input
                        id="senha-atual"
                        type="password"
                        value={formSenha.senhaAtual}
                        onChange={(e) => handleSenhaChange("senhaAtual", e.target.value)}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="nova-senha">Nova Senha</Label>
                      <Input
                        id="nova-senha"
                        type="password"
                        value={formSenha.novaSenha}
                        onChange={(e) => handleSenhaChange("novaSenha", e.target.value)}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="confirmar-senha">Confirmar Nova Senha</Label>
                      <Input
                        id="confirmar-senha"
                        type="password"
                        value={formSenha.confirmarSenha}
                        onChange={(e) => handleSenhaChange("confirmarSenha", e.target.value)}
                      />
                    </div>
                    <Button type="submit">Atualizar Senha</Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
