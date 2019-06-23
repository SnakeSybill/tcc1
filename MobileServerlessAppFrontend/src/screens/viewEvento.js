import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import { respostaConvite, getEvento, listConvidados, modificaEventoSelecionado, modificaLoading } from './../actions/apiActions';

class ViewConvite extends Component {

    static navigationOptions = ({ navigation }) => {
        return {
            title: 'Visualizar Evento',
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
        this.props.getEvento(this.props.navigation.getParam('item').idEvento, this.props.navigation.getParam('item').criador);
        this.props.listConvidados(this.props.navigation.getParam('item').idEvento);
    }

    componentWillUnmount() {
        this.props.modificaEventoSelecionado({ criador: "", idEvento: "", nome: "", data: "", local: "", descricao: "", hora: "" });
    }
    isCriador(convidador) {
        if (this.props.email != convidador) {
            return (
                <View style={{ flex: 3}}>
                    <View style={{ alignItems: "center", alignContent: "center", justifyContent: "center", alignSelf: "center" }}>
                        <Text> Criado por {convidador} </Text>
                    </View>
                    <View style={{ flex: 1, alignItems: "center", alignContent: "center", justifyContent: "center", alignSelf: "center" }}>

                    </View>
                </View>
            )
        }
        else {
            return (
                <View style={{ flex:3}}>
                    <View style={{ alignItems: "center", alignContent: "center", justifyContent: "center", alignSelf: "center" }}>
                        <Text> Convidados </Text>
                        {
                            this.props.listaConvidados.map((item, i) => (
                                <TouchableOpacity >
                                    <Text>{item.username}, Status: {item.confirma == undefined ? "Aguardando resposta" : item.confirma ? "Aceito" : "Recusado"}</Text>
                                </TouchableOpacity>
                            )
                            )
                        }
                    </View>
                </View>
            )
        }
    }
    render() {
        console.log("Parametro: ", this.props.navigation.getParam('item'));
        const item = this.props.navigation.getParam('item');
        return (

            this.props.loadingAPI ? <ActivityIndicator size="large" />
                :
                < View style={styles.container} >
                    <View style={{ flex: 1 }}>
                        <Text style={{ fontSize: 24 }}>{item.nomeEvento}</Text>
                    </View>
                    <View style={{ flex: 4, alignItems: "center", alignContent: "center", justifyContent: "center", alignSelf: "center" }}>
                        <Text style={{ fontSize: 20 }}>Local: {this.props.eventoSelecionado.local}</Text>
                        <Text style={{ fontSize: 20 }}>Data: {this.props.eventoSelecionado.data}</Text>
                        <Text style={{ fontSize: 20 }}>Hora: {this.props.eventoSelecionado.hora}</Text>
                    </View>
                    {
                        this.isCriador(this.props.eventoSelecionado.criador)
                    }
                </View >
        )
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
        eventoSelecionado: state.apiReducer.eventoSelecionado,
        email: state.appReducer.email,
        listaConvidados: state.apiReducer.listaConvidados,
        loadingAPI: state.apiReducer.loadingAPI,
    }
)

export default connect(mapStateToProps,
    {
        respostaConvite, getEvento, listConvidados, modificaEventoSelecionado, modificaLoading
    })(ViewConvite);