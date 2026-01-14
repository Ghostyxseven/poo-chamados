import { Chamado } from "./chamado";
import { ICallRepository } from "./iCallRepository";

/**
 * Implementação de repositório em memória para a entidade Chamado.
 * Deve manter uma coleção interna (ex.: Array) para armazenar os registros durante a execução.
 * Observação: Esta classe está propositalmente incompleta para ser finalizada pelos alunos.
 */
export class MemoryCallRepository implements ICallRepository{

    private lista: Array<Chamado> = [];

    /**
     * Cria e armazena um novo chamado na coleção em memória.
     * @param chamado instância a ser adicionada
     * @returns true se adicionado com sucesso, false caso contrário
     */
    criarNovoChamado(chamado: Chamado): boolean {
        try{
            this.lista.push(chamado);
            return true;
        }catch(e){
            return false;
        }
    }
    /**
     * Atualiza um chamado existente na coleção em memória.
     * A identificação do registro é feita por referência ao objeto armazenado.
     * @param chamado instância contendo os dados atualizados
     * @returns true se atualizado com sucesso, false caso contrário
     */
    atualizarChamado(chamado: Chamado): boolean {
        const idx = this.lista.indexOf(chamado);
        if(idx === -1){
            return false;
        }
        this.lista[idx] = chamado;
        return true;
    }
    /**
     * Retorna todos os chamados armazenados atualmente na coleção em memória.
     * @returns lista de chamados
     */
    listarChamados(): Array<Chamado> {
        // Retorna uma cópia para evitar que o chamador modifique diretamente a coleção interna
        return [...this.lista];
    }

}
