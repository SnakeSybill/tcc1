import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import { modificaLoading, getEventoAgenda, configUsuarioAoLogar, } from './../actions/apiActions';
import { Divider } from 'react-native-material-ui';
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
        this.props.modificaLoading(true);
        this.props.configUsuarioAoLogar(this.props.email);
        this.willFocusSubscription = this.props.navigation.addListener(
            'willFocus',
            payload => {
                console.debug('willFocus', payload);
                this.props.modificaLoading(true);
                this.props.configUsuarioAoLogar(this.props.email);
            }
        );
    }

    componentWillUnmount() {
        this.willFocusSubscription.remove();
    }
    verEventoDaAgenda(item) {
        this.props.getEventoAgenda(item, this.props.navigation)
    }
    render() {


        // Remove the listener when you are done

        if (this.props.usuario.agenda.length === 0) {
            return (
                this.props.loadingAPI ? (<ActivityIndicator size="large" />) :
                    <View style={styles.container}>
                        <View style={{ flex: 1 }}></View>
                        <View style={{ flex: 8, alignItems: "center", alignContent: "center", justifyContent: "center", alignSelf: "center" }}>
                            <Text>Você ainda não possui nada em sua agenda</Text>
                        </View>
                        <Rodape pagina="inicio" navigation={this.props.navigation} />
                    </View>
            )
        } else {
            return (
                this.props.loadingAPI ? (<ActivityIndicator size="large" />) :
                    <View style={styles.container}>
                        <View style={{ flex: 1,alignContent: "center", paddingVertical: 15 }}>
                            <Text style={{  fontSize: 18, paddingHorizontal: 20, color: "#000" }}>Agenda de {this.props.usuario.username}</Text>
                        </View>
                        <View style={{
                            flex: 8, justifyContent: 'flex-start',
                            alignItems: 'center',
                            backgroundColor: '#F5FCFF',
                        }}>
                            {
                                this.props.usuario.agenda.map((item, i) => (

                                    <View style={{ flexDirection: "row" }}>
                                        <TouchableOpacity onPress={() => this.verEventoDaAgenda(item)} style={{ flex: 1, height: 50, borderColor: '#d6d7da', alignContent: "flex-start" }}>
                                            <Text style={{ fontSize: 16, paddingHorizontal: 20 }}>{item.nomeEvento}</Text>
                                            <Divider />
                                        </TouchableOpacity>
                                    </View>
                                ))
                            }
                        </View>
                        <Rodape pagina="inicio" navigation={this.props.navigation} />
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
        loadingAPI: state.apiReducer.loadingAPI,
        nome: state.appReducer.nome,
        usuario: state.apiReducer.usuario,
        email: state.appReducer.email,
    }
)

export default connect(mapStateToProps,
    {
        configUsuarioAoLogar,
        getEventoAgenda,
        modificaLoading
    })(Inicio);