import React, { Component } from "react"
import { Link } from 'react-router-dom'

export class FetchClientes extends Component {
    static displayName = "Clientes";

    constructor() {
        super();
        this.state = { clientes: [], loading: true }
    }


    componentDidMount() {
        this.populaClientes();

    }


    static handleEdit(id) {
        window.location.href = "/clientes/edit/" + id;
    }

    static handleDelete(id) {
        if (!window.confirm("Você deseja deletar o cliente: " + id)) {
            return;
        }
        else {
            fetch("api/clientes/" + id, { method: "delete" })
                .then(json => {
                    window.location.href = "fetch-clientes";
                    alert("Deletado com Sucesso!");
                })
        }

    }

    async handlePesquisa(event) {
        const response = await fetch("api/clientes/" + 1);
        const data = await response.json();
        this.setState({ clientes: data, loading: false })
        renderClientesTabela(this.state.clientes);
    }



    static renderClientesTabela(clientes) {

        return (
            <table className="table table-striped" aria-labelledby="tableLabel">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>Data de Nascimento</th>
                        <th>Telefone</th>
                        <th>Endereço</th>
                        <th>Rede Social</th>
                        <th>CPF</th>
                        <th>RG</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {clientes.map(cli =>
                        <tr key={cli.id}>
                            <td>{cli.id}</td>
                            <td>{cli.nomeCliente}</td>
                            <td>{cli.dataNasc}</td>
                            <td>{cli.telefones}</td>
                            <td>{cli.endereco}</td>
                            <td>{cli.redeSociais}</td>
                            <td>{cli.cpf}</td>
                            <td>{cli.rg}</td>
                            <td>
                                <button className="btn btn-success" onClick={(id) => this.handleEdit(cli.id)}>Editar</button> &nbsp;
                                <button className="btn btn-danger" onClick={(id) => this.handleDelete(cli.id)}>Excluir</button> &nbsp;
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        );

    }

    render() {
        let contents = this.state.loading
            ? <p><em> Carregando...</em></p>
            : FetchClientes.renderClientesTabela(this.state.clientes)

        return (
            <div>
                <h1 id="tableLabel">Clientes</h1>
                <p>
                    <Link to="/add-clientes">Cadastrar Cliente</Link>
                </p>

                <form onSubmit={this.handlePesquisa}>
                    <div className="form-group row">
                        <div className="col-md-6">
                            <input className="form-control" type="text" defaultValue={this.id} placeholder="ID cliente" required />
                            <button type="submit" className="btn btn-success" value={this.id}>Pesquisar</button>
                    </div>
                    </div>
                </form>
                <div className="form-group">
                </div>
                {contents}
            </div>
        );
    }

    async populaClientes() {
        const response = await fetch("api/clientes");
        const data = await response.json();
        this.setState({ clientes: data, loading: false })

    }

}
