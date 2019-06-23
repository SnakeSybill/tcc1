import React, { Component } from 'react';
import { StyleSheet, View, ActivityIndicator, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { Divider } from 'react-native-material-ui';
import { listEventos, modificaLoading } from './../actions/apiActions';

import Rodape from './../components/rodape.js';

class Eventos extends Component {

    static navigationOptions = ({ navigation }) => {
        return {
            title: 'Eventos',
            headerStyle: {
                backgroundColor: '#000',
              },
              headerTintColor: '#fff',
        }
    }

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this.props.modificaLoading(true);
        this.props.listEventos(this.props.email);
    }

    render() {
        if (this.props.eventosCriadosUsuario.length === 0) {
            return (
                this.props.loadingAPI ?
                    <View style={styles.container}>
                        <ActivityIndicator size="large" />
                    </View> :
                    <View style={styles.container}>
                        <View style={{ flex: 1 }}></View>
                        <View style={{ flex: 8, alignItems: "center", alignContent: "center", justifyContent: "center", alignSelf: "center" }}>
                            <Text style={{ fontSize: 18, paddingHorizontal: 20 }}>Você ainda não possui eventos criados</Text>
                        </View>
                        <Rodape pagina="eventos" navigation={this.props.navigation} />
                    </View>
            )
        }
        else {
            return (
                this.props.loadingAPI ? (<ActivityIndicator size="large" />) :

                    <View style={styles.container}>
                        <View style={{ flex: 1, justifyContent: "center", alignContent: "center", paddingVertical: 15 }}>
                            <Text style={{ fontSize: 18, paddingHorizontal: 20, color: "#000" }}>Eventos criados por {this.props.usuario.username}</Text>
                        </View>
                        <View style={{
                            flex: 8, justifyContent: 'flex-start',
                            alignItems: 'center',
                            backgroundColor: '#FFFFFF',
                        }}>
                            {
                                this.props.eventosCriadosUsuario.map((item, i) => (

                                    <View style={{ flexDirection: "row" }}>
                                        <TouchableOpacity style={{ flex: 1, height: 50, borderColor: '#d6d7da', alignContent: "flex-start" }} onPress={() => this.props.navigation.navigate("viewEvento", { item })}>
                                            <Text style={{ fontSize: 16, paddingHorizontal: 20 }}>{item.nome}</Text>
                                            <Divider />
                                        </TouchableOpacity>
                                    </View>
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
        loadingAPI: state.apiReducer.loadingAPI,
        usuario: state.apiReducer.usuario,
        email: state.appReducer.email,
        eventosCriadosUsuario: state.apiReducer.eventosCriadosUsuario
    }
)

export default connect(mapStateToProps,
    {
        listEventos, modificaLoading
    })(Eventos);