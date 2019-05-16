import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { getEventoAgenda, configUsuarioAoLogar, getUsuario, putUsuario, putEvento, getEvento, listEventos, deleteEvento, putConvidado, listConvidados, putMeusConvites, listMeusConvites, respostaConvite } from './../actions/apiActions';

import Rodape from './../components/rodape.js';

class Inicio extends Component {

    static navigationOptions = ({ navigation }) => {
        return {
            title: 'Agenda',
        }
    }

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this.props.configUsuarioAoLogar(this.props.email);
    }

    verEventoDaAgenda(item){
        this.props.getEventoAgenda(item, this.props.navigation)
    }
    render() {
        if (this.props.usuario.agenda.length === 0) {
            return (
                <View style={styles.container}>
                    <View style={{ flex: 1 }}></View>
                    <View style={{ flex: 8, alignItems: "center", alignContent: "center", justifyContent: "center", alignSelf: "center" }}>
                        <Text>Você ainda não possui nada em sua agenda</Text>
                    </View>
                    <Rodape pagina="inicio" navigation={this.props.navigation}/>
                </View>
            )
        } else {
            return (
                <View style={styles.container}>
                    <Text style={{ flex: 1 }}>Agenda de {this.props.usuario.username}</Text>
                    <View style={{ flex: 8 }}>
                        {
                            this.props.usuario.agenda.map((item, i) => (
                                <TouchableOpacity onPress={() => this.verEventoDaAgenda(item)} >
                                    <Text>{item.nomeEvento}</Text>
                                </TouchableOpacity>
                            ))
                        }
                    </View>
                    <Rodape pagina="inicio" navigation={this.props.navigation}/>
                </View>
            )
        }
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
        respostaConvite,
        getEventoAgenda
    })(Inicio);