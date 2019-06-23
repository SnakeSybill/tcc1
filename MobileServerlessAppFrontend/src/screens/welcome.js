import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import { connect } from 'react-redux';
import {
    putUsuario
} from './../actions/apiActions';
import { loading as loadingChange } from './../actions/appActions';

class Welcome extends Component {

    static navigationOptions = {
        title: 'Welcome',
    }

    constructor(props) {
        super(props);
    }

    validateForm() {
        return this.props.nome.length > 0;
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>Welcome!</Text>
                <Text style={styles.instructions}>Qual o seu nome?</Text>
                <TextInput placeholder="Nome" value={this.props.nome} onChangeText={nome => this.props.modificaNome(nome)} />
                <Button title="Confirma" disabled={!this.validateForm()} onPress={() => { this.props.putUsuario({nome, agenda: [], contatos: []}, this.props.navigation) }} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
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
        nome: state.appReducer.nome,
        email: state.appReducer.email,
        loading: state.appReducer.loading,
        esperandoCodigoConfirmacao: state.authenticationReducer.esperandoCodigoConfirmacao,
        codigoConfirmacao: state.authenticationReducer.codigoConfirmacao
    }
)

export default connect(mapStateToProps,
    {
        putUsuario
    })(Welcome);