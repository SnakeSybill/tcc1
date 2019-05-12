import React, { Component } from 'react';
import { StyleSheet, View, Text, TextInput, Button, Alert } from 'react-native';
import { connect } from 'react-redux';
import { putUsuario, getUsuarioContato, limpaContatoBuscado } from './../actions/apiActions';

class AddContato extends Component {

    static navigationOptions = ({ navigation }) => {
        return {
            title: 'Novo Contato',
        }
    }

    constructor(props) {
        super(props);
        this.state = {
            contatoABuscar: ""
        }
    }

    isEmpty(a) {
        for (var prop in a) {
            if (a.hasOwnProperty(prop))
                return false;
        }

        return true;
    }

    componentWillUnmount() {
        this.props.limpaContatoBuscado();
    }
    
    adicionarContato() {
        if(!this.props.usuario.contatos.includes(this.props.contatoBuscado.username)){
            var listaAtualizada = this.props.usuario.contatos;
    
            var obj = {
                agenda: this.props.usuario.agenda,
                contatos: listaAtualizada.concat(this.props.contatoBuscado.username),
                username: this.props.usuario.username
            }
            this.props.putUsuario(obj, this.props.navigation);
        }
        else {
            
            Alert.alert(
                'Contato já adicionado',
                'Este usuário já está na sua lista de contatos',
                [
                    { text: 'OK', onPress: () => { } },
                ],
            )
        }
    }

    render() {
        console.log("Contato buscado: ", this.props.contatoBuscado);
        if (this.isEmpty(this.props.contatoBuscado)) {
            return (
                <View style={styles.container}>
                    <View style={{ flex: 1 }}>
                        <Text>Buscar Contato</Text>
                    </View>
                    <View style={{ flex: 8, alignItems: "center", alignContent: "center", justifyContent: "center", alignSelf: "center" }}>
                        <TextInput placeholder="Digite o E-mail" value={this.state.contatoABuscar} onChangeText={contato => this.setState({ contatoABuscar: contato })} />
                        <Button title="Buscar" onPress={() => this.props.getUsuarioContato(this.state.contatoABuscar)} />
                        <Text>Busque por um contato através do e-mail para adicioná-lo à sua lista de contatos</Text>
                    </View>
                    <View style={{ flex: 1 }}></View>
                </View>
            )
        }
        else {
            return (
                <View style={styles.container}>
                    <View style={{ flex: 1 }}>
                        <TextInput placeholder="Digite o E-mail" value={this.state.contatoABuscar} onChangeText={contato => this.setState({ contatoABuscar: contato })} />
                        <Button title="Buscar" onPress={() => this.props.getUsuarioContato(this.state.contatoABuscar)} />
                    </View>
                    <View style={{ flex: 8, alignItems: "center", alignContent: "center", justifyContent: "center", alignSelf: "center" }}>
                        <Text>Usuario encontrado</Text>
                        <Text>E-mail: {this.props.contatoBuscado.username}</Text>
                    </View>
                    <View style={{ flex: 1 }}>
                        <Button title="Adicionar aos contatos" onPress={() => this.adicionarContato()} />
                    </View>
                </View>
            )
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',

        alignItems: 'center',
        marginBottom: 10,
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
        contatoBuscado: state.apiReducer.contatoBuscado,
        usuario: state.apiReducer.usuario
    }
)

export default connect(mapStateToProps,
    {
        putUsuario, getUsuarioContato, limpaContatoBuscado
    })(AddContato);