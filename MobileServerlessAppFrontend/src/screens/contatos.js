import React, { Component } from 'react';
import { StyleSheet, View, Button, Text, FlatList, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { Divider } from 'react-native-material-ui';
import { configUsuarioAoLogar, getUsuario, putUsuario, putEvento, getEvento, listEventos, deleteEvento, putConvidado, listConvidados, putMeusConvites, listMeusConvites, respostaConvite } from './../actions/apiActions';

import Rodape from './../components/rodape.js';

class Contatos extends Component {

    static navigationOptions = ({ navigation }) => {
        return {
            title: 'Contatos',
            headerStyle: {
                backgroundColor: '#000',
              },
              headerTintColor: '#fff',
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
                        <Text style={{ fontSize: 18, paddingHorizontal: 20 }}>Você ainda não possui contatos</Text>
                    </View>
                    <Rodape pagina="contatos" navigation={this.props.navigation} />
                </View>
            )
        } else {
            return (
                <View style={styles.container}>
                    <View style={{ flex: 1, justifyContent: "center", alignContent: "center", paddingVertical: 15 }}>
                        <Text style={{ fontSize: 18, paddingHorizontal: 20, color: "#000" }}>Contatos de {this.props.usuario.username}</Text>
                    </View>

                    
                    <View style={{
                            flex: 8, justifyContent: 'flex-start',
                            alignItems: 'center',
                            backgroundColor: '#FFFFFF',
                        }}>
                        {
                            this.props.usuario.contatos.map((item, i) => (
                                <View style={{ flexDirection: "row" }}>
                                    <TouchableOpacity style={{ flex: 1, height: 50, borderColor: '#d6d7da', alignContent: "flex-start" }}>
                                        <Text style={{ fontSize: 16, paddingHorizontal: 20 }}>{item}</Text>
                                        <Divider />
                                    </TouchableOpacity>
                                </View>


                            ))
                        }

                    </View>
                    <Rodape pagina="contatos" navigation={this.props.navigation} />
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