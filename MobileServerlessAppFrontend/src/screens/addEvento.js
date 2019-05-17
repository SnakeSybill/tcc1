import React, { Component } from 'react';
import { StyleSheet, View, TextInput, Button, Text, ActivityIndicator } from 'react-native';
//import { CheckBox } from 'react-native-elements';
import { connect } from 'react-redux';
import { putEvento, modificaEventoSelecionado, putConvidado, alteraInclusaoConcluida, modificaLoading } from './../actions/apiActions';

class AddEvento extends Component {

    static navigationOptions = ({ navigation }) => {
        return {
            title: 'Novo Evento',
        }
    }

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this.props.modificaEventoSelecionado({ ...this.props.eventoSelecionado, email: this.props.email });
    }

    validateForm() {
        return this.props.eventoSelecionado.nome.length > 0 && this.props.eventoSelecionado.local.length > 0 && this.props.eventoSelecionado.data.length > 0;
    }

    render() {
        if (!this.props.inclusaoConcluida) {

            return (
                    <View style={styles.container}>
                        <View style={{ flex: 1 }}>
                            <Text style={{ fontSize: 24 }}>Novo Evento</Text>
                        </View>
                        <View style={{ flex: 8, alignItems: "center", alignContent: "center", justifyContent: "center", alignSelf: "center" }}>
                            <TextInput editable={!this.props.loadingAPI} placeholder="Nome" maxLength={30} value={this.props.eventoSelecionado.nome} onChangeText={nome => this.props.modificaEventoSelecionado({ ...this.props.eventoSelecionado, nome })} />
                            <TextInput editable={!this.props.loadingAPI} placeholder="Local" maxLength={30} value={this.props.eventoSelecionado.local} onChangeText={local => this.props.modificaEventoSelecionado({ ...this.props.eventoSelecionado, local })} />
                            <TextInput editable={!this.props.loadingAPI} placeholder="Data" value={this.props.eventoSelecionado.data} onChangeText={data => this.props.modificaEventoSelecionado({ ...this.props.eventoSelecionado, data })} />
                            <TextInput editable={!this.props.loadingAPI} placeholder="Hora" value={this.props.eventoSelecionado.hora} onChangeText={hora => this.props.modificaEventoSelecionado({ ...this.props.eventoSelecionado, hora })} />
                            <TextInput editable={!this.props.loadingAPI} placeholder="Descrição" multiline={true} numberOfLines={4} maxLength={300} value={this.props.eventoSelecionado.descricao} onChangeText={descricao => this.props.modificaEventoSelecionado({ ...this.props.eventoSelecionado, descricao })} />

                            {
                                this.props.loadingAPI ?
                                    <View style={{ flex: 8, alignItems: "center", alignContent: "flex-start", justifyContent: "center", alignSelf: "center" }}>
                                        <ActivityIndicator size="large" />
                                    </View>
                                    :
                                    <View style={{ flex: 1, flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                                        <Button title="Criar" disabled={!this.validateForm()} onPress={() => { this.props.modificaLoading(true); this.props.putEvento(this.props.eventoSelecionado, this.props.navigation) }} />
                                    </View>
                            }
                        </View>
                    </View>
            )
        }
        else {
            if (this.props.usuario.contatos.length > 0) {

                return (

                    <View style={styles.container}>
                        <View style={{ flex: 1 }}>
                            <Text>Convidar Contatos</Text>
                        </View>
                        <View style={{ flex: 8, alignItems: "center", alignContent: "flex-start", justifyContent: "center", alignSelf: "center" }}>
                            {
                                this.props.usuario.contatos.map((item, i) => (
                                    <View style={{ flexDirection: "row" }}>
                                        <Button title="Invite" onPress={() => {

                                            this.props.putConvidado({
                                                idEvento: this.props.eventoSelecionado.idEvento,
                                                usernameConvidado: item,
                                                nomeEvento: this.props.eventoSelecionado.nome,
                                                confirma: false,
                                                de: this.props.email
                                            })
                                        }} />
                                        <Text>{item}</Text>
                                    </View>
                                ))}
                        </View>

                        <View style={{ flex: 1, flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                            <Button
                                onPress={() => { this.props.alteraInclusaoConcluida(false); this.props.modificaEventoSelecionado({ criador: "", idEvento: "", nome: "", data: "", local: "", descricao: "", hora: "" }); this.props.navigation.navigate("inicio") }}
                                title="Finalizar"
                                color="#0F0"
                                style={{ heigth: 30 }}
                            />
                        </View>
                    </View>
                )
            } else {
                return (
                    <View style={styles.container}>
                        <View style={{ flex: 1 }}>
                            <Text>Convidar Contatos</Text>
                        </View>
                        <View style={{ flex: 8, alignItems: "center", alignContent: "flex-start", justifyContent: "center", alignSelf: "center" }}>
                            <Text>Você ainda não tem contatos para convidar</Text>
                        </View>
                        <View style={{ flex: 1, flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                            <Button
                                onPress={() => { this.props.alteraInclusaoConcluida(false); this.props.modificaEventoSelecionado({ criador: "", idEvento: "", nome: "", data: "", local: "", descricao: "", hora: "" }); this.props.navigation.navigate("inicio") }}
                                title="Finalizar"
                                color="#0F0"
                                style={{ heigth: 30 }}
                            />
                        </View>
                    </View>
                )
            }
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
        eventoSelecionado: state.apiReducer.eventoSelecionado,
        email: state.appReducer.email,
        email: state.appReducer.email,
        inclusaoConcluida: state.apiReducer.inclusaoConcluida,
        usuario: state.apiReducer.usuario,
        loadingAPI: state.apiReducer.loadingAPI,
    }
)

export default connect(mapStateToProps,
    {
        putEvento, modificaEventoSelecionado, putConvidado, alteraInclusaoConcluida, modificaLoading
    })(AddEvento);