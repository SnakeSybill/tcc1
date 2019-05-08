import React, { Component } from 'react';
import { StyleSheet, View, Button } from 'react-native';
import { connect } from 'react-redux';
import { configUsuarioAoLogar, getUsuario, putUsuario, putEvento, getEvento, listEventos, deleteEvento, putConvidado, listConvidados, putMeusConvites, listMeusConvites, respostaConvite } from './../actions/apiActions';

class TesteApi extends Component {

    static navigationOptions = {
        title: 'testeapi',
        header: null
    }

    constructor(props) {
        super(props);
    }
    
    testeApi(param) {
        switch (param) {
            case 1:
                console.log("Teste da API GetUsuario:");
                this.props.getUsuario("");
                break;
            case 2:
                console.log("Teste da API PutUsuario:");
                this.props.putUsuario({});
                break
            case 3:
                console.log("Teste da API PutEvento:");
                this.props.putEvento({});
                break
            case 4:
                console.log("Teste da API GetEvento:");
                this.props.getEvento("");
                break
            case 5:
                console.log("Teste da API ListEventos:");
                this.props.listEventos();
                break;
            case 6:
                console.log("Teste da API DeleteEvento:");
                this.props.deleteEvento({});
                break
            case 7:
                console.log("Teste da API PutConvidado:");
                this.props.putConvidado({});
                break
            case 8:
                console.log("Teste da API ListConvidados:");
                this.props.listConvidados();
                break
            case 9:
                console.log("Teste da API PutMeusConvites:");
                this.props.putMeusConvites({});
                break
            case 10:
                console.log("Teste da API ListMeusConvites:");
                this.props.listMeusConvites();
                break
            case 11:
                console.log("Teste da API RespostaConvite:");
                this.props.respostaConvite({});
                break
            default: break;
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <Button title="Teste API GetUsuario" onPress={() => { this.testeApi(1) }} />
                <Button title="Teste API PutUsuario" onPress={() => { this.testeApi(2) }} />
                <Button title="Teste API PutEvento" onPress={() => { this.testeApi(3) }} />
                <Button title="Teste API GetEvento" onPress={() => { this.testeApi(4) }} />
                <Button title="Teste API ListEventos" onPress={() => { this.testeApi(5) }} />
                <Button title="Teste API DeleteEvento" onPress={() => { this.testeApi(6) }} />
                <Button title="Teste API PutConvidado" onPress={() => { this.testeApi(7) }} />
                <Button title="Teste API ListConvidados" onPress={() => { this.testeApi(8) }} />
                <Button title="Teste API PutMeusConvites" onPress={() => { this.testeApi(9) }} />
                <Button title="Teste API ListMeusConvites" onPress={() => { this.testeApi(10) }} />
                <Button title="Teste API RespostaConvite" onPress={() => { this.testeApi(11) }} />
            </View>
        );
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
    })(TesteApi);