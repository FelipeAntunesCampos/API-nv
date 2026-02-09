import * as model from "../models/comidasModel.js";

export const getAll = async (req, res) => {
  try {
    const { nome, descricao, preco, categoria, avaliacao } = req.query;

    const filters = {};

    if (nome) {
      filters.nome = {
        contains: nome,
        mode: "insensitive",
      };
    }

    if (descricao) {
      filters.descricao = {
        contains: descricao,
        mode: "insensitive",
      };
    }

    if (categoria) {
      filters.categoria = {
        contains: categoria,
        mode: "insensitive",
      };
    }

    if (preco !== undefined) {
      const precoNum = parseFloat(preco);
      if (isNaN(precoNum)) {
        return res.status(400).json({ error: "Preço inválido." });
      }
      filters.preco = precoNum;
    }

    if (avaliacao !== undefined) {
      const avaliacaoNum = parseFloat(avaliacao);
      if (isNaN(avaliacaoNum)) {
        return res.status(400).json({ error: "Avaliação inválida." });
      }
      filters.avaliacao = avaliacaoNum;
    }

    const comidas = await model.findAll(filters);

    if (comidas.length === 0) {
      return res.status(200).json({
        message: "Nenhum registro encontrado.",
      });
    }

    res.json(comidas);
  } catch (error) {
    console.error("Erro ao buscar:", error);
    res.status(500).json({ error: "Erro ao buscar registros" });
  }
};

export const create = async (req, res) => {
  try {
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({
        error: "Corpo da requisição vazio. Envie os dados da comida!",
      });
    }

    const { nome, descricao, preco, categoria, avaliacao } = req.body;

    if (!nome)
      return res.status(400).json({ error: "O nome (nome) é obrigatório!" });
    if (!preco)
      return res.status(400).json({ error: "O preço (preco) é obrigatório!" });
    if (!categoria)
      return res
        .status(400)
        .json({ error: "A categoria (categoria) é obrigatória!" });
    if (!avaliacao)
      return res
        .status(400)
        .json({ error: "A avaliação (avaliacao) é obrigatória!" });
    const data = await model.create({
      nome,
      descricao,
      preco: parseFloat(preco),
      categoria,
      avaliacao: parseFloat(avaliacao),
    });

    res.status(201).json({
      message: "Registro cadastrado com sucesso!",
      data,
    });
  } catch (error) {
    console.error("Erro ao criar:", error);
    res
      .status(500)
      .json({ error: "Erro interno no servidor ao salvar o registro." });
  }
};

export const getById = async (req, res) => {
  try {
    const { id } = req.params;

    if (isNaN(id)) {
      return res
        .status(400)
        .json({ error: "O ID enviado não é um número válido." });
    }

    const data = await model.findById(id);
    if (!data) {
      return res.status(404).json({ error: "Registro não encontrado." });
    }
    res.json({ data });
  } catch (error) {
    console.error("Erro ao buscar:", error);
    res.status(500).json({ error: "Erro ao buscar registro" });
  }
};

export const update = async (req, res) => {
  try {
    const { id } = req.params;

    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({
        error: "Corpo da requisição vazio. Envie os dados da comida!",
      });
    }

    if (isNaN(id)) return res.status(400).json({ error: "ID inválido." });

    const exists = await model.findById(id);
    if (!exists) {
      return res
        .status(404)
        .json({ error: "Registro não encontrado para atualizar." });
    }

    const data = await model.update(id, req.body);
    res.json({
      message: `O registro "${data.nome}" foi atualizado com sucesso!`,
      data,
    });
  } catch (error) {
    console.error("Erro ao atualizar:", error);
    res.status(500).json({ error: "Erro ao atualizar registro" });
  }
};

export const remove = async (req, res) => {
  try {
    const { id } = req.params;

    if (isNaN(id)) return res.status(400).json({ error: "ID inválido." });

    const exists = await model.findById(id);
    if (!exists) {
      return res
        .status(404)
        .json({ error: "Registro não encontrado para deletar." });
    }

    await model.remove(id);
    res.json({
      message: `O registro "${exists.nome}" foi deletado com sucesso!`,
      deletado: exists,
    });
  } catch (error) {
    console.error("Erro ao deletar:", error);
    res.status(500).json({ error: "Erro ao deletar registro" });
  }
};
