import React, { Component } from 'react';
import { StyleSheet, View, Button, Text, FlatList, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { configUsuarioAoLogar, getUsuario, putUsuario, putEvento, getEvento, listEventos, deleteEvento, putConvidado, listConvidados, putMeusConvites, listMeusConvites, respostaConvite } from './../actions/apiActions';

import Rodape from './../components/rodape.js';

class Contatos extends Component {

    static navigationOptions = ({ navigation }) => {
        return {
            title: 'Contatos',
        }
    }

    constructor(props) {
        super(props);
    }

    render() {
        if (this.props.usuario.contatos.length === 0) {
            return (
                <View style={styles.container}>
                    <View style={{ flex: 1 }}></View>
                    <View style={{ flex: 8, alignItems: "center", alignContent: "center", justifyContent: "center", alignSelf: "center" }}>
                        <Text>Você ainda não possui contatos</Text>
                    </View>
                    <Rodape pagina="contatos" navigation={this.props.navigation}/>
                </View>
            )
        } else {
            return (
                <View style={styles.container}>
                    <Text style={{ flex: 1 }}>Contatos de {this.props.usuario.username}</Text>
                    <View style={{ flex: 8 }}>
                        {
                            this.props.usuario.contatos.map((item, i) => (
                                <TouchableOpacity>
                                    <Text>{item}</Text>
                                </TouchableOpacity>

                            ))
                        }

                    </View>
                    <Rodape pagina="contatos" navigation={this.props.navigation}/>
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
        loading: state.appReducer.loading,
        nome: state.appReducer.nome,
        usuario: state.apiReducer.usuario,
        email: state.appReducer.email,
    }
)

export default connect(mapStateToProps,
    {
        configUsuarioAoLogar,
        getUsuario,
        putUsuario,
        putEvento,
        getEvento,
        listEventos,
        deleteEvento,
        putConvidado,
        listConvidados,
        putMeusConvites,
        listMeusConvites,
        respostaConvite
    })(Contatos);