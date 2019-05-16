import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Button } from 'react-native';
import { connect } from 'react-redux';
import { respostaConvite, getEvento } from './../actions/apiActions';

class ViewConvite extends Component {

    static navigationOptions = ({ navigation }) => {
        return {
            title: 'Visualizar Convite',
        }
    }

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this.props.getEvento(this.props.navigation.getParam('item').idEvento, this.props.navigation.getParam('item').de);
    }

    render() {
        console.log("Parametro: ", this.props.navigation.getParam('item'));
        const item = this.props.navigation.getParam('item');
        return (
            <View style={styles.container}>
                <View style={{ flex: 1 }}>
                    <Text style={{ fontSize: 24 }}>{item.nomeEvento}</Text>
                </View>
                <View style={{ flex: 8, alignItems: "center", alignContent: "center", justifyContent: "center", alignSelf: "center" }}>
                    <Text style={{ fontSize: 20 }}>De: {item.de}</Text>
                    <Text style={{ fontSize: 20 }}>Para: {item.usernameConvidado}</Text>
                    <Text style={{ fontSize: 20 }}>Local: {this.props.eventoSelecionado.local}</Text>
                    <Text style={{ fontSize: 20 }}>Data: {this.props.eventoSelecionado.data}</Text>
                    <Text style={{ fontSize: 20 }}>Hora: {this.props.eventoSelecionado.hora}</Text>
                </View>
                <View style={{ flex: 1, flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                    <Button
                        onPress={() => { this.props.respostaConvite(true, this.props.eventoSelecionado.idEvento, this.props.eventoSelecionado.criador, item.nomeEvento, this.props.email, this.props.navigation) }}
                        title="Aceitar"
                        color="#0F0"
                        style={{ heigth: 30 }}
                    />
                    <Button
                        onPress={() => { this.props.respostaConvite(false, this.props.eventoSelecionado.idEvento, this.props.eventoSelecionado.criador, item.nomeEvento, this.props.email, this.props.navigation) }}
                        title="Recusar"
                        color="#F00"
                        style={{ heigth: 30 }}
                    />
                </View>
            </View>

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
    }
)

export default connect(mapStateToProps,
    {
        respostaConvite, getEvento
    })(ViewConvite);