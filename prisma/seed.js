import "dotenv/config";
import pkg from "@prisma/client";
const { PrismaClient } = pkg;
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";

const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
});

const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("🌱 Iniciando seed...");

  await prisma.comidas.createMany({
  data: [
    {
      nome: "Bolinho de Bacalhau",
      descricao: "Unidade de bolinho crocante com bacalhau do porto",
      preco: 8.5,
      categoria: "Petiscos",
      avaliacao: 4.8,
    },
    {
      nome: "Iscas de Tilápia",
      descricao: "Peixe empanado acompanhado de molho tártaro",
      preco: 52.0,
      categoria: "Frutos do Mar",
      avaliacao: 4.7,
    },
    {
      nome: "Caldo de Feijão",
      descricao: "Caldo grosso de feijão com bacon e torresmo",
      preco: 18.0,
      categoria: "Caldos",
      avaliacao: 4.5,
    },
    {
      nome: "Torresmo de Rolo",
      descricao: "Torresmo crocante por fora e suculento por dentro",
      preco: 45.9,
      categoria: "Petiscos",
      avaliacao: 4.9,
    },
    {
      nome: "Pão com Linguiça",
      descricao: "Pão francês, linguiça artesanal e chimichurri",
      preco: 22.0,
      categoria: "Lanche",
      avaliacao: 4.6,
    },
    {
      nome: "Batata com Cheddar",
      descricao: "Porção de batata frita com queijo e bacon",
      preco: 32.0,
      categoria: "Acompanhamento",
      avaliacao: 4.4,
    },
    {
      nome: "Moqueca de Camarão",
      descricao: "Cozido de camarão com leite de coco e dendê",
      preco: 89.0,
      categoria: "Prato Principal",
      avaliacao: 4.8,
    },
    {
      nome: "Dadinho de Tapioca",
      descricao: "Cubos de tapioca com queijo coalho e geleia de pimenta",
      preco: 28.0,
      categoria: "Petiscos",
      avaliacao: 4.7,
    },
    {
      nome: "Filé com Fritas",
      descricao: "Iscas de contra-filé acebolado com batata",
      preco: 65.0,
      categoria: "Petiscos",
      avaliacao: 4.6,
    },
    {
      nome: "Frango a Passarinho",
      descricao: "Frango frito crocante com alho e salsinha",
      preco: 38.9,
      categoria: "Petiscos",
      avaliacao: 4.5,
    },
    {
      nome: "Anéis de Cebola",
      descricao: "Cebolas empanadas e fritas",
      preco: 24.0,
      categoria: "Acompanhamento",
      avaliacao: 4.3,
    },
    {
      nome: "Kibe Frito",
      descricao: "Kibe tradicional recheado com carne",
      preco: 7.0,
      categoria: "Salgados",
      avaliacao: 4.4,
    },
    {
      nome: "Ceviche Clássico",
      descricao: "Peixe branco marinado no limão e especiarias",
      preco: 42.0,
      categoria: "Entrada",
      avaliacao: 4.7,
    },
    {
      nome: "Escondidinho de Carne Seca",
      descricao: "Purê de macaxeira com carne seca desfiada",
      preco: 35.0,
      categoria: "Prato Principal",
      avaliacao: 4.8,
    },
    {
      nome: "Mini Pastel Variado",
      descricao: "Porção com 6 unidades (carne, queijo e palmito)",
      preco: 26.0,
      categoria: "Salgados",
      avaliacao: 4.6,
    },
    {
      nome: "Provolone à Milanesa",
      descricao: "Cubos de provolone empanados e fritos",
      preco: 34.0,
      categoria: "Petiscos",
      avaliacao: 4.5,
    },
    {
      nome: "Churros de Doce de Leite",
      descricao: "Mini churros crocantes com recheio cremoso",
      preco: 15.0,
      categoria: "Sobremesa",
      avaliacao: 4.9,
    },
    {
      nome: "Petit Gâteau",
      descricao: "Bolinho quente de chocolate com sorvete de baunilha",
      preco: 22.9,
      categoria: "Sobremesa",
      avaliacao: 4.8,
    },
    {
      nome: "Mandioca Frita",
      descricao: "Porção de mandioca cozida e depois frita",
      preco: 19.9,
      categoria: "Acompanhamento",
      avaliacao: 4.4,
    },
    {
      nome: "Bruschetta de Tomate",
      descricao: "Pão italiano tostado com tomate, alho e manjericão",
      preco: 21.0,
      categoria: "Entrada",
      avaliacao: 4.5,
    },
  ],
});

  console.log("✅ Seed concluído!");
}

main()
  .catch((e) => {
    console.error("❌ Erro no seed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
