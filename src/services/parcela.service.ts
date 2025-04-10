import { PrismaClient, StatusParcela } from "@prisma/client";
import dayjs from "dayjs"; // Usado para trabalhar com datas

const prisma = new PrismaClient();

export class ParcelaService {
    static async criarParcelas(data: {pedidoId: number, valorTotal: number, quantidadeParcelas: number}) {
        try {
            // 1️⃣ Calcular o valor de cada parcela
            const valorParcela = data.valorTotal / data.quantidadeParcelas;

            // 2️⃣ Gerar a lista de parcelas
            const parcelas = Array.from({ length: data.quantidadeParcelas }, (_, i) => {
                const vencimento = dayjs().add(i + 1, 'month').toDate(); // Vencimento da parcela, mês a mês

                return {
                    pedidoId: data.pedidoId,
                    valor: valorParcela,
                    vencimento: vencimento,
                    status: StatusParcela.pendente // Inicialmente a parcela está pendente
                };
            });

            // 3️⃣ Salvar as parcelas no banco de dados
            await prisma.parcela.createMany({
                data: parcelas
            });

            return parcelas; // Retorna as parcelas criadas, ou apenas a confirmação se necessário
        } catch (error) {
            console.error(error);
            throw new Error(`Erro ao criar parcelas: ${error instanceof Error ? error.message : "Erro desconhecido"}`);
        }
    }
}
