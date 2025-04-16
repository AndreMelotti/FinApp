import { Injectable, NotFoundException, ConflictException } from "@nestjs/common"
import type { PrismaService } from "../prisma/prisma.service"
import type { CreateUsuarioDto } from "./dto/create-usuario.dto"
import type { UpdateUsuarioDto } from "./dto/update-usuario.dto"
import * as bcrypt from "bcrypt"

@Injectable()
export class UsuariosService {
  constructor(private prisma: PrismaService) {}

  async create(createUsuarioDto: CreateUsuarioDto) {
    // Verificar se o email já existe
    const existingUser = await this.prisma.usuario.findUnique({
      where: { email: createUsuarioDto.email },
    })

    if (existingUser) {
      throw new ConflictException("Email já está em uso")
    }

    // Hash da senha
    const senhaHash = await bcrypt.hash(createUsuarioDto.senha, 10)

    // Criar o usuário
    const usuario = await this.prisma.usuario.create({
      data: {
        nome: createUsuarioDto.nome,
        email: createUsuarioDto.email,
        telefone: createUsuarioDto.telefone,
        senhaHash,
      },
    })

    // Remover a senha do retorno
    const { senhaHash: _, ...result } = usuario
    return result
  }

  async findAll() {
    const usuarios = await this.prisma.usuario.findMany({
      select: {
        id: true,
        nome: true,
        email: true,
        telefone: true,
        dataCriacao: true,
        dataAtualizacao: true,
      },
    })
    return usuarios
  }

  async findOne(id: number) {
    const usuario = await this.prisma.usuario.findUnique({
      where: { id },
      select: {
        id: true,
        nome: true,
        email: true,
        telefone: true,
        dataCriacao: true,
        dataAtualizacao: true,
      },
    })

    if (!usuario) {
      throw new NotFoundException(`Usuário com ID ${id} não encontrado`)
    }

    return usuario
  }

  async update(id: number, updateUsuarioDto: UpdateUsuarioDto) {
    // Verificar se o usuário existe
    await this.findOne(id)

    // Verificar se o email já está em uso por outro usuário
    if (updateUsuarioDto.email) {
      const existingUser = await this.prisma.usuario.findUnique({
        where: { email: updateUsuarioDto.email },
      })

      if (existingUser && existingUser.id !== id) {
        throw new ConflictException("Email já está em uso")
      }
    }

    // Preparar os dados para atualização
    const data: any = { ...updateUsuarioDto }

    // Se a senha foi fornecida, fazer o hash
    if (updateUsuarioDto.senha) {
      data.senhaHash = await bcrypt.hash(updateUsuarioDto.senha, 10)
      delete data.senha
    }

    // Atualizar a data de atualização
    data.dataAtualizacao = new Date()

    // Atualizar o usuário
    const usuario = await this.prisma.usuario.update({
      where: { id },
      data,
      select: {
        id: true,
        nome: true,
        email: true,
        telefone: true,
        dataCriacao: true,
        dataAtualizacao: true,
      },
    })

    return usuario
  }

  async remove(id: number) {
    // Verificar se o usuário existe
    await this.findOne(id)

    // Remover o usuário
    await this.prisma.usuario.delete({
      where: { id },
    })

    return { message: `Usuário com ID ${id} removido com sucesso` }
  }
}
