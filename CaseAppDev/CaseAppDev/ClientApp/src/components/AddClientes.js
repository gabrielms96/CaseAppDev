import React, { Component } from "react"

export class Clientes {
    constructor() {
        this.id = 0;
        this.descricao = "";
    }
}

export class AddClientes extends Component {
    constructor(props) {
        super(props);
        this.state = { title: "", clientes: new Clientes(), loading: true };
        this.incialize();

        this.handleCancelar = this.handleCancelar.bind(this);
        this.handleSalvar = this.handleSalvar.bind(this);
    }

    async incialize() {
        var id = this.props.match.params["id"];
        if (id > 0) {
            const response = await fetch("api/Clientes/" + id);
            const data = await response.json();
            this.setState({ title: "Edit", clientes: data, loading: false })
        }
        else {
            this.state = { title: "Create", clientes: new Clientes(), loading: false }
        }
    }


    render() {
        let contents = this.state.loading
            ? <p><em> Carregando...</em></p>
            : this.renderAddClienteForm();

        return (
            <div>
                <h1>{this.state.title}</h1>
                <h3>Cliente</h3>
                {contents}
            </div>
        );
    }


    async handleCancelar(event) {
        event.preventDefault();
        this.props.history.push('/fetch-clientes');
    } 

    async handleSalvar(event) {
        event.preventDefault();

        const data = new FormData(event.target);

        if (this.state.clientes.id) {
            const response1 = fetch('api/Clientes/' + this.state.clientes.id, { method: 'PUT', body: data });
            this.props.history.push('/fetch-clientes');
        }
        else {
            const response2 = fetch('api/Clientes/', { method: 'POST', body: data });
            this.props.history.push('/fetch-clientes');
        }
    }


    renderAddClienteForm() {
        return (
            <form onSubmit={this.handleSalvar}>
                <div className="form-group row">
                    <input type="hidden" name="id" value={this.state.clientes.id} />
                </div>
                <div className="form-group row">
                    <div className="col-md-6">
                        <input className="form-control" type="text" name="nomeCliente" defaultValue={this.state.clientes.nomeCliente} placeholder="Nome Completo" required />
                    </div>
                </div>
                <div className="form-group row">
                    <div className="col-md-6">
                        <input className="form-control" type="date" name="dataNasc" defaultValue={this.state.clientes.dataNasc} placeholder="Data de Nascimento" required />
                    </div>
                </div>
                <div className="form-group row">
                    <div className="col-md-6">
                        <input className="form-control" type="tel" name="telefones" defaultValue={this.state.clientes.telefones} placeholder="Telefone"  required />
                    </div>
                </div>
                <div className="form-group row">
                    <div className="col-md-6">
                        <input className="form-control" type="text" name="endereco" defaultValue={this.state.clientes.endereco} placeholder="Endereço" required />
                    </div>
                </div>
                <div className="form-group row">
                    <div className="col-md-6">
                        <input className="form-control" type="text" name="redeSociais" defaultValue={this.state.clientes.redeSociais} placeholder="Redes Sociais" required />
                    </div>
                </div>
                <div className="form-group row">
                    <div className="col-md-6">
                        <input className="form-control" type="text" name="cpf" defaultValue={this.state.clientes.cpf} maxLength="11" placeholder="CPF" required />
                    </div>
                </div>
                <div className="form-group row">
                    <div className="col-md-6">
                        <input className="form-control" type="text" name="rg" defaultValue={this.state.clientes.rg} maxLength="11" placeholder="RG" required />
                    </div>
                </div>

                <div className="form-group">
                    <button type="submit" className="btn btn-success" value={this.state.clientes.id}>Salvar</button>
                    <button className="btn btn-danger" onClick={this.handleCancelar}>Cencelar</button>
                </div>
            </form>
        );
    }
}
