import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import { connect } from 'react-redux';
import {
    cadastraUsuario, confirmaCadastroUsuario
} from './../actions/authenticationActions';
import { modificaSenha, modificaEmail, modificaCodigoConfirmacao, loading as loadingChange } from './../actions/appActions';

class Cadastro extends Component {

    static navigationOptions = {
        title: 'Cadastro',
    }

    constructor(props) {
        super(props);
        this.state = {
            nome: ""
        }
    }

    validateForm() {
        return this.props.email.length > 0 && this.props.password.length > 0;
    }

    cadastro() {
        console.log("Clicou em Cadastro");
        this.props.cadastraUsuario(this.state.nome, this.props.email, this.props.password);
    }

    confirma() {
        console.log("Clicou em Cadastro");
        this.props.confirmaCadastroUsuario(this.props.email, this.props.codigoConfirmacao, this.props.navigation);
    }

    renderContent() {
        if (!this.props.esperandoCodigoConfirmacao) {
            return (
                <View style={styles.container}>
                    <Text style={styles.welcome}>Cadastro!</Text>
                    <Text style={styles.instructions}>Para começar, cadastre-se</Text>
                    <TextInput placeholder="E-mail" value={this.props.email} onChangeText={email => this.props.modificaEmail(email)} />
                    <TextInput placeholder="Password" secureTextEntry={true} value={this.props.password} onChangeText={password => this.props.modificaSenha(password)} />
                    <Button title="Login" disabled={!this.validateForm()} onPress={() => { this.cadastro() }} />
                </View>

            )
        } else {
            return (
                <View style={styles.container}>
                    <Text style={styles.welcome}>Cadastro!</Text>
                    <Text style={styles.instructions}>Digite o código de confirmação</Text>
                    <TextInput placeholder="Code" keyboardType="numeric"  value={this.props.codigoConfirmacao} onChangeText={codigoConfirmacao => this.props.modificaCodigoConfirmacao(codigoConfirmacao)} />
                    <Button title="Confirma" disabled={!this.validateForm()} onPress={() => { this.confirma() }} />
                </View>
            )
        }
    }
    render() {
        return (
            this.renderContent()
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});

const mapStateToProps = state => (
    {
        password: state.appReducer.password,
        nome: state.appReducer.nome,
        email: state.appReducer.email,
        loading: state.appReducer.loading,
        esperandoCodigoConfirmacao: state.authenticationReducer.esperandoCodigoConfirmacao,
        codigoConfirmacao: state.appReducer.codigoConfirmacao
    }
)

export default connect(mapStateToProps,
    {
        modificaSenha,
        modificaEmail,
        modificaCodigoConfirmacao,
        cadastraUsuario,
        confirmaCadastroUsuario,
        loadingChange
    })(Cadastro);