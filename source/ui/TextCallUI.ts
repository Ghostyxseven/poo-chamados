import { ICallController } from "../funcionalidade/iCallController";
import { ICallUI } from "./iCallUI";

/**
 * Interface de usuário textual (prompt/alert) para interação com o sistema de chamados.
 * Permite abrir chamados, listar e marcar como concluídos via menu simples.
 */
export class TextCallUI implements ICallUI{
    
    callController : ICallController;

    /**
     * Inicializa a UI com um controlador de chamados.
     * @param callController instância responsável pelas regras de negócio
     */
    constructor(callController:ICallController){
        this.callController = callController;
    }

    /**
     * Inicia o loop de interação com o usuário via prompt.
     * Opções: 1) Cadastrar, 2) Listar, 3) Marcar como concluído, 0) Sair.
     * Observação: As opções de listagem e marcação podem ser expandidas pelos alunos.
     */
    start(): void {
        let op = 1;
        while(op!=0){
            const raw = prompt('Escolha uma opção\n1- Cadastrar\n2- Listar\n3- Marcar como concluido\n0- Sair');
            if(raw === null){
                // Usuário cancelou; encerra a UI
                op = 0;
                break;
            }
            op = Number(raw);
            switch(op){
                case 1:
                    let nome : string | null = prompt('Digite seu nome');
                    if(!nome){
                        alert('Nome inválido. Operação cancelada.');
                        break;
                    }
                    let descricao : string | null = prompt('Digite a descrição do problema');
                    if(!descricao){
                        alert('Descrição inválida. Operação cancelada.');
                        break;
                    }
                    let deuCerto : boolean = this.callController.abrirChamado(nome,descricao);
                    if(deuCerto){
                        alert('Chamado cadastrado ✅');
                    }else{
                        alert('Não foi possível cadastrar o chamado ⚠️');
                    }
                    break;
                case 2:
                    const chamados = this.callController.listarChamado();
                    if(chamados.length === 0){
                        alert('Nenhum chamado cadastrado.');
                        break;
                    }
                    const linhas = chamados.map((c, i) => `${i} - [${c.status ? 'Resolvido' : 'Pendente'}] ${c.solicitante}: ${c.descricao}`);
                    alert(linhas.join('\n'));
                    break;
                case 3:
                    const todos = this.callController.listarChamado();
                    const pendentes = todos.map((c, i) => ({c, i})).filter(x => !x.c.status);
                    if(pendentes.length === 0){
                        alert('Não há chamados pendentes para serem marcados como concluídos.');
                        break;
                    }
                    const listaPendentes = pendentes.map(x => `${x.i} - ${x.c.solicitante}: ${x.c.descricao}`);
                    const escolhaRaw = prompt('Escolha o índice do chamado a ser marcado como concluído:\n' + listaPendentes.join('\n'));
                    if(escolhaRaw === null){
                        alert('Operação cancelada.');
                        break;
                    }
                    const escolha = Number(escolhaRaw);
                    if(Number.isNaN(escolha) || escolha < 0 || escolha >= todos.length){
                        alert('Índice inválido.');
                        break;
                    }
                    const escolhido = todos[escolha];
                    const sucesso = this.callController.marcarComoAtendido(escolhido);
                    if(sucesso){
                        alert('Chamado marcado como atendido ✅');
                    }else{
                        alert('Não foi possível atualizar o chamado ⚠️');
                    }
                    break;
                case 0:
                    alert('Encerrando sistema.');
                    break;
                default:
                    alert('Opcao Inválida');
            }
        }
    }

}
