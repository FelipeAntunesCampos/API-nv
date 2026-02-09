import prisma from "../utils/prismaClient.js";

export const create = async (data) => {
  return await prisma.comidas.create({ data });
};

export const findAll = async (where = {}) => {
  return prisma.comidas.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });
};

export const findById = async (id) => {
  return await prisma.comidas.findUnique({
    where: { id: parseInt(id) },
  });
};

export const update = async (id, data) => {
  return await prisma.comidas.update({
    where: { id: parseInt(id) },
    data,
  });
};

export const remove = async (id) => {
  return await prisma.comidas.delete({
    where: { id: parseInt(id) },
  });
};
