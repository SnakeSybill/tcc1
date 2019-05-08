import React, { Component } from 'react';
import { StyleSheet, View, Button, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { listEventos } from './../actions/apiActions';

import Rodape from './../components/rodape.js';

class Eventos extends Component {

    static navigationOptions = ({ navigation }) => {
        return {
            title: 'Eventos',
        }
    }

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this.props.listEventos(this.props.email);
    }

    render() {
            if (this.props.eventosCriadosUsuario.length === 0) {
                return (
                    <View style={styles.container}>
                        <View style={{ flex: 1 }}></View>
                        <View style={{ flex: 8, alignItems: "center", alignContent: "center", justifyContent: "center", alignSelf: "center" }}>
                            <Text>Você ainda não possui eventos criados</Text>
                        </View>
                        <Rodape pagina="eventos" navigation={this.props.navigation} />
                    </View>
                )
            }
            else {
                return (
                    <View style={styles.container}>
                        <Text style={{ flex: 1 }}>Eventos criados por {this.props.usuario.username}</Text>
                        <View style={{ flex: 8 }}>
                            {
                                this.props.eventosCriadosUsuario.map((item, i) => (
                                    <TouchableOpacity>
                                        <Text>{item.idEvento}</Text>
                                    </TouchableOpacity>
                                ))
                            }
                        </View>
                        <Rodape pagina="eventos" navigation={this.props.navigation} />
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
        usuario: state.apiReducer.usuario,
        email: state.appReducer.email,
        eventosCriadosUsuario: state.apiReducer.eventosCriadosUsuario
    }
)

export default connect(mapStateToProps,
    {
        listEventos
    })(Eventos);